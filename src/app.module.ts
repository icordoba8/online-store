import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { config } from './common/config';
import { DatabaseModule } from './database/database.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        DATABASE_CONNECT: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    DatabaseModule,
    BrandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
