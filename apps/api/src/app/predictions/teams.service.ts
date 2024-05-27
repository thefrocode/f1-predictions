import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../results/entities/result.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PredictionType } from './entities/prediction-type.entity';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  @InjectRepository(Team)
  private readonly teamsRepository: Repository<Team>;

  @InjectRepository(PredictionType)
  private readonly predictionTypesRepsitory: Repository<PredictionType>;

  @InjectRepository(Result)
  private readonly resultsRepository: Repository<Result>;

  create(createTeamDto: CreateTeamDto) {
    const newTeam = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.insert(newTeam);
  }
  async update(player_id: number, updateTeamDto: CreateTeamDto[]) {
    for (const prediction of updateTeamDto) {
      const team = await this.teamsRepository.findOne({
        where: {
          player_id: player_id,
          prediction_type_id: prediction.prediction_type_id,
        },
      });

      if (team) {
        team.driver_id = prediction.driver_id!;
        await this.teamsRepository.save(team);
      } else {
        await this.create({
          ...prediction,
          player_id,
        });
      }
    }
    return this.findOne(player_id);
  }
  async findOne(player_id: number) {
    const team = await this.teamsRepository
      .createQueryBuilder('teams')
      .select(['teams.*'])
      .where('player_id = :player_id', { player_id });

    return this.predictionTypesRepsitory
      .createQueryBuilder('prediction_types')
      .leftJoinAndSelect(
        '(' + team.getQuery() + ')',
        'team',
        'prediction_types.id = team.prediction_type_id'
      )
      .leftJoinAndSelect('drivers', 'drivers', 'drivers.id = team.driver_id')
      .where('prediction_types.type!="Not Played"')
      .orderBy('prediction_types.id')
      .setParameters(team.getParameters())
      .getRawMany()
      .then((teams) => {
        return teams.map((t) => ({
          prediction_type_id: t.prediction_types_id,
          prediction_type: t.prediction_types_name,
          driver_name: t.drivers_name,
          driver_id: t.driver_id,
        }));
      });
  }
}
