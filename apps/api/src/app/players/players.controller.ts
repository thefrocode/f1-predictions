import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    //return this.playersService.findOne(user_id);
  }
  @Get(':player_id/leagues')
  findLeaguesByPlayerId(@Param('player_id') player_id: string) {
    console.log('player_id', player_id);
    return this.playersService.findLeaguesByPlayerId(+player_id);
  }

  @Get(':user_id/users')
  findOneByUserId(@Param('user_id') user_id: string) {
    return this.playersService.findOneByUserId(user_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
