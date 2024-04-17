import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { LeagueTeam } from './league_team.entity';
import { SelectedLeague } from './selected_league.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
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
