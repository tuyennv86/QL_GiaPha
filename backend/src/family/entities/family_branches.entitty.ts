import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('family_branches')
export class FamilyBranches {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false })
  family_id: null;

  @Column({ nullable: false, length: 200 })
  branch_name: string;

  @Column({ nullable: true })
  branch_order: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
