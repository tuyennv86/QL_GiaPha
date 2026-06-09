import { Injectable } from '@nestjs/common';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Marriages } from './entities/marriages.entity';
import { MarriagesResponse } from './response/marriages.response';
import { PersonType } from 'src/person/enum/person-type.enum';

@Injectable()
export class MarriagesService {
  constructor(
    @InjectRepository(Marriages)
    private marriageRepository: Repository<Marriages>,
  ) {}

  findAll() {
    return this.marriageRepository.find();
  }

  async findOne(id: number): Promise<Marriages | null> {
    return await this.marriageRepository.findOne({ where: { id } });
  }

  async findByPersonId(
    personId: number,
    personType: PersonType,
  ): Promise<MarriagesResponse[] | []> {
    const query = this.marriageRepository
      .createQueryBuilder('marriage')
      .leftJoinAndSelect('marriage.person1', 'person1')
      .leftJoinAndSelect('marriage.person2', 'person2')
      .select([
        'marriage.id',
        'marriage.person1_id',
        'marriage.person2_id',
        'marriage.marriage_date',
        'marriage.divorce_date',
        'marriage.marriage_status',
        'marriage.marriage_order',
        'marriage.note',
        'marriage.created_at',
        'person1.full_name',
        'person2.full_name',
      ]);
    if (personType === PersonType.SON || personType === PersonType.DAUGHTER) {
      query.where('marriage.person1_id = :personId', { personId });
    } else {
      query.where('marriage.person2_id = :personId', { personId });
    }
    query.orderBy('marriage.marriage_order', 'ASC');
    const marriages = await query.getMany();

    if (!marriages.length) {
      return [];
    }
    return marriages.map((marriage) => ({
      id: marriage.id,
      person1_id: marriage.person1_id,
      person2_id: marriage.person2_id,
      marriage_date: marriage.marriage_date,
      divorce_date: marriage.divorce_date,
      marriage_status: marriage.marriage_status,
      marriage_order: marriage.marriage_order,
      note: marriage.note,
      created_at: marriage.created_at,
      person1_name: marriage.person1?.full_name ?? '',
      person2_name: marriage.person2?.full_name ?? '',
    }));
  }

  async findOneDetail(id: number): Promise<MarriagesResponse | null> {
    const marriage = await this.marriageRepository
      .createQueryBuilder('marriage')
      .leftJoinAndSelect('marriage.person1', 'person1')
      .leftJoinAndSelect('marriage.person2', 'person2')
      .select([
        'marriage.id',
        'marriage.person1_id',
        'marriage.person2_id',
        'marriage.marriage_date',
        'marriage.divorce_date',
        'marriage.marriage_status',
        'marriage.marriage_order',
        'marriage.note',
        'marriage.created_at',
        'person1.full_name',
        'person2.full_name',
      ])
      .where('marriage.id = :id', { id })
      .getOne();

    if (!marriage) {
      return null;
    }

    return {
      id: marriage.id,
      person1_id: marriage.person1_id,
      person2_id: marriage.person2_id,
      marriage_date: marriage.marriage_date,
      divorce_date: marriage.divorce_date,
      marriage_status: marriage.marriage_status,
      marriage_order: marriage.marriage_order,
      note: marriage.note,
      created_at: marriage.created_at,
      person1_name: marriage.person1?.full_name ?? '',
      person2_name: marriage.person2?.full_name ?? '',
    };
  }

  async create(
    createMarriageDto: CreateMarriageDto,
  ): Promise<MarriagesResponse | null> {
    // kiểm tra xem person1_id và person2_id có tồn tại trong bảng person không nếu tồn tại rồi thì không cho tạo mới
    const personMarriage = await this.marriageRepository.findOne({
      where: {
        person1_id: createMarriageDto.person1_id,
        person2_id: createMarriageDto.person2_id,
      },
    });
    if (personMarriage) {
      return Promise.reject(
        new Error(
          `Marriage đã tồn tại với person1_id: ${createMarriageDto.person1_id} và person2_id: ${createMarriageDto.person2_id}`,
        ),
      );
    }
    // kiểm tra xem người đã có hôn nhân nào chưa để xác định thứ tự hôn nhân
    //nếu person1_id = createMarriageDto.person1_id hoặc person2_id = createMarriageDto.person1_id
    //thì sẽ lấy số lượng hôn nhân của person1_id để xác định thứ tự hôn nhân
    const person1MarriageCount = await this.marriageRepository.count({
      where: [
        { person1_id: createMarriageDto.person1_id },
        { person2_id: createMarriageDto.person1_id },
      ],
    });
    createMarriageDto.marriage_order = person1MarriageCount + 1;
    const marriage = await this.marriageRepository.save(createMarriageDto);
    return await this.findOneDetail(marriage.id);
  }

  async update(
    id: number,
    updateMarriageDto: UpdateMarriageDto,
  ): Promise<MarriagesResponse> {
    const marriage = await this.findOne(id);
    if (!marriage) {
      return Promise.reject(new Error('Marriage không tìm thấy id: ' + id));
    }
    updateMarriageDto.marriage_order = marriage.marriage_order; // cập nhật lại thứ tự hôn nhân nếu có thay đổi ngày cưới hoặc ngày ly hôn
    await this.marriageRepository.update(id, updateMarriageDto);

    return this.findOneDetail(id).then((updatedMarriage) => {
      if (!updatedMarriage) {
        throw new Error('Không tìm thấy Marriage sau khi cập nhật id: ' + id);
      }
      return updatedMarriage;
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const marriage = await this.findOne(id);
    if (!marriage) {
      return Promise.reject(new Error('Marriage không tìm thấy id: ' + id));
    }
    return this.marriageRepository.delete(id).then(() => {
      return { message: 'Đã xóa thành công Marriage có id = ' + id };
    });
  }
}
