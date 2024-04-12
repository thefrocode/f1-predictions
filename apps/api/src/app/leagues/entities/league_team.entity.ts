import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { Team } from '../../teams/entities/team.entity';
import { League } from './league.entity';

@Entity('league_teams')
@Unique(['league_id', 'player_id'])
export class LeagueTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  league_id: number;

  @Column()
  player_id: number;

  @ManyToOne(() => League, (league) => league.leagueTeams)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @ManyToOne(() => Player, (player) => player.leagueTeams)
  @JoinColumn({ name: 'player_id' })
  player: Player;
}
