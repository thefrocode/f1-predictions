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
  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }
  async findOne(player_id: number) {
    // console.log(
    //   await this.teamsRepository
    //     .find({
    //       relations: ['prediction_type', 'driver'],
    //       where: { player_id },
    //     })
    //     .then((teams) => {
    //       return teams.map((t) => ({
    //         prediction_type: t.prediction_type.name,
    //         driver: t.driver?.name,
    //         driver_id: t.driver?.id,
    //       }));
    //     })
    // );
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
