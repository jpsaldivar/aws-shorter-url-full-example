import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class ShorterUrlResponse {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  newUrl: string;
}