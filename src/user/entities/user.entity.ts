import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from 'src/types';
// import { hash } from 'bcryptjs';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', default: 'unknown' })
  first_name: string;

  @Column({ type: 'text', default: 'unknown' })
  last_name: string;

  @Column({ type: 'text', default: 'unknown' })
  username: string;

  /** createdAt — дата создания, тип значения Date; */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  /** updatedAt — дата изменения, тип значения Date. */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ select: false, default: '' })
  password: string;

  @Column({ default: '' })
  comment: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await hash(this.password, 10);
  // }
}
