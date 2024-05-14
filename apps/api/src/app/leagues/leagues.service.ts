import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, IsNull, Not, Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity';
import { Prediction } from '../predictions/entities/prediction.entity';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { LeaguePlayer } from './entities/league_player.entity';
import { SelectedLeague } from './entities/selected_league.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
  paginateRaw,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LeaguesService {
  @InjectRepository(League)
  private readonly leaguesRepository: Repository<League>;

  @InjectRepository(LeaguePlayer)
  private readonly leaguePlayersRepository: Repository<LeaguePlayer>;

  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  @InjectRepository(SelectedLeague)
  private readonly selectedLeagueRepository: Repository<SelectedLeague>;

  constructor(@InjectConnection() private connection: Connection) {}

  create(createLeagueDto: CreateLeagueDto) {
    const newLeague = this.leaguesRepository.create(createLeagueDto);
    return this.leaguesRepository.insert(newLeague);
  }
  addTeamToLeague(joinLeagueDto: JoinLeagueDto) {
    const newLeaguePlayer = this.leaguePlayersRepository.create(joinLeagueDto);
    return this.leaguePlayersRepository.insert(newLeaguePlayer);
  }
  async findAllLeagies(
    options: IPaginationOptions,
    player_id: number
  ): Promise<Pagination<League>> {
    const query = this.leaguesRepository.createQueryBuilder('leagues');
    return paginate<any>(query, options);
  }

  async findAll(
    options: IPaginationOptions,
    filter: string,
    player_id?: number
  ): Promise<Pagination<any>> {
    const pointsSubQuery = this.predictionsRepository
      .createQueryBuilder('predictions')
      .select(['player_id', 'sum(points) as points'])
      .groupBy('player_id')
      .getSql();

    const positionsSubQuery = this.leaguePlayersRepository
      .createQueryBuilder('league_players')
      .select([
        'league_id',
        'league_players.player_id as player_id',
        'ROW_NUMBER() over(partition by league_id order by points desc) as position',
      ])
      .innerJoin(
        '(' + pointsSubQuery + ')',
        'points',
        'league_players.player_id=points.player_id'
      )
      .getSql();

    if (player_id) {
      const activePlayerSubQuery = this.connection
        .createQueryBuilder()
        .select(['active_player_positions.*'])
        .from('(' + positionsSubQuery + ')', 'active_player_positions')
        .where('active_player_positions.player_id = :player_id', {
          player_id,
        });

      const query = this.leaguesRepository
        .createQueryBuilder('leagues')
        .select([
          'leagues.id as id, leagues.name as name, league_players.player_id as player_id, positions.position',
        ])
        .leftJoin(
          'league_players',
          'league_players',
          'leagues.id=league_players.league_id'
        )
        .leftJoin(
          '(' + activePlayerSubQuery.getQuery() + ')',
          'positions',
          'league_players.league_id=positions.league_id'
        )
        .groupBy('leagues.id')
        .orderBy('positions.position', 'DESC')
        .setParameters(activePlayerSubQuery.getParameters());
      if (filter) {
        // Apply filtering

        query.where('leagues.name LIKE :filter ', {
          filter: `%${filter}%`,
        });
      }

      return paginateRaw<any>(query, options);
    } else {
      const query = this.leaguesRepository
        .createQueryBuilder('leagues')
        .select([
          'leagues.id as id, leagues.name as name, league_players.player_id as player_id',
        ])
        .leftJoin(
          'league_players',
          'league_players',
          'leagues.id=league_players.league_id'
        )
        .groupBy('leagues.id')
        .orderBy('leagues.id', 'ASC');
      if (filter) {
        // Apply filtering

        query.where('leagues.name LIKE :filter ', {
          filter: `%${filter}%`,
        });
      }

      return paginateRaw<any>(query, options);
    }
  }

  async findOne(
    league_id: number,
    options: IPaginationOptions,
    filter: string
  ): Promise<Pagination<any>> {
    const race_id = await this.predictionsRepository.maximum('race_id', {
      result: Not(IsNull()),
    });

    const pointsSubQuery = this.predictionsRepository
      .createQueryBuilder('predictions')
      .select(['player_id', 'sum(points) as points'])
      .groupBy('player_id')
      .getSql();
    const lastRacePointsSubQuery = this.predictionsRepository
      .createQueryBuilder('predictions')
      .select(['player_id', 'sum(points) as points'])
      .where('race_id = :race_id', { race_id })
      .groupBy('player_id');

    const query = await this.leaguePlayersRepository
      .createQueryBuilder('league_players')
      .select([
        'league_id',
        'league_players.player_id as player_id',
        'ROW_NUMBER() over(partition by league_id order by points.points desc) as position',
        'last_race_points.points as last_race_points',
        'points.points as total_points',
        'players.name as name',
      ])
      .innerJoin('players', 'players', 'league_players.player_id=players.id')
      .leftJoin(
        '(' + pointsSubQuery + ')',
        'points',
        'league_players.player_id=points.player_id'
      )
      .leftJoin(
        '(' + lastRacePointsSubQuery.getQuery() + ')',
        'last_race_points',
        'league_players.player_id=last_race_points.player_id'
      );

    query.setParameters(lastRacePointsSubQuery.getParameters());
    query.where('league_id = :league_id', { league_id });

    const players = await this.leaguePlayersRepository
      .createQueryBuilder('league_players')
      .select(['players.*'])
      .innerJoin(
        '(' + query.getQuery() + ')',
        'players',
        'league_players.player_id=players.player_id'
      )
      .setParameters(query.getParameters());

    if (filter) {
      query.where('players.name LIKE :filter', { filter: `%${filter}%` });
      query.groupBy('players.id');
    }

    return paginateRaw<any>(query, options);
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguesRepository.delete(id);
  }
}
