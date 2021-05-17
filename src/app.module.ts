import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CharacterModule } from './character/character.module';
import { MovieCharacterModule } from './movie-character/movie-character.module';
import { GenreModule } from './genre/genre.module';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { PeopleModule } from './people/people.module';
import { MovieDirectorModule } from './movie-director/movie-director.module';
import { MovieWriterModule } from './movie-writer/movie-writer.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [MovieModule, PrismaModule, GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), CharacterModule, MovieCharacterModule, GenreModule, MovieGenreModule, PeopleModule, MovieDirectorModule, MovieWriterModule, ContentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
