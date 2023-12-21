import { BadGatewayException, Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ShorterUrl } from './dtos/shorterUrl.dto';
import { ShorterUrlResponse } from './dtos/shorterUrl.dto copy';
import { LinkResponseDTO } from './dtos/linkResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getLinks(): Promise<LinkResponseDTO[]> {
    return await this.appService.getAllLinks();
  }

  @Get('/:code')
  async getOneLinks(
    @Param('code') code: string
  ): Promise<LinkResponseDTO[]> {
    return await this.appService.getOneLink(code);
  }

  @Put()
  async generateNewUrl(
    @Body() request: ShorterUrl,
  ): Promise<ShorterUrlResponse> {
    try {
      return await this.appService.generateNewUrl(request.url);
    }catch(e){
      throw new BadGatewayException(e,"Ha ocurrido un error");
    }
  }

  @Delete('/:code')
  async deleteLink(
    @Param('code') code: string,
  ): Promise<void> {
    return await this.appService.deleteLink(code);
  }
}
