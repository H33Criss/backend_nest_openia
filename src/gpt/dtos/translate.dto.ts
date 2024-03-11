import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  readonly prompt: string;
  @IsString()
  @IsNotEmpty()
  readonly lang: string;
}
