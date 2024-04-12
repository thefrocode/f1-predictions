import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection, getConnection, Repository } from 'typeorm';
import { Prediction } from '../predictions/entities/prediction.entity';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { LeagueTeam } from './entities/league_team.entity';

@Injectable()
export class LeaguesService {
  @InjectRepository(League)
  private readonly leaguesRepository: Repository<League>;

  @InjectRepository(LeagueTeam)
  private readonly leagueTeamsRepository: Repository<LeagueTeam>;

  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  constructor(@InjectConnection() private connection: Connection) {}

  create(createLeagueDto: CreateLeagueDto) {
    const newLeague = this.leaguesRepository.create(createLeagueDto);
    return this.leaguesRepository.insert(newLeague);
  }
  addTeamToLeague(joinLeagueDto: JoinLeagueDto) {
    const newLeagueTeam = this.leagueTeamsRepository.create(joinLeagueDto);
    return this.leagueTeamsRepository.insert(newLeagueTeam);
  }

  async findAll(player_id: number) {
    const pointsSubQuery = this.predictionsRepository
      .createQueryBuilder('predictions')
      .select(['player_id', 'sum(points) as points'])
      .groupBy('player_id')
      .getSql();

    const positionsSubQuery = this.leagueTeamsRepository
      .createQueryBuilder('league_teams')
      .select([
        'league_id',
        'league_teams.player_id as player_id',
        'ROW_NUMBER() over(partition by league_id order by points desc) as position',
      ])
      .innerJoin(
        '(' + pointsSubQuery + ')',
        'points',
        'league_teams.player_id=points.player_id'
      )
      .getSql();

    const activePlayerSubQuery = this.connection
      .createQueryBuilder()
      .select(['active_player_positions.*'])
      .from('(' + positionsSubQuery + ')', 'active_player_positions')
      .where('active_player_positions.player_id = :player_id', { player_id });

    return this.leaguesRepository
      .createQueryBuilder('leagues')
      .select(['*'])
      .leftJoin(
        'league_teams',
        'league_teams',
        'leagues.id=league_teams.league_id'
      )
      .leftJoin(
        '(' + activePlayerSubQuery.getQuery() + ')',
        'positions',
        'league_teams.player_id=positions.player_id and league_teams.league_id=positions.league_id'
      )
      .groupBy('league_teams.league_id')
      .setParameters(activePlayerSubQuery.getParameters())
      .getRawMany();
  }
  findPlayersByLeagueId(leagueId: number) {
    return this.leagueTeamsRepository.find({
      relations: ['player'],
      where: { league_id: leagueId },
    });
  }

  findOne(id: number) {
    return this.leaguesRepository.findOne({ where: { id } });
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguesRepository.delete(id);
  }
}
