import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { LeagueTeam } from '../leagues/entities/league_team.entity';

@Injectable()
export class PlayersService {
  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  @InjectRepository(LeagueTeam)
  private readonly leagueTeamsRepository: Repository<LeagueTeam>;

  create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.insert(newPlayer);
  }

  findAll() {
    return this.playersRepository.find();
  }
  findLeaguesByPlayerId(playerId: number) {
    return this.leagueTeamsRepository.find({
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
