import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from '../../points/entities/point.entity';
import { Result } from './result.entity';
import { Prediction } from './prediction.entity';

@Entity('prediction_types')
export class PredictionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Prediction, (prediction) => prediction.prediction_type)
  predictions: Prediction[];

  @OneToMany(() => Point, (point) => point.prediction_type)
  points: Point[];

  @OneToMany(() => Result, (result) => result.prediction_type)
  results: Result[];
}
