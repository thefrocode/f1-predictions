import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // @Post()
  // create(@Body() createTeamDto: CreateTeamDto) {
  //   return this.teamsService.create(createTeamDto);
  // }

  // @Get()
  // findAll() {
  //   return this.teamsService.findAll();
  // }

  // @Get(':player_id/player')
  // findAllByPlayerId(@Param('player_id') player_id: string) {
  //   return this.teamsService.findAllByPlayerId(+player_id);
  // }
  // @Get(':league_id/league')
  // findAllByLeagueId(@Param('league_id') league_id: string) {
  //   return this.teamsService.findAllByLeagueId(+league_id);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.teamsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
  //   return this.teamsService.update(+id, updateTeamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.teamsService.remove(+id);
  // }
}
