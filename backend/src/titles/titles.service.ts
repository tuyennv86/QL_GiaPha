import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title)
    private readonly titleRepo: Repository<Title>,
  ) {}

  async create(createTitleDto: CreateTitleDto): Promise<Title> {
    const data = this.titleRepo.create(createTitleDto);
    return await this.titleRepo.save(data);
  }

  async findAll(): Promise<Title[]> {
    return await this.titleRepo.find({ order: { id: 'ASC' } });
  }

  async searchTitles(searchTerm?: string | null) {
    const query = this.titleRepo
      .createQueryBuilder('title')
      .orderBy('title.id', 'ASC');

    if (searchTerm) {
      query.andWhere(
        'unaccent(LOWER(title.title_name)) LIKE unaccent(LOWER(:searchTerm))',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Title | null> {
    return await this.titleRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTitleDto: UpdateTitleDto,
  ): Promise<Title | null> {
    const title = await this.titleRepo.findOne({ where: { id } });
    if (!title) {
      return null;
    }
    const updatedTitle = Object.assign(title, updateTitleDto);
    return this.titleRepo.save(updatedTitle);
  }

  async remove(id: number): Promise<{ message: string }> {
    const title = await this.titleRepo.findOne({ where: { id } });
    if (!title) {
      return { message: 'Không tìm thấy danh hiệu này' };
    }
    await this.titleRepo.remove(title);
    return { message: 'Xóa danh hiệu ' + title.title_name + ' thành công' };
  }
}
