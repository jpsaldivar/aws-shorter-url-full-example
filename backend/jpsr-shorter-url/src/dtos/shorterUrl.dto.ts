import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class ShorterUrl {
  @IsNotEmpty()
  @IsString()
  url: string;
}