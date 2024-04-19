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

  async update(id: number, selectLeagueDto: SelectLeagueDto) {
    console.log(selectLeagueDto);
    const league = await this.selectedLeagueRepository.update(
      id,
      selectLeagueDto
    );
    return selectLeagueDto;
  }

  async findOne(player_id: number) {
    return this.selectedLeagueRepository.findOneBy({
      player_id,
    });
  }
}