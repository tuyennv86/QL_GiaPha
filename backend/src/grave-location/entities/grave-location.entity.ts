import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Cấu hình bộ chuyển đổi từ String (Database) sang Number (TypeScript)
const numericTransformer = {
  to: (value: number | null) => value, // Ghi vào DB giữ nguyên
  from: (value: string | null) => (value === null ? null : parseFloat(value)), // Đọc từ DB ra ép thành số thực
};

@Entity('grave_locations')
export class GraveLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  person_id: number;

  @Column({ length: 200, nullable: true })
  cemetery_name: string;

  @Column({ length: 100, nullable: true })
  area: string;

  @Column({ length: 50, nullable: true })
  row_number: string;

  @Column({ length: 50, nullable: true })
  plot_number: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
    transformer: numericTransformer,
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
    transformer: numericTransformer,
  })
  longitude: number;

  @Column({ length: 500, nullable: true })
  map_image: string;

  @Column({ length: 500, nullable: true })
  note: string;

  @CreateDateColumn()
  created_at;
}
