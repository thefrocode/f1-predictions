import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { PredictionType } from '../predictions/entities/prediction-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, PredictionType])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
