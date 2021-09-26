import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface Part {
  title: string;
  content: string;
  video: string;
  audio: string;
  order: number;
}

@Entity({ name: 'sermons' })
export class Sermon extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;

  @Column({ nullable: true })
  public title: string;

  @Column({ unique: true, nullable: true })
  public slug: string;

  @Column({ nullable: true })
  public featuredImage: string;

  @Column({ nullable: true })
  public category: string;

  @Column({ nullable: true })
  public content: string;

  @Column({ nullable: true })
  public color: string;

  @Column({ nullable: true })
  public video: string;

  @Column({ default: true })
  public showTitle: boolean;

  @Column({ type: 'jsonb', nullable: true })
  public parts: Part[];
}
