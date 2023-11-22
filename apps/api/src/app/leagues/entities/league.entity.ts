import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  owner_id: number;

  @ManyToOne(() => Player, (player) => player.leagues)
  @JoinColumn({ name: 'owner_id' })
  owner: Player;
}
