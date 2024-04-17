import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { LeagueTeam } from '../entities/league_team.entity';

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

  @OneToOne(() => LeagueTeam, (leagueTeam) => leagueTeam.league)
  @JoinColumn({ name: 'league_id' })
  league_team: LeagueTeam;
}
