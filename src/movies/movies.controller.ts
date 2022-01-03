import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie-dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  // }

  @Get('/:id')
  getMovieById(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  removeMovieById(@Param('id') movieId: number): void {
    return this.movieService.remove(movieId);
  }

  @Patch('/:id')
  updateMovieById(
    @Param('id') movieId: number,
    @Body() movieData: UpdateMovieDTO,
  ) {
    return this.movieService.patch(movieId, movieData);
  }
}
