import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3Service } from './services/s3.service';
import { ShorterUrlResponse } from './dtos/shorterUrl.dto copy';

@Injectable()
export class AppService {

  constructor(
    protected s3Service: S3Service,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async generateNewUrl(url: string): Promise<ShorterUrlResponse>{
    var fileStr = this.fileFromTemplate(url);
    var uploaded = await this.s3Service.uploadFileFromString(fileStr);
    const response = new ShorterUrlResponse();
    response.url = url;
    response.newUrl = `https://shorter-url-redirects.s3.us-east-2.amazonaws.com/${uploaded}/index.html`;
    console.log("response",response);
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
