import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { LeaguePlayer } from '../entities/league_player.entity';
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
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  player: Player;

  @ManyToOne(() => League, (league) => league.leaguePlayers)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @OneToOne(() => LeaguePlayer)
  @JoinColumn([
    { name: 'league_id', referencedColumnName: 'league_id' },
    { name: 'player_id', referencedColumnName: 'player_id' },
  ])
  league_player: LeaguePlayer;
}
