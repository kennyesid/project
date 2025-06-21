/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { SmsModule } from './sms/sms.module';
import { HttpExceptionFilter } from './sms/filters/http-exception.filter';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [config],
    isGlobal: true,
  }),
  MongooseModule.forRoot(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}?${process.env.MONGO_URL_CONFIG}`)
    // MongooseModule.forRoot(`mongodb://bgadmin:mongopass123@172.16.1.125:27017/admin?authSource=admin&socketTimeoutMS=90000&readPreference=primary&directConnection=true&ssl=false`)
    , SmsModule],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }],
})
export class AppModule { }
