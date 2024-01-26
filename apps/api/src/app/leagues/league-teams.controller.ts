import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { LeagueTeamsService } from './league-teams.service';

@Controller('league-teams')
export class LeagueTeamsController {
  constructor(private readonly leagueTeamsService: LeagueTeamsService) {}

  // @Post()
  // create(@Body() createLeagueDto: CreateLeagueDto) {
  //   return this.leagueTeamsService.addTeamToLeague(joinLeagueDto);
  // }

  // @Get()
  // findAll() {
  //   return this.leaguesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.leaguesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
  //   return this.leaguesService.update(+id, updateLeagueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.leaguesService.remove(+id);
  // }
}
