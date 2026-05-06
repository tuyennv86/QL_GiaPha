import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryColumn()
  id: number;

  @Column()
  family_id: number;

  @Column({ nullable: true })
  branch_id: number;

  @Column({ length: 200 })
  full_name: string;

  @Column()
  gender: number;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  death_date: Date;

  @Column({ nullable: true })
  biography: string;

  @Column({ length: 500, nullable: true })
  avatar: string;

  @Column({ nullable: true })
  generation: number;

  @Column({ nullable: true })
  is_alive: boolean;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  place_of_birth: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  update_at: Date;

  //   @ManyToOne(() => Family, (family) => family.id, { onDelete: 'CASCADE' })
}
