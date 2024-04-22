import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from '../../predictions/entities/result.entity';
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
  country: string;

  @Column()
  fp1_time: Date;

  @Column()
  fp2_time: Date;

  @Column()
  fp3_time: Date;

  @Column()
  quali_time: Date;

  @Column()
  race_time: Date;

  @Column()
  race_number: string;

  @Column()
  active: boolean;

  @OneToMany(() => Prediction, (prediction) => prediction.race)
  predictions: Prediction[];

  @OneToMany(() => Result, (result) => result.race)
  results: Result[];
}
