import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { PredictionType } from './prediction-type.entity';
import { Race } from '../../races/entities/race.entity';

@Entity({ name: 'results' })
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
