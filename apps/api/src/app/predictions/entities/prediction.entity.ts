import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { Player } from '../../players/entities/player.entity';
import { Race } from '../../races/entities/race.entity';
import { PredictionType } from './prediction-type.entity';

@Entity('predictions')
@Unique('one_prediction_type_per_race_per_player', [
  'player_id',
  'race_id',
  'prediction_type_id',
])
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race_id: number;

  @Column()
  player_id: number;

  @Column()
  prediction_type_id: number;

  @Column()
  prediction: number;

  @Column()
  result: number;

  @Column()
  points: number;

  @ManyToOne(() => Race, (race) => race.predictions)
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Player, (player) => player.predictions)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(
    () => PredictionType,
    (prediction_type) => prediction_type.predictions
  )
  @JoinColumn({ name: 'prediction_type_id' })
  prediction_type: PredictionType;

  @ManyToOne(() => Driver, (driver) => driver.predictions)
  @JoinColumn({ name: 'prediction' })
  predicted_driver: Driver;

  @ManyToOne(() => Driver, (driver) => driver.predictions)
  @JoinColumn({ name: 'result' })
  correct_driver: Driver;
}
