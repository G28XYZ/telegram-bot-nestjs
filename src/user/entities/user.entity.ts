import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUser } from 'src/types';

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

  /** createdAt — дата создания, тип значения Date; */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  /** updatedAt — дата изменения, тип значения Date. */
  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // updatedAt: Date;
}
