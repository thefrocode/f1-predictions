import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
