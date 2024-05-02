import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { PredictionType } from '../../predictions/entities/prediction-type.entity';
import { Race } from '../../races/entities/race.entity';

@Entity({ name: 'results' })
@Unique('race_prediction_type', ['race_id', 'prediction_type_id'])
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race_id: number;

  @Column()
  prediction_type_id: number;

  @Column()
  driver_id: number;

  @ManyToOne(() => Race, (race) => race.results)
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => PredictionType, (prediction_type) => prediction_type.results)
  @JoinColumn({ name: 'prediction_type_id' })
  prediction_type: PredictionType;

  @ManyToOne(() => Driver, (driver) => driver.results)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
