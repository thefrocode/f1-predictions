import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../../drivers/entities/driver.entity';
import { Race } from '../../races/entities/race.entity';
import { Team } from '../../teams/entities/team.entity';
import { PredictionType } from './prediction-type.entity';

@Entity()
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race_id: number;

  @Column()
  team_id: number;

  @Column()
  prediction_type_id: number;

  @Column()
  driver_id: number;

  @ManyToOne(() => Race, (race) => race.predictions)
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Team, (team) => team.predictions)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(
    () => PredictionType,
    (prediction_type) => prediction_type.predictions
  )
  @JoinColumn({ name: 'prediction_type_id' })
  prediction_type: PredictionType;

  @ManyToOne(() => Driver, (driver) => driver.predictions)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
