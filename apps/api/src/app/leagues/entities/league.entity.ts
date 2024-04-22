import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { LeaguePlayer } from './league_player.entity';
import { SelectedLeague } from './selected_league.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique('name_UNIQUE', ['name'])
  @Column()
  name: string;

  @Column()
  owner_id: number;

  @ManyToOne(() => Player, (player) => player.leagues)
  @JoinColumn({ name: 'owner_id' })
  owner: Player;

  @OneToMany(() => LeaguePlayer, (league_player) => league_player.league)
  leaguePlayers: LeaguePlayer[];

  // @OneToMany(() => SelectedLeague, (selected_league) => selected_league.league)
  // selectedLeagues: SelectedLeague[];
}
