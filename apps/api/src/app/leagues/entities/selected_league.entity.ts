import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { LeagueTeam } from '../entities/league_team.entity';
import { League } from './league.entity';

@Entity('selected_league')
export class SelectedLeague {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_id: number;

  @Column()
  league_id: number;

  @OneToOne(() => Player)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => League, (league) => league.leagueTeams)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @OneToOne(() => LeagueTeam)
  @JoinColumn([
    { name: 'league_id', referencedColumnName: 'league_id' },
    { name: 'player_id', referencedColumnName: 'player_id' },
  ])
  league_team: LeagueTeam;
}
