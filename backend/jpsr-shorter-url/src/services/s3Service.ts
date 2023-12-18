import { BadGatewayException, Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { StringService } from '../utils/string.services'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service
{
    constructor(
        protected stringUtils: StringService,
        protected configService: ConfigService,
      ) {}

    AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
    s3 = new AWS.S3
    ({
        region:'us-east-2',
        credentials:{
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
        }
    } );

    async uploadFileFromString(fileString: string){
        console.log("INFO: ",{bucket: this.AWS_S3_BUCKET,key: this.configService.get('AWS_S3_ACCESS_KEY'), secret: this.configService.get('AWS_S3_KEY_SECRET')})
        var buf = Buffer.from(fileString, 'utf8');
        return await this.uploadFile(buf);
    }

    async uploadFile(file: Buffer): Promise<string>
    {
        var generatedName = this.stringUtils.generateString(6).trim();

        await this.s3_upload(file, this.AWS_S3_BUCKET, generatedName, 'text/html');
        return generatedName;
    }

    async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string)
    {
        const params = 
        {
            Bucket: bucket,
            Key: String(name.concat("/index.html")),
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: "us-east-2"
            }
        };

        console.log(params);

        try
        {
            let s3Response = await this.s3.upload(params).promise();

            console.log(s3Response);
        }
        catch (e)
        {
            throw new BadGatewayException(e,"Ha ocurrido un error");
        }
    }
}
