import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';
import { Prediction } from '../predictions/entities/prediction.entity';
import { SelectedLeague } from '../leagues/entities/selected_league.entity';

@Injectable()
export class PlayersService {
  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  @InjectRepository(LeaguePlayer)
  private readonly leaguePlayersRepository: Repository<LeaguePlayer>;

  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  @InjectRepository(SelectedLeague)
  private readonly selectedLeagueRepositoty: Repository<SelectedLeague>;

  async create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(createPlayerDto);
    await this.playersRepository.insert(newPlayer);

    const leaguePlayer = this.leaguePlayersRepository.create({
      player_id: newPlayer.id,
      league_id: 1,
    });

    await this.leaguePlayersRepository.insert(leaguePlayer);
    const selectedLeague = this.selectedLeagueRepositoty.create({
      player_id: newPlayer.id,
      league_id: 1,
    });

    await this.selectedLeagueRepositoty.insert(selectedLeague);
    return {
      message: 'Player created successfully',
    };
  }

  findAll() {
    return this.playersRepository.find();
  }
  findLeaguesByPlayerId(playerId: number) {
    return this.leaguePlayersRepository.find({
      relations: ['league'],
      where: { player_id: playerId },
    });
  }

  async findOne(user_id: string) {
    const player = await this.playersRepository.findOne({
      where: { user_id: user_id },
      relations: ['selected_league'],
    });
    if (player) {
      const total_points = await this.predictionsRepository.sum('points', {
        player_id: player.id,
      });
      const last_race_id = await this.predictionsRepository.maximum('race_id', {
        player_id: player.id,
      });
      let last_race_points: number | null = 0;
      if (last_race_id) {
        last_race_points = await this.predictionsRepository.sum('points', {
          player_id: player.id,
          race_id: last_race_id,
        });
      }
      return {
        total_points: total_points,
        last_race_points: last_race_points,
        player_id: player.id,
        selected_league_id: player.selected_league.league_id,
      };
    }
    return new Error('Player not found');
  }

  findOneByUserId(user_id: string) {
    return this.playersRepository.findOne({ where: { user_id: user_id } });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.playersRepository.update(id, updatePlayerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
