import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SelectLeagueDto } from './dto/select-league.dto';
import { SelectedLeagueService } from './selected-league.service';

@Controller('selected-league')
export class SelectedLeagueController {
  constructor(private readonly selectedLeagueService: SelectedLeagueService) {}
  @Patch(':id')
  updateSelectedLeague(
    @Param('id') id: string,
    @Body() selectLeagueDto: SelectLeagueDto
  ) {
    return this.selectedLeagueService.update(+id, selectLeagueDto);
  }

  @Get(':player_id')
  findOne(@Param('player_id') player_id: string) {
    return this.selectedLeagueService.findOne(+player_id);
  }
}
