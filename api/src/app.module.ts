import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiConfModule } from "./api-conf/api-conf.module";
import { DbModule } from "./db/db.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}/add3`),
    ApiConfModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DbModule],
})
export class AppModule {}
