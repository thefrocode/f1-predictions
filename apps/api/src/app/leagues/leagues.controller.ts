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
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto, @Req() req: any) {
    return this.leaguesService.create({
      ...createLeagueDto,
      owner_id: req.user.player_id,
    });
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('filter') filter: string,
    @Query('limit', new DefaultValuePipe(7), ParseIntPipe) limit: number = 7
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.leaguesService.findAll(
      {
        page,
        limit,
      },
      filter,
      req.user?.player_id
    );
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
