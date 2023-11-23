import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Result } from './entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, Result])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
