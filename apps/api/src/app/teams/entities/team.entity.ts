import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Point } from '../../points/entities/point.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  player_id: number;

  @ManyToOne(() => Player, (player) => player.leagues)
  @JoinColumn({ name: 'owner_id' })
  player: Player;

  @OneToMany(() => Prediction, (prediction) => prediction.team)
  predictions: Prediction[];

  @OneToMany(() => Point, (point) => point.team)
  points: Point[];
}
