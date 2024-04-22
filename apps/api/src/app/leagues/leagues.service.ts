import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection, getConnection, IsNull, Not, Repository } from 'typeorm';
import { Prediction } from '../predictions/entities/prediction.entity';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { CreateLeagueDto } from './dto/create-league.dto';
import { SelectLeagueDto } from './dto/select-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { LeaguePlayer } from './entities/league_player.entity';
import { SelectedLeague } from './entities/selected_league.entity';

@Injectable()
export class LeaguesService {
  @InjectRepository(League)
  private readonly leaguesRepository: Repository<League>;

  @InjectRepository(LeaguePlayer)
  private readonly leaguePlayersRepository: Repository<LeaguePlayer>;

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

  async findAll(player_id: number) {
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

    const activePlayerSubQuery = this.connection
      .createQueryBuilder()
      .select(['active_player_positions.*'])
      .from('(' + positionsSubQuery + ')', 'active_player_positions')
      .where('active_player_positions.player_id = :player_id', { player_id });

    return this.leaguesRepository
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
        'league_players.player_id=positions.player_id and league_players.league_id=positions.league_id'
      )
      .groupBy('leagues.id')
      .setParameters(activePlayerSubQuery.getParameters())
      .getRawMany();
  }

  async findOne(player_id: number) {
    const race_id = await this.predictionsRepository.maximum('race_id', {
      result: Not(IsNull()),
    });

    const league = await this.selectedLeagueRepository.findOneBy({
      player_id,
    });
    console.log('League', league);

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

    return this.leaguePlayersRepository
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
      )
      .setParameters(lastRacePointsSubQuery.getParameters())
      .where('league_id = :league_id', { league_id: league?.league_id })
      .getRawMany();
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguesRepository.delete(id);
  }
}
