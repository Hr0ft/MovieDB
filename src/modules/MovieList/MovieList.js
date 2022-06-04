import React from 'react';
import { List } from 'antd';

import MovieItem from '../MoviItem';
import { GenreListConsumer } from '../GenreListService';

import './MovieList.css';
import 'antd/dist/antd.css';

const MovieList = (props) => {
  const { movieList, guestSessionID } = props;
  const data = movieList.map((film) => ({
    id: film.id,
    poster: film.poster_path,
    title: film.original_title,
    overview: film.overview,
    date: film.release_date,
    genreIds: film.genre_ids,
    voteAverage: film.vote_average,
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
export default MovieList;
