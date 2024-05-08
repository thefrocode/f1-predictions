import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../results/entities/result.entity';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';
import { Team } from './entities/team.entity';

@Injectable()
export class PredictionsService {
  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  @InjectRepository(Team)
  private readonly teamsRepository: Repository<Team>;

  @InjectRepository(Result)
  private readonly resultsRepository: Repository<Result>;

  async create(race_id: number) {
    //for Positional prediction types
    const resultsSubQuery = this.resultsRepository
      .createQueryBuilder('results')
      .select(['results.*'])
      .innerJoin(
        'prediction_types',
        'prediction_types',
        'results.prediction_type_id = prediction_types.id'
      )
      .where('prediction_types.type!="Random"')
      .getQuery();

    const positionalPredictions = this.teamsRepository
      .createQueryBuilder('teams')
      .select([
        'results.race_id as race_id,teams.player_id as player_id,teams.prediction_type_id as prediction_type_id,\
        teams.driver_id as prediction,actual_results.driver_id as result,(20-abs(results.prediction_type_id-teams.prediction_type_id))as points',
      ])
      .innerJoin(
        '(' + resultsSubQuery + ')',
        'results',
        'teams.driver_id = results.driver_id'
      )
      .innerJoin(
        'results',
        'actual_results',
        'teams.prediction_type_id=actual_results.prediction_type_id and results.race_id=actual_results.race_id'
      )
      .innerJoin(
        'prediction_types',
        'prediction_types',
        'teams.prediction_type_id = prediction_types.id'
      )
      .where('prediction_types.type!="Random"')
      .andWhere('results.race_id = :race_id', { race_id })
      .orderBy('teams.prediction_type_id')
      .getRawMany();

    //for Random prediction types

    const randomPredictions = this.teamsRepository
      .createQueryBuilder('teams')
      .select([
        'results.race_id as race_id,teams.player_id as player_id,results.prediction_type_id,teams.driver_id as prediction,results.driver_id as result, (if(teams.driver_id=results.driver_id,5,0)) as points',
      ])
      .innerJoin(
        'results',
        'results',
        'teams.prediction_type_id=results.prediction_type_id'
      )
      .innerJoin(
        'prediction_types',
        'prediction_types',
        'teams.prediction_type_id=prediction_types.id'
      )
      .where('race_id = :race_id', { race_id })
      .andWhere('prediction_types.type="Random"')
      .getRawMany();

    const predictions = Promise.all([positionalPredictions, randomPredictions])
      .then((results) => {
        return results.reduce((acc, curr) => acc.concat(curr), []);
      })
      .then((mergedArray) => {
        return mergedArray.map((prediction) => {
          const newPrediction = this.predictionsRepository.create(prediction);
          this.predictionsRepository.insert(newPrediction);
        });
      })
      .catch((error) => {
        console.error('At least one promise rejected:', error);
      });

    return { predictions, randomPredictions };
  }

  findAll() {
    return `This action returns all predictions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
