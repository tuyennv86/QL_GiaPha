import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { PersonResponseList } from './response/person.response';
import { PersonMapper } from './mapper/person.mapper';
import { ExcelHelper } from 'src/helper/excel.helper';
import { ObjectHelper } from 'src/helper/object.helper';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
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
    const query = this.personRepo.createQueryBuilder('persons');

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
  async create(createPersonDto: CreatePersonDto) {
    return await this.personRepo.save(createPersonDto);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.personRepo.update(id, updatePersonDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const person = await this.findOne(id);
    if (!person) {
      return { message: 'Không tìm thấy người này' };
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
    await this.personRepo.remove(persons);
    return {
      message: 'Xoá người thành công ' + persons.length + ' người',
    };
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
