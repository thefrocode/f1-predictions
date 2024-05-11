import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PlayersService } from './players.service';

@Controller('active-player')
export class ActivePlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findActivePlayer(@Req() req: any) {
    return this.playersService.findActivePlayer(req.user.user_id);
  }
}
