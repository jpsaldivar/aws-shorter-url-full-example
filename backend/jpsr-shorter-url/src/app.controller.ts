import { BadGatewayException, Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ShorterUrl } from './dtos/shorterUrl.dto';
import { ShorterUrlResponse } from './dtos/shorterUrl.dto copy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
}
