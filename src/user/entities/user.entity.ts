import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { IUser } from 'src/types';
import { hash } from 'bcryptjs';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'text', default: 'unknown' })
  first_name: string;

  @Column({ type: 'text', default: 'unknown' })
  last_name: string;

  @Column({ type: 'text', default: 'unknown' })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
