import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SelectLeagueDto } from './dto/select-league.dto';
import { SelectedLeagueService } from './selected-league.service';

@Controller('selected-league')
export class SelectedLeagueController {
  constructor(private readonly selectedLeagueService: SelectedLeagueService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateSelectedLeague(
    @Param('id') id: string,
    @Req() req: any,
    @Body() selectLeagueDto: SelectLeagueDto
  ) {
    return this.selectedLeagueService.update(
      +id,
      req.user.player_id,
      selectLeagueDto.league_id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() req: any) {
    return this.selectedLeagueService.findOne(req.user.player_id);
  }
}
