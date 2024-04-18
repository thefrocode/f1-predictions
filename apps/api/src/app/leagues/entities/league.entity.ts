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
import { LeagueTeam } from './league_team.entity';
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

  @OneToMany(() => LeagueTeam, (league_team) => league_team.league)
  leagueTeams: LeagueTeam[];

  // @OneToMany(() => SelectedLeague, (selected_league) => selected_league.league)
  // selectedLeagues: SelectedLeague[];
}
