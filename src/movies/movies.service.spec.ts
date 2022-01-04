import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Check getAll method', () => {
    const result = service.getAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('Check getOne method', () => {
    service.create({
      title: 'Test movie',
      genres: ['Test genre'],
      year: 2006,
    });

    const movie = service.getOne(1);
    expect(movie).toBeDefined();
  });

  it('Check non existent movie and get 404 error', () => {
    try {
      service.getOne(9999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual(`The movie with id 9999 isn't found`);
    }
  });

  it('Check remove method', () => {
    service.create({
      title: 'Test movie',
      genres: ['Test genre'],
      year: 2006,
    });

    const allMoviesBefore = service.getAll().length;
    service.remove(1);

    const allMoviesAfter = service.getAll().length;
    expect(allMoviesAfter).toBeLessThan(allMoviesBefore);
  });

  it('Try to remove non existent movie and get 404 error', () => {
    try {
      service.remove(9999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('Check create method', () => {
    const allMoviesBefore = service.getAll().length;

    service.create({
      title: 'Test movie',
      genres: ['Test genre'],
      year: 2006,
    });

    const allMoviesAfter = service.getAll().length;
    expect(allMoviesAfter).toBeGreaterThan(allMoviesBefore);
  });

  it('Check patch method', () => {
    service.create({
      title: 'Test movie',
      genres: ['Test genre'],
      year: 2006,
    });

    const movieBeforeUpdating = service.getOne(1);

    service.patch(1, { title: 'New test title' });

    const movieAfterUpdating = service.getOne(1);

    expect(movieBeforeUpdating.title).not.toEqual(movieAfterUpdating.title);
  });

  it('Try to update non existent movie and get 404 error', () => {
    try {
      service.patch(9999, { title: 'New test title' });
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
