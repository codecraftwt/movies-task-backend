import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  async create(@Res() response, @Body() createMovieDto: CreateMovieDto) {
    try {
      const newMovie = await this.moviesService.create(createMovieDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Movie has been created successfully',
        newMovie,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Movie not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const moviesData = await this.moviesService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All movies data found successfully', moviesData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const existingMovie = await
        this.moviesService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Movie found successfully', existingMovie,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    try {
      const existingMovie = await this.moviesService.update(id, updateMovieDto);
      return response.status(HttpStatus.OK).json({
        message: 'Movie has been successfully updated',
        existingMovie,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedMovie = await this.moviesService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Movie deleted successfully',
        deletedMovie,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
