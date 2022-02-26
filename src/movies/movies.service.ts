import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id); //string에서 +만 붙여도 숫자로 변경할 수 있음
    if (!movie) {
      throw new NotFoundException(`Movie with ID not found ${id}`);
    }
    return movie;
  }

  delete(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
  }

  update(id: number, updatedData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updatedData });
  }
}
