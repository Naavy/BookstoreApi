import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsDateString()
  @IsNotEmpty()
  readonly publishedDate: Date;
}
