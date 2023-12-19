import { ReadStream } from 'fs';
import { Readable } from 'stream';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { StringService } from 'src/utils/string.services';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
    protected stringUtils: StringService
    ) {
    this.s3Client = new S3Client({
        region:'us-east-2',
        credentials:{
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
        }
    });
  }

  get #bucket() {
    return this.configService.get('AWS_S3_BUCKET');
  }

  #getFileCommand = (Key: string) => {
    const bucketParams: GetObjectCommandInput = {
      Bucket: this.#bucket,
      Key,
    };
    return new GetObjectCommand(bucketParams);
  };

  getFile = async <R extends Readable | ReadableStream | Blob = Blob>(
    key: string,
  ): Promise<R> => {
    const file = await this.s3Client.send(this.#getFileCommand(key));
    return file.Body as unknown as R;
  };


  async upload(file: ReadStream, name?: string): Promise<any> {
    return this.uploadS3(file, name);
  }

  async deleteS3File(key) {
    const command = new DeleteObjectCommand({
      Bucket: this.#bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);

    if (response['$metadata']['httpStatusCode'] != 204)
      throw new Error('An error has ocurred deleting the file');

    return {
      key,
    };
  }

  async uploadS3(file: ReadStream, name: string): Promise<any> {
    const key =
      name ||
      `${uuid()}${file.path ? '-' + path.basename(file.path.toString()) : ''}`;
    const params = new PutObjectCommand({
      Bucket: this.#bucket,
      Key: key,
      Body: file,
    });

    const response = await this.s3Client.send(params);

    if (response['$metadata']['httpStatusCode'] != 200)
      throw new Error('An error has ocurred when upload file');

    return {
      key,
      file,
    };
  }

  async uploadFileFromString(fileString: string){
    var buf = Buffer.from(fileString, 'utf8');
    return await this.uploadFile(buf);
}

async uploadFile(file: Buffer): Promise<string>
{
    var generatedName = this.stringUtils.generateString(6).trim();

    await this.s3Upload(file, generatedName, 'text/html');
    return generatedName;
}

async s3Upload(file: Buffer, name: string, mimetype: string): Promise<any> {
    const key: string = String(name.concat("/index.html"));
    const params = new PutObjectCommand( {
        Bucket: this.#bucket,
        Key: key,
        Body: file,
        ACL: "public-read",
        ContentType: mimetype,
        ContentDisposition:"inline"
    });

    const response = await this.s3Client.send(params);

    if (response['$metadata']['httpStatusCode'] != 200)
      throw new Error('An error has ocurred when upload file');

    return {
      key,
      file,
    };
  }


}
