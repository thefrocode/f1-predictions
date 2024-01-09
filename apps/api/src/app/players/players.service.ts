import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playersRepository.create(createPlayerDto);
    return this.playersRepository.insert(newPlayer);
  }

  findAll() {
    return this.playersRepository.find();
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
