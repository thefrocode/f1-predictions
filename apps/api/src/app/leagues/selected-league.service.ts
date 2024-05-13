import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity';
import { SelectLeagueDto } from './dto/select-league.dto';
import { SelectedLeague } from './entities/selected_league.entity';

@Injectable()
export class SelectedLeagueService {
  @InjectRepository(SelectedLeague)
  private readonly selectedLeagueRepository: Repository<SelectedLeague>;

  create(selectLeagueDto: SelectLeagueDto) {
    const newLeague = this.selectedLeagueRepository.create(selectLeagueDto);
    return this.selectedLeagueRepository.insert(newLeague);
  }

  async update(id: number, player_id: number, league_id: number) {
    const league = await this.selectedLeagueRepository.update(id, {
      league_id: league_id,
      player_id: player_id,
    });
    return {
      league_id: league_id,
      player_id: player_id,
    };
  }

  async findOne(player_id: number) {
    return this.selectedLeagueRepository.findOneBy({
      player_id,
    });
  }
}
