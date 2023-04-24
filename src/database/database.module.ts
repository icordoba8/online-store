import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { config } from '../common/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          DATABASE_CONNECT,
          DATABASE_HOST,
          DATABASE_NAME,
          MONGO_INITDB_ROOT_PASSWORD,
          DATABASE_PORT,
          MONGO_INITDB_ROOT_USERNAME,
        } = configService.mongo;
        return {
          uri: `${DATABASE_CONNECT}://${DATABASE_HOST}:${DATABASE_PORT}`,
          user: MONGO_INITDB_ROOT_PASSWORD,
          pass: MONGO_INITDB_ROOT_USERNAME,
          dbName: DATABASE_NAME,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    // {
    //   provide: 'API_KEY',
    //   useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    // },
    // {
    //   provide: 'MONGO',
    //   useFactory: async (configService: ConfigType<typeof config>) => {
    //     const { connection, user, password, host, port, dbName } =
    //       configService.mongo;
    //     const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
    //     const client = new MongoClient(uri);
    //     await client.connect();
    //     const database = client.db(dbName);
    //     return database;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
