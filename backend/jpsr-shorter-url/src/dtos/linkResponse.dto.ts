import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsDate,
  } from 'class-validator';
  
  export class LinkResponseDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsString()
    newUrl: string;

    @IsNotEmpty()
    @IsDate()
    lastAccess: Date;

    @IsNotEmpty()
    @IsNumber()
    count: number;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
  }