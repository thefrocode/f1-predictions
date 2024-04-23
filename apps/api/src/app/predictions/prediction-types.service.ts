import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictionType } from './entities/prediction-type.entity';

@Injectable()
export class PredictionTypesService {
  @InjectRepository(PredictionType)
  private readonly predictionTypesRepository: Repository<PredictionType>;

  findAll() {
    return this.predictionTypesRepository.find();
  }
}
