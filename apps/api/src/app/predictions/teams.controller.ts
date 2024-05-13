import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() team: CreateTeamDto) {
    return this.teamsService.create(team);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() team: CreateTeamDto[]) {
    return this.teamsService.update(+id, team);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findActivePlayerTeam(@Req() req: any) {
    return this.teamsService.findOne(req.user.player_id);
  }

  @Get(':player_id')
  findOne(@Param('player_id') player_id: string, @Req() req: any) {
    return this.teamsService.findOne(+player_id);
  }
}
