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

  async update(player_id: number, league_id: number) {
    // Find the first league entry that matches the given player_id and league_id
    console.log('player_id', player_id);
    console.log('league_id', league_id);
    const league = await this.selectedLeagueRepository.findOne({
      where: { player_id },
    });

    // If a league entry is found, update it
    if (league) {
      await this.selectedLeagueRepository.update(league.id, {
        league_id: league_id,
      });

      return {
        league_id: league_id,
        player_id: player_id,
      };
    } else {
      // Handle case where no league entry matches the criteria
      throw new Error('League entry not found');
    }
  }

  async findOne(player_id: number) {
    return this.selectedLeagueRepository.findOneBy({
      player_id,
    });
  }
}
