import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import 'dotenv/config';
import { Movie } from './models/movie.entity';
import { MovieImage } from './models/movie.image.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';


const {database_host,database_port,database_username,database_password,database_name} = process.env
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database_host,
      port: parseInt(database_port),
      username: database_username,
      password: database_password,
      database: database_name,
      entities: [Movie, MovieImage],
      migrationsTableName: 'migration',
      migrations: ['dist/src/migration/**/*.{ts,js}'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: false,
    }
    ),
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
