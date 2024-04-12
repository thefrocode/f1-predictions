import { Module } from '@nestjs/common';
import { Points2Controller } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Result } from '../predictions/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, Result])],
  controllers: [Points2Controller],
})
export class PointsModule {}
