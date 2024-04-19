import { Controller, Post, Body } from '@nestjs/common';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { LeagueTeamsService } from './league-teams.service';

@Controller('league-teams')
export class LeagueTeamsController {
  constructor(private readonly leagueTeamsService: LeagueTeamsService) {}

  @Post()
  create(@Body() joinLeagueDto: JoinLeagueDto) {
    return this.leagueTeamsService.create(joinLeagueDto);
  }
}
