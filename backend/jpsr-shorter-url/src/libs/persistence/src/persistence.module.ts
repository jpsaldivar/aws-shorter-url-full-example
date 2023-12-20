import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db-config';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === 'local'
            ? `${db.connection}${db.user}:${db.password}@${db.host}/${db.name}`
            : `${db.connection}${db.host}/${db.name}?authSource=$external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority`;
          console.log({uriDb,db,env});
            return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
