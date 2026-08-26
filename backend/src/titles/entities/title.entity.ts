import { PersonTitle } from 'src/person-titles/entities/person-title.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => PersonTitle, (personTitle) => personTitle.title)
  personTitles: PersonTitle[];
}
