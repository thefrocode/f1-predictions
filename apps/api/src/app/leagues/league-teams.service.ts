import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { LeagueTeam } from './entities/league_team.entity';

@Injectable()
export class LeagueTeamsService {
  @InjectRepository(LeagueTeam)
  private readonly leagueTeamsRepository: Repository<LeagueTeam>;

  addTeamToLeague(joinLeagueDto: JoinLeagueDto) {
    const newLeagueTeam = this.leagueTeamsRepository.create(joinLeagueDto);
    return this.leagueTeamsRepository.insert(newLeagueTeam);
  }

  findAll() {
    return this.leagueTeamsRepository.find();
  }

  findOne(id: number) {
    return this.leagueTeamsRepository.findOne({ where: { id } });
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    //return this.leagueTeamsRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leagueTeamsRepository.delete(id);
  }
}
