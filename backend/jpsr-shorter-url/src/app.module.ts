import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './services/s3Service';
import { StringService } from './utils/string.services';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService,S3Service,StringService,ConfigService],
})
export class AppModule {}
