import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ThemeDto } from 'src/dtos/theme.dto';
import { themeEntityToDto } from 'src/mappers/theme.mapper';
import { ThemeService } from 'src/services/theme/theme.service';
import { ThemeCreateDto, ThemeUpdateDto } from '../../dtos/theme.form.dto';

@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  async getAll(): Promise<{ data: ThemeDto[] }> {
    const themes = await this.themeService.getAll();
    return { data: themes.map(themeEntityToDto) };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: ThemeDto }> {
    const theme = await this.themeService.getById(id);
    console.log(theme);
    return { data: themeEntityToDto(theme) };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.themeService.delete(id);
  }

  @Post()
  async create(@Body() dto: ThemeCreateDto): Promise<{ data: ThemeDto }> {
    const theme = await this.themeService.create(dto);
    return { data: themeEntityToDto(theme) };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ThemeUpdateDto,
  ): Promise<{ data: ThemeDto }> {
    const theme = await this.themeService.update(id, dto);
    return { data: themeEntityToDto(theme) };
  }
}
