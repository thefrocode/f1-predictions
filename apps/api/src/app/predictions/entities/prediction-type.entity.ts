import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from './result.entity';
import { Prediction } from './prediction.entity';
import { Team } from './team.entity';

@Entity('prediction_types')
export class PredictionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => Prediction, (prediction) => prediction.prediction_type)
  predictions: Prediction[];

  @OneToMany(() => Result, (result) => result.prediction_type)
  results: Result[];

  @OneToMany(() => Team, (team) => team.prediction_type)
  teams: Team[];
}
