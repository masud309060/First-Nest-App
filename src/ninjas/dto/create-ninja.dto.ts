import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateNinjaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;


  @IsOptional()
  @IsString()
  @IsEnum(['stars', 'sword'], { message: "Use correct weapon: 'stars', 'sword'" })
  weapon: string;
}
