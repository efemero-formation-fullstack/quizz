import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ThemeDto } from 'src/dto/theme.dto';
import { ThemeService } from 'src/services/user/theme.service';
import { themeEntityToDto, userEntityToDto } from '../../mappers/user.mapper';

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
    return { data: themeEntityToDto(theme) };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.themeService.delete(id);
  }
}

