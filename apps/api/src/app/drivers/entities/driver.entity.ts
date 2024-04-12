import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from '../../predictions/entities/result.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

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
}
