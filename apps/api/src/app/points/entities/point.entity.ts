import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PredictionType } from '../../predictions/entities/prediction-type.entity';
import { Race } from '../../races/entities/race.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team_id: string;

  @Column()
  race_id: string;

  @Column()
  prediction_type_id: string;

  @Column()
  points: string;

  @ManyToOne(() => Race, (race) => race.points)
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Team, (team) => team.points)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => PredictionType, (prediction_type) => prediction_type.points)
  @JoinColumn({ name: 'prediction_type_id' })
  prediction_type: PredictionType;
}
