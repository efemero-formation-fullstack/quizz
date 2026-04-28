import { ThemeDto } from 'src/dtos/theme.dto';
import { ThemeEntity } from 'src/entities/theme.entity';

export function themeEntityToDto(entity: ThemeEntity) {
  const dto = new ThemeDto();
  dto.id = entity.id;
  dto.name = entity.name;
  return dto;
}
