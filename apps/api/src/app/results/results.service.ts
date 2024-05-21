import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictionType } from '../predictions/entities/prediction-type.entity';
import { Prediction } from '../predictions/entities/prediction.entity';
import { PredictionsService } from '../predictions/predictions.service';
import { Race } from '../races/entities/race.entity';
import { RacesService } from '../races/races.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';

@Injectable()
export class ResultsService {
  @InjectRepository(Result)
  private readonly resultsRepository: Repository<Result>;

  @InjectRepository(PredictionType)
  private readonly predictionTypesRepository: Repository<PredictionType>;

  @InjectRepository(Race)
  private readonly racesRepository: Repository<Race>;

  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  @InjectRepository(Driver)
  private readonly driversRepository: Repository<Driver>;

  constructor(
    private readonly predictionsService: PredictionsService,
    private readonly racesService: RacesService
  ) {}

  async create(createResultDto: CreateResultDto) {
    const results = createResultDto.results.map((result) => {
      return {
        ...result,
        race_id: createResultDto.race_id,
      };
    });
    await this.resultsRepository.save(results);
    await this.predictionsService.create(createResultDto.race_id);
    await this.racesService.update(createResultDto.race_id, {
      race_status: 'Completed',
    });
    return this.racesService.update(createResultDto.race_id + 1, {
      race_status: 'Active',
    });
  }

  async findAll(options: IPaginationOptions) {
    const predictionTypesQuery = await this.predictionTypesRepository
      .createQueryBuilder('prediction_types')
      .select([
        "GROUP_CONCAT(CONCAT('MAX(CASE WHEN prediction_types.id = ''', id, ''' THEN drivers.name ELSE 0 END) AS ', name) SEPARATOR ', ') as pivot_columns",
      ])
      .where('type!="Not Played"')
      .getRawOne();
    const predictionTypesQuery2 = await this.predictionTypesRepository
      .createQueryBuilder('prediction_types')
      .select([
        "GROUP_CONCAT(CONCAT('MAX(CASE WHEN prediction_types.id = ''', id, ''' THEN drivers.name ELSE 0 END) AS ', name) SEPARATOR ', ') as pivot_columns",
      ])
      .where('type="Not Played"')
      .andWhere('id>5 and id<=15')
      .getRawOne();
    const predictionTypesQuery3 = await this.predictionTypesRepository
      .createQueryBuilder('prediction_types')
      .select([
        "GROUP_CONCAT(CONCAT('MAX(CASE WHEN prediction_types.id = ''', id, ''' THEN drivers.name ELSE 0 END) AS ', name) SEPARATOR ', ') as pivot_columns",
      ])
      .where('type="Not Played"')
      .andWhere('id>15')
      .getRawOne();

    const resultsQuery = this.resultsRepository
      .createQueryBuilder('results')
      .select(['race_id, races.short_name as name'])
      .addSelect(predictionTypesQuery.pivot_columns)
      .addSelect(predictionTypesQuery2.pivot_columns)
      .addSelect(predictionTypesQuery3.pivot_columns)
      .innerJoin('drivers', 'drivers', 'results.driver_id = drivers.id')
      .innerJoin('races', 'races', 'results.race = races.id')
      .innerJoin(
        'prediction_types',
        'prediction_types',
        'results.prediction_type_id = prediction_types.id'
      )
      .groupBy('race_id')
      .orderBy('race_id', 'ASC');

    return paginateRaw<any>(resultsQuery, options);
  }

  async findOne() {
    const overall_highest_points = await this.predictionsRepository
      .createQueryBuilder('predictions')
      .select([
        'predictions.player_id as player_id',
        'SUM(predictions.points) as points',
        'players.name as name',
        'players.nick_name as nick_name',
      ])
      .innerJoin('players', 'players', 'predictions.player_id = players.id')
      .groupBy('predictions.player_id')
      .orderBy('points', 'DESC')
      .limit(1)
      .getRawOne();
    const last_race_id = await this.predictionsRepository.maximum('race_id');
    let last_race_highest_points;
    let top_scorer;
    let bottom_scorer;
    if (last_race_id) {
      last_race_highest_points = await this.predictionsRepository
        .createQueryBuilder('predictions')
        .select([
          'predictions.player_id as player_id',
          'SUM(predictions.points) as points',
          'players.name as name',
          'players.nick_name as nick_name',
        ])
        .innerJoin('players', 'players', 'predictions.player_id = players.id')
        .where('predictions.race_id = :race_id', { race_id: last_race_id })
        .groupBy('predictions.player_id')
        .orderBy('points', 'DESC')
        .limit(1)
        .getRawOne();

      const driver_points = this.resultsRepository
        .createQueryBuilder('results')
        .select([
          'if(prediction_type_id<=20,(20-prediction_type_id+1),5) as points',
          'driver_id',
        ])
        .where('results.race_id = :race_id', { race_id: last_race_id });
      const driver_order = this.driversRepository
        .createQueryBuilder('drivers')
        .select([
          'drivers.id as driver_id',
          'drivers.name as name',
          'SUM(points) as points',
        ])
        .innerJoin(
          '(' + driver_points.getQuery() + ')',
          'points_per_predicition',
          'drivers.id = points_per_predicition.driver_id'
        )
        .groupBy('drivers.id');

      top_scorer = await driver_order
        .orderBy('points', 'DESC')
        .limit(1)
        .setParameters(driver_points.getParameters())
        .getRawOne();
      bottom_scorer = await driver_order
        .orderBy('points', 'ASC')
        .limit(1)
        .setParameters(driver_points.getParameters())
        .getRawOne();
    }
    return {
      top_teams: {
        overall_highest_points,
        last_race_highest_points,
      },
      driver_points: {
        top_scorer,
        bottom_scorer,
      },
    };
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
