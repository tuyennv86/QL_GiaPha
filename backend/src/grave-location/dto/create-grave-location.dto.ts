import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGraveLocationDto {
  @IsInt({ message: 'ID người mất phải là số nguyên' })
  person_id: number;

  @IsString({ message: 'Tên nghĩa trang phải là chuỗi' })
  @MaxLength(200, { message: 'Tên nghĩa trang tối đa 200 ký tự' })
  cemetery_name: string;

  @IsOptional()
  @IsString({ message: 'Khu vực phải là chuỗi' })
  @MaxLength(100, { message: 'Khu vực tối đa 100 ký tự' })
  area?: string;

  @IsOptional()
  @IsString({ message: 'Số hàng phải là chuỗi' })
  @MaxLength(50, { message: 'Số hàng tối đa 50 ký tự' })
  row_number?: string;

  @IsOptional()
  @IsString({ message: 'Số lô phải là chuỗi' })
  @MaxLength(50, { message: 'Số lô tối đa 50 ký tự' })
  plot_number?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Vĩ độ phải là một số thực' })
  @Min(-90, { message: 'Vĩ độ không được nhỏ hơn -90' })
  @Max(90, { message: 'Vĩ độ không được lớn hơn 90' })
  latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Kinh độ phải là một số thực' })
  @Min(-180, { message: 'Kinh độ không được nhỏ hơn -180' })
  @Max(180, { message: 'Kinh độ không được lớn hơn 180' })
  longitude?: number;

  @IsOptional()
  @IsString({ message: 'Ảnh bản đồ phải là chuỗi' })
  @MaxLength(500, { message: 'Ảnh bản đồ tối đa 500 ký tự' })
  map_image?: string;

  @IsOptional()
  @IsString({ message: 'Ghi chú phải là chuỗi' })
  @MaxLength(500, { message: 'Ghi chú tối đa 500 ký tự' })
  note?: string;
}
