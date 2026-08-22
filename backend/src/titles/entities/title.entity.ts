import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('titles')
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  title_name: string;

  @Column({ nullable: false })
  scope_level: number;

  @Column({ nullable: true, length: 500 })
  description: string;
}
