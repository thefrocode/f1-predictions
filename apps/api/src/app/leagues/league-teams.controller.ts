import { Controller, Post, Body } from '@nestjs/common';
import { JoinLeagueDto } from './dto/add-team-to-league.dto';
import { LeaguePlayersService } from './league-teams.service';

@Controller('league-teams')
export class LeaguePlayersController {
  constructor(private readonly leaguePlayersService: LeaguePlayersService) {}

  @Post()
  create(@Body() joinLeagueDto: JoinLeagueDto) {
    return this.leaguePlayersService.create(joinLeagueDto);
  }
}
