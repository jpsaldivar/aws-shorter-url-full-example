import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3Service } from './services/s3.service';
import { ShorterUrlResponse } from './dtos/shorterUrl.dto copy';
import { ConfigService } from '@nestjs/config';
import { LinkService } from './services/link.service';
import { Link } from './entities/link.entity';

@Injectable()
export class AppService {

  constructor(
    protected s3Service: S3Service,
    protected configService: ConfigService,
    private readonly linkService: LinkService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async generateNewUrl(url: string): Promise<ShorterUrlResponse>{
    var fileStr = this.fileFromTemplate(url);
    var uploaded = await this.s3Service.uploadFileFromString(fileStr);

    var newUrl = `${this.configService.get("REDIRECT_URL")}/${uploaded}`;

    //Save to DB  
    let data: Partial<Link> = {
      code: uploaded,
      url,
      newUrl,
      count: 0,
    }
    this.linkService.create(data);

    //Prepare Response
    const response = new ShorterUrlResponse();
    response.url = url;
    response.newUrl = newUrl;
    return response;
  }

  fileFromTemplate(url: string): string{
    try{
      const templateFile = fs.readFileSync('./src/templates/redirect.html', 'utf-8').toString();
      var result = templateFile.replace(/URL_TO_REPLACE/g, url);
      console.log("RESULT",result);
      return result;
    }catch(e){
      console.log("exception[fileFromTemplate]: ", e);
      return null;
    }
  }
}
