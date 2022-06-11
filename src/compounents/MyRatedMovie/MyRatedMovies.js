import React from 'react';
import { List } from 'antd';

import MovieItem from '../MoviItem';
import { GenreListConsumer } from '../GenreListService';
import 'antd/dist/antd.css';

const MyRatedMovie = ({ rateMovieList, guestSessionID }) => {
  let data = rateMovieList.map((film) => ({
    id: film.id,
    poster: film.poster_path,
    title: film.original_title,
    overview: film.overview,
    date: film.release_date,
    genreIds: film.genre_ids,
    voteAverage: film.vote_average,
    rating: film.rating,
  }));

  return (
    <GenreListConsumer>
      {(genres) => {
        return (
          <div className="app">
            <List
              grid={{ gutter: 20, column: 2 }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <MovieItem
                    className="movie-card"
                    key={item.id}
                    poster={item.poster}
                    title={item.title}
                    date={item.date}
                    overview={item.overview}
                    genreIds={item.genreIds}
                    voteAverage={item.voteAverage}
                    genresList={genres}
                    id={item.id}
                    guestSessionID={guestSessionID}
                    rating={item.rating}
                  />
                </List.Item>
              )}
            />
          </div>
        );
      }}
    </GenreListConsumer>
  );
};
export default MyRatedMovie;
