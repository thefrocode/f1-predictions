import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeagueTeam } from '../leagues/entities/league_team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
  @InjectRepository(Team)
  private readonly teamsRepository: Repository<Team>;

  @InjectRepository(LeagueTeam)
  private readonly leagueTeamsRepository: Repository<LeagueTeam>;

  // async create(createTeamDto: CreateTeamDto) {
  //   const newTeam = this.teamsRepository.create(createTeamDto);
  //   const createdTeam = await this.teamsRepository.insert(newTeam);
  //   return { ...newTeam, id: createdTeam.identifiers[0].id };
  // }

  // findAll() {
  //   return this.teamsRepository.find();
  // }
  // findAllByPlayerId(player_id: number) {
  //   return this.teamsRepository.findBy({ player_id });
  // }
  // findAllByLeagueId(league_id: number) {
  //   return this.leagueTeamsRepository.find({
  //     relations: ['team'],
  //     where: { league_id },
  //   });
  // }

  // findOne(id: number) {
  //   return this.teamsRepository.findOne({ where: { id } });
  // }

  // update(id: number, updateTeamDto: UpdateTeamDto) {
  //   return this.teamsRepository.update(id, updateTeamDto);
  // }

  // remove(id: number) {
  //   return this.teamsRepository.delete(id);
  // }
}
