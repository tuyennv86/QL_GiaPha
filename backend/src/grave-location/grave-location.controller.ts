import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GraveLocationService } from './grave-location.service';
import { CreateGraveLocationDto } from './dto/create-grave-location.dto';
import { UpdateGraveLocationDto } from './dto/update-grave-location.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('grave-location')
export class GraveLocationController {
  constructor(private readonly graveLocationService: GraveLocationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('map_image'))
  create(
    @Body() createGraveLocationDto: CreateGraveLocationDto,
    @UploadedFile() map_image?: Express.Multer.File,
  ) {
    return this.graveLocationService.create(createGraveLocationDto, map_image);
  }

  @Get()
  findAll() {
    return this.graveLocationService.findAll();
  }

  @Get('person/:id')
  findByPersonId(@Param('id') id: string) {
    return this.graveLocationService.findByPersonId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graveLocationService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('map_image'))
  update(
    @Param('id') id: string,
    @Body() updateGraveLocationDto: UpdateGraveLocationDto,
    @UploadedFile() map_image?: Express.Multer.File,
  ) {
    return this.graveLocationService.update(
      +id,
      updateGraveLocationDto,
      map_image,
    );
  }

  @Delete('person/:id')
  removeByPersonId(@Param('id') id: string) {
    return this.graveLocationService.removeByPersonId(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graveLocationService.remove(+id);
  }

  @Delete(':id/image')
  deleteImage(@Param('id') id: string) {
    return this.graveLocationService.deleteImg(+id);
  }
}
