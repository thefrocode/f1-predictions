import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';

@Injectable()
export class PointsService {
  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  @InjectRepository(Player)
  private readonly playersRepository: Repository<Player>;

  create(createPredictionDto: CreatePredictionDto) {
    return 'This action adds a new prediction';
  }

  findAll() {
    return `This action returns all predictions`;
  }

  async findOne(player_id: number) {
    const total_points = await this.predictionsRepository.sum('points', {
      player_id,
    });
    const last_race_id = await this.predictionsRepository.maximum('race_id', {
      player_id,
    });
    let last_race_points;
    if (last_race_id) {
      last_race_points = await this.predictionsRepository.sum('points', {
        player_id: player_id,
        race_id: last_race_id,
      });
    }

    return {
      total_points: total_points,
      last_race_points: last_race_points,
      player_id: player_id,
    };
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
