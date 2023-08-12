import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  projectId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdDate: string;
}
