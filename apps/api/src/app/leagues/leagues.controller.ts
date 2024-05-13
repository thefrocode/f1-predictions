import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt.guard';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leaguesService.create(createLeagueDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.leaguesService.findAll(req.user?.user_id);
  }

  @Get(':league_id')
  findOne(@Param('league_id') league_id: string) {
    return this.leaguesService.findOne(+league_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesService.update(+id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesService.remove(+id);
  }
}
