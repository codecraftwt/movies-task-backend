import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovie } from './interface/movie.interface';

@Injectable()
export class MoviesService {

  constructor(@InjectModel('Movie') private movieModel: Model<IMovie>) { }

  async create(createMovieDto: CreateMovieDto): Promise<IMovie> {
    const newMovie = await new this.movieModel(createMovieDto);
    return newMovie.save();
    // return 'This action adds a new movie';
  }

  async findAll(): Promise<IMovie[]> {
    const movieData = await this.movieModel.find();
    if (!movieData || movieData.length == 0) {
      throw new NotFoundException('Movies data not found!');
    }
    return movieData;
    // return `This action returns all movies`;
  }

  async findOne(id: string): Promise<IMovie> {
    const existingMovie = await this.movieModel.findById(id).exec();
    if (!existingMovie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return existingMovie;
    // return `This action returns a #${id} movie`;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<IMovie> {
    const existingMovie = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
    if (!existingMovie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return existingMovie;
    // return `This action updates a #${id} movie`;
  }

  async remove(id: string): Promise<IMovie> {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id);
    if (!deletedMovie) {
      throw new NotFoundException(`Movie #${id} not found`);
    }
    return deletedMovie;
    // return `This action removes a #${id} movie`;
  }
}
