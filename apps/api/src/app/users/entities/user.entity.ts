import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Player } from '../../players/entities/player.entity';

@Entity('users')
@Unique('email_UNIQUE', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  googleId: string;
}
