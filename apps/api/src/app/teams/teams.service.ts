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

  findAll() {
    return this.teamsRepository.find();
  }
  findAllByPlayerId(player_id: number) {
    return this.teamsRepository.findBy({ player_id });
  }

  findOne(id: number) {
    return this.teamsRepository.findOne({ where: { id } });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamsRepository.delete(id);
  }
}
