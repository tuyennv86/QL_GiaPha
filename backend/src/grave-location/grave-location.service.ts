import { Injectable } from '@nestjs/common';
import { CreateGraveLocationDto } from './dto/create-grave-location.dto';
import { UpdateGraveLocationDto } from './dto/update-grave-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GraveLocation } from './entities/grave-location.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

@Injectable()
export class GraveLocationService {
  constructor(
    @InjectRepository(GraveLocation)
    private graveLocationRepository: Repository<GraveLocation>,

    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createGraveLocationDto: CreateGraveLocationDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      // lưu file mới
      const filePath = await this.fileUploadService.uploadImage(file);
      createGraveLocationDto.map_image = filePath;
    }
    return await this.graveLocationRepository.save(createGraveLocationDto);
  }

  async findAll(): Promise<GraveLocation[]> {
    return await this.graveLocationRepository.find();
  }

  async findOne(id: number): Promise<GraveLocation | null> {
    return await this.graveLocationRepository.findOneBy({ id });
  }

  async findByPersonId(personId: number): Promise<GraveLocation | null> {
    return await this.graveLocationRepository.findOneBy({
      person_id: personId,
    });
  }

  async update(
    id: number,
    updateGraveLocationDto: UpdateGraveLocationDto,
    file?: Express.Multer.File,
  ) {
    const grave = await this.graveLocationRepository.findOneBy({ id });
    if (!grave) {
      throw new Error('Không tìm thấy địa điểm này');
    }
    if (file) {
      // xóa file cũ nếu có
      if (grave.map_image) {
        await this.fileUploadService.deleteImage(grave.map_image);
      }
      // lưu file mới
      const filePath = await this.fileUploadService.uploadImage(file);
      updateGraveLocationDto.map_image = filePath;
    }

    return await this.graveLocationRepository.update(
      id,
      updateGraveLocationDto,
    );
  }

  async remove(id: number) {
    const graveLocation = await this.graveLocationRepository.findOneBy({ id });
    if (!graveLocation) {
      throw new Error('Không tìm thấy địa điểm này');
    }
    // xóa file ảnh nếu có
    if (graveLocation.map_image) {
      await this.fileUploadService.deleteImage(graveLocation.map_image);
    }
    return this.graveLocationRepository.delete(id);
  }

  removeByPersonId(personId: number) {
    return this.graveLocationRepository.delete({ person_id: personId });
  }

  async deleteImg(id: number): Promise<{ message: string }> {
    const graveLocation = await this.graveLocationRepository.findOneBy({ id });
    if (!graveLocation) {
      return { message: 'Không tìm thấy địa điểm này' };
    }
    if (!graveLocation.map_image) {
      return { message: 'Địa điểm này không có ảnh' };
    }
    //xoá file ảnh
    await this.fileUploadService.deleteImage(graveLocation.map_image);

    graveLocation.map_image = '';
    await this.graveLocationRepository.save(graveLocation);
    return { message: 'Xoá ảnh thành công' };
  }
}
