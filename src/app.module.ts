import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movies/schema/movie.schema';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [MoviesModule,
    // MongooseModule.forRoot('mongodb://0.0.0.0:27017', { dbName: 'moviesdb' }),
    MongooseModule.forRoot('mongodb+srv://codecraftwtatlas:codecraftwtatlas@new-web.8osw8.mongodb.net/new_backend_web?retryWrites=true&w=majority&appName=new-web', { dbName: 'moviesdb' }),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule { }
