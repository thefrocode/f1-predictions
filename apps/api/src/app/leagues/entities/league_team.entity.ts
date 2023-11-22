import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity('league_teams')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  league_id: number;

  @Column()
  team_id: number;

  @OneToOne(() => League)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
