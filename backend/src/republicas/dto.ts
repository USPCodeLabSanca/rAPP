import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ListRepublicasQuery {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null || value === '') return undefined;
    const list = Array.isArray(value) ? value : String(value).split(',');
    const ids = list.map((item) => Number(item)).filter((item) => Number.isInteger(item));
    return ids.length ? ids : undefined;
  })
  @IsArray()
  @IsInt({ each: true })
  tagIds?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precoMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lon?: number;

  @IsOptional()
  @IsIn(['nome', 'recente', 'distancia'])
  ordenar?: 'nome' | 'recente' | 'distancia';
}

export class PontosQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lon?: number;
}
