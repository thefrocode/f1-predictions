import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { LeaguePlayer } from '../../leagues/entities/league_player.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';
import { Team } from '../../predictions/entities/team.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nick_name: string;

  @Column()
  user_id: string;

  @OneToMany(() => League, (league) => league.owner)
  leagues: League[];

  @OneToMany(() => LeaguePlayer, (league_player) => league_player.player)
  leaguePlayers: LeaguePlayer[];

  @OneToMany(() => Prediction, (prediction) => prediction.player)
  predictions: Prediction[];

  @OneToMany(() => Team, (team) => team.player)
  teams: Team[];
}
