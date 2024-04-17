import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }
  @Post('join')
  addTeamToLeague(@Body() joinLeagueDto: JoinLeagueDto) {
    return this.leaguesService.addTeamToLeague(joinLeagueDto);
  }

  @Get()
  findAll(@Query() query: { player_id: string }) {
    return this.leaguesService.findAll(+query.player_id);
  }

  @Get(':player_id')
  findOne(@Param('player_id') player_id: string) {
    return this.leaguesService.findOne(+player_id);
  }
  // @Get(':league_id/players')
  // findPlayersByLeagueId(@Param('league_id') league_id: string) {
  //   console.log('league_id', league_id);
  //   return this.leaguesService.findPlayersByLeagueId(+league_id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesService.update(+id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesService.remove(+id);
  }
}
