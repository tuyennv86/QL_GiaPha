import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { promises as fs } from 'fs';
import { Response } from 'express';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PersonResponseList } from './response/person.response';
import { PersonMapper } from './mapper/person.mapper';
import { ExcelHelper } from 'src/common/helper/excel.helper';
import { ObjectHelper } from 'src/common/helper/object.helper';
import { Family } from 'src/family/entities/family.entity';
import { FamilyBranch } from 'src/familybrannches/entities/family-branch.entity';
import path from 'path';
import { PersonType } from './enum/person-type.enum';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,

    @InjectRepository(Family)
    private readonly familyRepo: Repository<Family>,

    @InjectRepository(FamilyBranch)
    private readonly branchRepo: Repository<FamilyBranch>,
  ) {}

  async findAll(): Promise<Person[]> {
    return await this.personRepo.find();
  }

  async findGeneration() {
    const generations = await this.personRepo
      .createQueryBuilder('persons')
      .select('DISTINCT persons.generation', 'generation')
      .orderBy('persons.generation', 'ASC')
      .getRawMany();

    return generations.map((g: { generation: string }) => g.generation);
  }

  async findSearch(
    page: number,
    limit: number,
    gender: number,
    generation: number,
    is_alive: number,
    search?: string,
  ): Promise<PersonResponseList> {
    const query = this.personRepo
      .createQueryBuilder('persons')
      .leftJoinAndSelect('persons.family', 'family')
      .leftJoinAndSelect('persons.branch', 'branch');

    if (search) {
      query.andWhere(
        'unaccent(LOWER(persons.full_name)) LIKE unaccent(LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    if (gender >= 0) {
      query.andWhere('persons.gender = :gender', { gender });
    }

    if (generation > 0) {
      query.andWhere('persons.generation = :generation', { generation });
    }

    if (is_alive !== -1) {
      const isAliveBool = is_alive === 1 ? true : false;
      query.andWhere('persons.is_alive = :is_alive', { is_alive: isAliveBool });
    }

    const [entities, total] = await query
      .select([
        'persons.id',
        'persons.family_id',
        'persons.branch_id',
        'persons.full_name',
        'persons.gender',
        'persons.birth_date',
        'persons.death_date',
        'persons.biography',
        'persons.avatar',
        'persons.generation',
        'persons.is_alive',
        'persons.job',
        'persons.place_of_birth',
        'persons.note',
        'persons.person_type',

        'family.id',
        'family.family_name',

        'branch.id',
        'branch.branch_name',
      ])
      .orderBy('persons.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const items = entities.map((p) => PersonMapper.toResponse(p));

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return await this.personRepo.findOne({ where: { id } });
  }

  async findByGender(gender: number) {
    return await this.personRepo.find({ where: { gender: gender } });
  }

  async create(createPersonDto: CreatePersonDto, file?: Express.Multer.File) {
    const family = await this.familyRepo.findOne({
      where: { id: createPersonDto.family_id },
    });
    if (!family) {
      throw new BadRequestException('Không tìm thấy gia tộc');
    }
    //lưu file nếu có và lấy url
    let avatarUrl = createPersonDto.avatar || '';
    if (file) {
      // lưu file và lấy url vào thư mục uploads và trả về url là /uploads/filename
      avatarUrl = await this.uploadImage(file);
    }
    createPersonDto.avatar = avatarUrl;

    return await this.personRepo.save(createPersonDto);
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File không tồn tại');
    }
    const allowMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!allowMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ được phép upload file ảnh');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      throw new BadRequestException('Dung lượng ảnh tối đa 5MB');
    }
    const now = new Date();
    // yyyy/mm/dd
    const year = now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // uploads/2026/05/14
    const uploadDir = path.join(process.cwd(), 'uploads', year, month, day);
    // tạo thư mục nếu chưa tồn tại
    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    // tạo tên file
    const fileName = `${Date.now()}-${file.originalname}`;
    // full path
    const filePath = path.join(uploadDir, fileName);
    // lưu file
    await fs.writeFile(filePath, file.buffer);
    // path lưu DB
    return `/uploads/${year}/${month}/${day}/${fileName}`;
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
    file?: Express.Multer.File,
  ) {
    const person = await this.findOne(id);
    if (!person) {
      throw new BadRequestException('Không tìm thấy người này');
    }
    // kiểm tra family và branch có tồn tại không
    if (updatePersonDto.family_id) {
      const family = await this.familyRepo.findOne({
        where: { id: updatePersonDto.family_id },
      });
      if (!family) {
        throw new BadRequestException('Không tìm thấy gia tộc');
      }
    }
    // avatar
    if (file) {
      // xoá avatar cũ nếu có
      if (person.avatar) {
        const oldFilePath = path.join(process.cwd(), person.avatar);
        try {
          await fs.unlink(oldFilePath);
        } catch (err) {
          console.error('Lỗi xoá file cũ:', err);
        }
      }
      // lưu file mới và lấy url
      const avatarUrl = await this.uploadImage(file);
      updatePersonDto.avatar = avatarUrl;
    }
    return await this.personRepo.save({
      ...person,
      ...updatePersonDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const person = await this.findOne(id);
    if (!person) {
      return { message: 'Không tìm thấy người này' };
    }
    // xóa ảnh nếu có
    if (person.avatar) {
      const filePath = path.join(process.cwd(), person.avatar);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.error('Lỗi xoá file:', err);
      }
    }
    const fullName = person.full_name;
    await this.personRepo.remove(person);
    return { message: 'Xoá người thành công ' + fullName };
  }

  async removeMultiple(listId: number[]): Promise<{ message: string }> {
    const persons = await this.personRepo
      .createQueryBuilder('persons')
      .where('persons.id IN (:...listId)', { listId })
      .getMany();
    if (persons.length === 0) {
      return { message: 'Không tìm thấy người nào' };
    }
    // xóa ảnh nếu có
    for (const person of persons) {
      if (person.avatar) {
        const filePath = path.join(process.cwd(), person.avatar);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error('Lỗi xoá file:', err);
        }
      }
    }
    await this.personRepo.remove(persons);
    return {
      message: 'Xoá người thành công ' + persons.length + ' người',
    };
  }

  async removeAvatar(id: number): Promise<{ message: string }> {
    const person = await this.findOne(id);
    if (!person) {
      return { message: 'Không tìm thấy người này' };
    }
    if (!person.avatar) {
      return { message: 'Người này không có avatar' };
    }
    // xoá file
    const filePath = path.join(process.cwd(), person.avatar);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Lỗi xoá file:', err);
    }
    // xoá url trong DB
    person.avatar = '';
    await this.personRepo.save(person);
    return { message: 'Xoá avatar thành công' };
  }

  async getListByIds(listId: number[]): Promise<Person[]> {
    return await this.personRepo
      .createQueryBuilder('persons')
      .where('persons.id IN (:...listId)', { listId })
      .getMany();
  }

  async exportExcel(listId: number[], res: Response): Promise<void> {
    const persons = await this.getListByIds(listId);
    await this.exportTemplate(persons, res);
  }

  async exportAllExcel(res: Response): Promise<void> {
    const persons = await this.findAll();
    await this.exportTemplate(persons, res);
  }

  async exportTemplate(persons: Person[], res: Response) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader('Content-Disposition', 'attachment; filename=thanhvien.xlsx');
    // WORKBOOK STREAM
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream: res,
      useStyles: true,
      useSharedStrings: true,
    });

    // SHEET
    const worksheet = workbook.addWorksheet('Danh sách thành viên');

    // COLUMNS
    worksheet.columns = [
      {
        header: 'Họ Tên',
        key: 'full_name',
        width: 50,
      },
      {
        header: 'Thông tin',
        key: 'biography',
        width: 60,
      },
      {
        header: 'Giới tính',
        key: 'gender',
        width: 20,
      },
      {
        header: 'Thế hệ',
        key: 'generation',
        width: 20,
      },
      {
        header: 'Năm sinh',
        key: 'birth_date',
        width: 20,
      },
      {
        header: 'Năm mất',
        key: 'death_date',
        width: 20,
      },
      {
        header: 'Quê quán',
        key: 'place_of_birth',
        width: 20,
      },
      {
        header: 'Nghề nghiệp',
        key: 'job',
        width: 30,
      },
      {
        header: 'Còn sống',
        key: 'is_alive',
        width: 20,
      },
      {
        header: 'Loại thành viên',
        key: 'person_type',
        width: 30,
      },
    ];

    // HEADER STYLE
    const headerRow = worksheet.getRow(1);

    headerRow.font = {
      bold: true,
      color: {
        argb: 'FFFFFF',
      },
    };

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: '4472C4',
      },
    };

    headerRow.commit();

    // DATA
    for (const person of persons) {
      const row = worksheet.addRow({
        full_name: person.full_name,
        biography: person.biography,
        gender: (genderMap[person.gender] as string) || '',
        generation: 'Đời ' + person.generation,
        birth_date: person.birth_date ? formatDate(person.birth_date) : '',
        death_date: person.death_date ? formatDate(person.death_date) : '',
        place_of_birth: person.place_of_birth,
        job: person.job,
        is_alive: person.is_alive ? 'Còn sống' : 'Đã mất',
        person_type:
          person.person_type === PersonType.SON
            ? 'Con trai'
            : person.person_type === PersonType.DAUGHTER
              ? 'Con gái'
              : person.person_type === PersonType.SON_IN_LAW
                ? 'Con rể'
                : person.person_type === PersonType.DAUGHTER_IN_LAW
                  ? 'Con dâu'
                  : '',
      });

      row.commit();
    }

    worksheet.commit();

    await workbook.commit();
  }

  async importExcelFromFile(
    file: Express.Multer.File,
  ): Promise<{ message: string }> {
    if (!file) {
      throw new Error('Không có file');
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer as unknown as ArrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new BadRequestException('Không tìm thấy sheet Excel');
    }

    const persons: Partial<CreatePersonDto>[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // bỏ header
      // bỏ row trống
      if (row.actualCellCount === 0) {
        return;
      }
      const values = row.values as ExcelJS.CellValue[];

      const fullName = ExcelHelper.getRequiredCellString(values[1]);

      // Bỏ qua nếu không có tên
      if (!fullName.trim()) {
        return;
      }

      const person: CreatePersonDto = {
        family_id: 1,
        branch_id: 1,

        full_name: fullName,
        biography: ExcelHelper.getRequiredCellString(values[2]),
        gender: ExcelHelper.getGender(values[3]),
        generation: ExcelHelper.getCellNumber(values[4]),
        birth_date: ExcelHelper.getCellDate(values[5]),
        death_date: ExcelHelper.getCellDate(values[6]),
        avatar: '',
        place_of_birth: ExcelHelper.getCellString(values[7]),
        job: ExcelHelper.getCellString(values[8]),
        is_alive: ExcelHelper.getCellBoolean(values[9]),
        person_type: ExcelHelper.getPersonType(values[10]),
      };

      persons.push(person);
    });

    await this.personRepo.save(
      persons.map((item) => ObjectHelper.removeUndefined(item)),
    );
    return {
      message: 'Import thành công' + persons.length + ' người',
    };
  }
}

const genderMap = {
  0: 'Nữ',
  1: 'Nam',
  2: 'Giới tính khác',
};

const formatDate = (date?: Date | string) => {
  if (!date) return '';
  const d = new Date(date);
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
};
