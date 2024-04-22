import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { LeaguePlayer } from './entities/league_player.entity';

@Injectable()
export class LeaguePlayersService {
  @InjectRepository(LeaguePlayer)
  private readonly leaguePlayersRepository: Repository<LeaguePlayer>;

  create(joinLeagueDto: JoinLeagueDto) {
    const newLeaguePlayer = this.leaguePlayersRepository.create(joinLeagueDto);
    return this.leaguePlayersRepository.insert(newLeaguePlayer);
  }

  findAll() {
    return this.leaguePlayersRepository.find();
  }

  findOne(id: number) {
    return this.leaguePlayersRepository.findOne({ where: { id } });
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    //return this.leaguePlayersRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguePlayersRepository.delete(id);
  }
}
