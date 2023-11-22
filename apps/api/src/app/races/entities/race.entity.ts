import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from '../../points/entities/point.entity';
import { Result } from '../../points/entities/result.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

@Entity('races')
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  short_name: string;

  @Column()
  fp1_time: Date;

  @Column()
  fp2_time: Date;

  @Column()
  fp3_time: Date;

  @Column()
  qualifying_time: Date;

  @Column()
  race_time: Date;

  @Column()
  race_number: string;

  @OneToMany(() => Prediction, (prediction) => prediction.race)
  predictions: Prediction[];

  @OneToMany(() => Point, (point) => point.race)
  points: Point[];

  @OneToMany(() => Result, (result) => result.race)
  results: Result[];
}
