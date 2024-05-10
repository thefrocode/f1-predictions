import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Prediction } from '../../predictions/entities/prediction.entity';
import { Result } from '../../results/entities/result.entity';

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
  race_status: string;

  @OneToMany(() => Prediction, (prediction) => prediction.race)
  predictions: Prediction[];

  @OneToMany(() => Result, (result) => result.race)
  results: Result[];
}
