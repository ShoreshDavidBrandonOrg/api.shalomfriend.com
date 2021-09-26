import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { Part } from './Part';

interface Part {
  title: string;
  content: string;
  video: string;
  audio: string;
  order: number;
}

type ResourceType = 'jewish' | 'article';

@Entity({ name: 'resources' })
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: true, unique: true })
  public slug: string;

  @Column({ nullable: true })
  public featuredImage: string;

  @Column({ nullable: true })
  public externalLink: string;

  @Column({ nullable: true })
  public category: string;

  @Column({ nullable: true })
  public content: string;

  @Column({ nullable: false, default: '#5A17C7' })
  public color: string;

  @Column({ nullable: false })
  public order: number;

  @Column({ nullable: false })
  public resourceType: ResourceType;

  @Column({ nullable: true })
  public video: string;

  @Column({ nullable: true })
  public audio: string;

  @Column({ default: true })
  public showTitle: boolean;

  @Column({ type: 'jsonb', nullable: true })
  public parts: Part[];
}
