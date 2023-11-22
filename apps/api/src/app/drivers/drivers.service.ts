import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  @InjectRepository(Driver)
  private readonly driversRepository: Repository<Driver>;

  create(createDriverDto: CreateDriverDto) {
    const newDriver = this.driversRepository.create(createDriverDto);
    return this.driversRepository.insert(newDriver);
  }

  findAll() {
    return this.driversRepository.find();
  }

  findOne(id: number) {
    return this.driversRepository.findOne({ where: { id } });
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return this.driversRepository.update(id, updateDriverDto);
  }
}
