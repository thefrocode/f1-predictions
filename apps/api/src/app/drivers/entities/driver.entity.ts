import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prediction } from '../../predictions/entities/prediction.entity';
import { Team } from '../../predictions/entities/team.entity';
import { Result } from '../../results/entities/result.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Prediction, (prediction) => prediction.predicted_driver)
  predictions: Prediction[];

  @OneToMany(() => Result, (result) => result.driver)
  results: Result[];

  @ManyToMany(() => Team, (team) => team.driver)
  teams: Result[];
}
