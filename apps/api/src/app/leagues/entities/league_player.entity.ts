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
import { League } from './league.entity';

@Entity('league_players')
@Unique(['league_id', 'player_id'])
export class LeaguePlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  league_id: number;

  @Column()
  player_id: number;

  @ManyToOne(() => League, (league) => league.leaguePlayers)
  @JoinColumn({ name: 'league_id' })
  league: League;

  @ManyToOne(() => Player, (player) => player.leaguePlayers)
  @JoinColumn({ name: 'player_id' })
  player: Player;
}
