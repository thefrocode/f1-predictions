import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  @InjectRepository(Team)
  private readonly teamsRepository: Repository<Team>;

  create(createTeamDto: CreateTeamDto) {
    const newTeam = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.insert(newTeam);
  }
  async update(player_id: number, updateTeamDto: CreateTeamDto[]) {
    console.log(updateTeamDto);

    for (const prediction of updateTeamDto) {
      const team = await this.teamsRepository.findOne({
        where: {
          player_id: prediction.player_id,
          prediction_type_id: prediction.prediction_type_id,
        },
      });

      if (team) {
        team.driver_id = prediction.driver_id!;
        await this.teamsRepository.save(team);
      }
    }
    return this.findOne(player_id);
  }
  async findOne(player_id: number) {
    return this.teamsRepository
      .find({
        relations: ['prediction_type', 'driver'],
        where: { player_id },
      })
      .then((teams) => {
        return teams.map((t) => ({
          prediction_type_id: t.prediction_type.id,
          prediction_type: t.prediction_type.name,
          driver_name: t.driver?.name,
          driver_id: t.driver?.id,
        }));
      });
  }
}
