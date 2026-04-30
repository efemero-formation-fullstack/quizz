import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { GameDto } from 'src/dtos/game.dto';
import { CreateGameDto, UpdateGameDto } from 'src/dtos/game.form.dto';
import { RequireRole } from 'src/guards/require-role/require-role.decorator';
import { SessionInterface } from 'src/interfaces/session.interface';
import { gameEntityToDto } from 'src/mappers/game.mapper';
import { GameService } from 'src/services/game/game.service';

@Controller('game')
@RequireRole()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getAll(): Promise<{ data: GameDto[] }> {
    const games = await this.gameService.getAll();
    return { data: games.map(gameEntityToDto) };
  }

  @Get('mine')
  async getMine(
    @Req() req: Request & { session: SessionInterface },
  ): Promise<{ data: GameDto[] }> {
    const games = await this.gameService.getAllByUser(req.session.id);
    return { data: games.map(gameEntityToDto) };
  }

  @Get('user/:userId')
  async getAllByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<{ data: GameDto[] }> {
    const games = await this.gameService.getAllByUser(userId);
    return { data: games.map(gameEntityToDto) };
  }

  @Get('quizz/:quizzId')
  async getAllByQuizz(
    @Param('quizzId', ParseIntPipe) quizzId: number,
  ): Promise<{ data: GameDto[] }> {
    const games = await this.gameService.getAllByQuizz(quizzId);
    return { data: games.map(gameEntityToDto) };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: GameDto }> {
    const game = await this.gameService.getById(id);
    return { data: gameEntityToDto(game) };
  }

  @Post()
  async create(
    @Body() body: CreateGameDto,
    @Req() req: Request & { session: SessionInterface },
  ): Promise<{ data: GameDto }> {
    const game = await this.gameService.create(body.quizzId, req.session.id);
    return { data: gameEntityToDto(game) };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateGameDto,
  ): Promise<{ data: GameDto }> {
    const game = await this.gameService.update(id, body);
    return { data: gameEntityToDto(game) };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.gameService.delete(id);
  }
}
