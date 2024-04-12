import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { LeagueTeam } from '../../leagues/entities/league_team.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';
import { Team } from '../../teams/entities/team.entity';

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

  @OneToMany(() => LeagueTeam, (league_team) => league_team.player)
  leagueTeams: LeagueTeam[];

  @OneToMany(() => Prediction, (prediction) => prediction.player)
  predictions: Prediction[];
}
