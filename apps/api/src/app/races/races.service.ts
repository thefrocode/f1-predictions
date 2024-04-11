import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';

@Injectable()
export class RacesService {
  @InjectRepository(Race)
  private readonly racesRepository: Repository<Race>;

  create(createRaceDto: CreateRaceDto) {
    const newRace = this.racesRepository.create(createRaceDto);
    return this.racesRepository.insert(newRace);
  }

  async findAll() {
    return this.racesRepository.find();
  }

  findOne(id: number) {
    return this.racesRepository.findOne({ where: { id } });
  }

  update(id: number, updateRaceDto: UpdateRaceDto) {
    return this.racesRepository.update(id, updateRaceDto);
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
