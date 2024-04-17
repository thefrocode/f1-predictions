import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(id: number, selectLeagueDto: SelectLeagueDto) {
    return this.selectedLeagueRepository.update(id, selectLeagueDto);
  }

  async findOne(player_id: number) {
    return this.selectedLeagueRepository.findBy({
      player_id,
    });
  }
}
