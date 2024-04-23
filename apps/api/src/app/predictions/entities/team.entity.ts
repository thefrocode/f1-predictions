import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { Player } from '../../players/entities/player.entity';
import { PredictionType } from './prediction-type.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_id: number;

  @Column()
  prediction_type_id: number;

  @Column({
    nullable: true,
  })
  driver_id: number;

  @ManyToOne(() => Player, (player) => player.teams)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => PredictionType, (prediction_type) => prediction_type.teams)
  @JoinColumn({ name: 'prediction_type_id' })
  prediction_type: PredictionType;

  @ManyToOne(() => Driver, (driver) => driver.teams)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
