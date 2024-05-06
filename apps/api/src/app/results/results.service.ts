import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictionType } from '../predictions/entities/prediction-type.entity';
import { PredictionsService } from '../predictions/predictions.service';
import { Race } from '../races/entities/race.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  @InjectRepository(Result)
  private readonly resultsRepository: Repository<Result>;

  @InjectRepository(PredictionType)
  private readonly predictionTypesRepository: Repository<PredictionType>;

  constructor(private readonly predictionsService: PredictionsService) {}

  async create(createResultDto: CreateResultDto) {
    const results = createResultDto.results.map((result) => {
      return {
        ...result,
        race_id: createResultDto.race_id,
      };
    });
    await this.resultsRepository.save(results);
    return await this.predictionsService.create(createResultDto.race_id);
  }

  async findAll() {
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
      .andWhere('id<20')
      .getRawOne();
    const predictionTypesQuery3 = await this.predictionTypesRepository
      .createQueryBuilder('prediction_types')
      .select([
        "GROUP_CONCAT(CONCAT('MAX(CASE WHEN prediction_types.id = ''', id, ''' THEN drivers.name ELSE 0 END) AS ', name) SEPARATOR ', ') as pivot_columns",
      ])
      .where('type="Not Played"')
      .andWhere('id>20')
      .getRawOne();

    const results = this.resultsRepository
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
      .orderBy('race_id', 'ASC')
      .getRawMany();

    return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
