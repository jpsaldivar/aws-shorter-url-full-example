import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from './services/s3.service';
import { StringService } from './utils/string.services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './entities/link.entity';
import { LinkService } from './services/link.service';
import dbConfig from './libs/persistence/src/db-config';
import { PersistenceModule } from './libs/persistence/src';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      load: [dbConfig],
    }),
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
    ]),
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService,S3Service,StringService,ConfigService,LinkService],
})
export class AppModule {}
