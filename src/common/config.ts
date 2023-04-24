import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
  return {
    mongo: {
      DATABASE_CONNECT: process.env.DATABASE_CONNECT,
      DATABASE_HOST: process.env.DATABASE_HOST,
      DATABASE_PORT: process.env.DATABASE_PORT,
      MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
      MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
      DATABASE_NAME: process.env.DATABASE_NAME,
    },
  };
});
