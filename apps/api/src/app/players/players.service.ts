import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { LeaguePlayer } from '../leagues/entities/league_player.entity';

@Injectable()
export class PlayersService {
  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  @InjectRepository(LeaguePlayer)
  private readonly leaguePlayersRepository: Repository<LeaguePlayer>;

  create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.insert(newPlayer);
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

  findOne(id: number) {
    return this.playersRepository.findOneBy({ id });
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
