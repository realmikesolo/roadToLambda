import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './cities/city.module';
import { City } from './cities/city.entity';
import { SuburbModule } from './suburbs/suburb.module';
import { Suburb } from './suburbs/suburb.entity';
import { ClinicaModule } from './clinics/clinica.module';
import { Clinica } from './clinics/clinica.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [City, Suburb, Clinica],
      synchronize: true,
    }),
    CityModule,
    SuburbModule,
    ClinicaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
