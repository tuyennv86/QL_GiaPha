import { BadRequestException, Injectable } from '@nestjs/common';
import path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileUploadService {
  private readonly allowMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  private readonly maxImageSize = 5 * 1024 * 1024; // 5MB

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('File không tồn tại');
    }

    // Kiểm tra loại file
    if (!this.allowMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ được phép upload file ảnh');
    }

    // Kiểm tra dung lượng
    if (file.size > this.maxImageSize) {
      throw new BadRequestException('Dung lượng ảnh tối đa 5MB');
    }

    const now = new Date();

    const year = now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // uploads/2026/08/12
    const uploadDir = path.join(process.cwd(), 'uploads', year, month, day);

    // Tạo thư mục
    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    // Tạo tên file
    const fileName = `${Date.now()}-${file.originalname}`;

    const filePath = path.join(uploadDir, fileName);

    // Lưu file
    await fs.writeFile(filePath, file.buffer);

    // Path lưu DB
    return `/uploads/${year}/${month}/${day}/${fileName}`;
  }

  async deleteImage(filePath: string): Promise<void> {
    if (!filePath) {
      return;
    }

    const fullPath = path.join(process.cwd(), filePath);

    try {
      await fs.unlink(fullPath);
    } catch (error: any) {
      // File không tồn tại thì bỏ qua
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error('Lỗi xoá file:', error);
      }
    }
  }
}
