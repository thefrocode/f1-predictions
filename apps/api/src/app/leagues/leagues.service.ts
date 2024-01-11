import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';
import { LeagueTeam } from './entities/league_team.entity';

@Injectable()
export class LeaguesService {
  @InjectRepository(League)
  private readonly leaguesRepository: Repository<League>;

  @InjectRepository(LeagueTeam)
  private readonly leagueTeamsRepository: Repository<LeagueTeam>;

  create(createLeagueDto: CreateLeagueDto) {
    const newLeague = this.leaguesRepository.create(createLeagueDto);
    return this.leaguesRepository.insert(newLeague);
  }
  addTeamToLeague(joinLeagueDto: JoinLeagueDto) {
    const newLeagueTeam = this.leagueTeamsRepository.create(joinLeagueDto);
    return this.leagueTeamsRepository.insert(newLeagueTeam);
  }

  findAll() {
    return this.leaguesRepository.find();
  }
  findPlayersByLeagueId(leagueId: number) {
    return this.leagueTeamsRepository.find({
      relations: ['player'],
      where: { league_id: leagueId },
    });
  }

  findOne(id: number) {
    return this.leaguesRepository.findOne({ where: { id } });
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguesRepository.delete(id);
  }
}
