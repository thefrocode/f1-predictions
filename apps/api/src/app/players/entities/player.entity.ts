import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  user_id: string;

  @OneToMany(() => League, (league) => league.owner)
  leagues: League[];

  @OneToMany(() => Team, (team) => team.player)
  teams: Team[];
}
