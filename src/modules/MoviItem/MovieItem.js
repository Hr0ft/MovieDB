/* eslint-disable indent */
import React, { Component } from 'react';
import { Typography, Card } from 'antd';
import { format } from 'date-fns';

import 'antd/dist/antd.css';
import Spinner from '../Spinner/Spinner';
import Rate from '../Rate/Rate';

const { Text, Title } = Typography;

export default class MovieItem extends Component {
  minify(text, length) {
    return text.slice(0, text.indexOf(' ', length)) + '...';
  }

  formatDate(data) {
    if (data) {
      return format(new Date(`'${data}'`), 'MMMM d, yyyy');
    }
    return 'Unknown';
  }

  render() {
    const { poster, title, date, genresList, genreIds, overview, voteAverage, id, guestSessionID, rating } = this.props;

    const genres = genreIds.map((ids) => {
      const [currentGenres] = genresList.filter((genre) => genre.id === ids);
      return (
        <Text code key={currentGenres.id}>
          {currentGenres.name}
        </Text>
      );
    });

    const colorRating =
      voteAverage <= 3
        ? '#E90000'
        : voteAverage > 3 && voteAverage <= 5
        ? '#E97E00'
        : voteAverage > 5 && voteAverage <= 7
        ? '#E9D100'
        : '#66E900';

    return (
      <Card
        style={{
          width: 451,
          height: 279,
        }}
      >
        <div className="movie-card__poster">
          {poster ? (
            <img src={`http://image.tmdb.org/t/p/w500${poster}`} width="183px" height="281px" alt="poster" />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="movie-card__specification">
          <div className="movie-card__title">
            <Title level={4}>{title}</Title>
          </div>
          <div className="movie-card__release">
            <Text type="secondary">{this.formatDate(date)}</Text>
          </div>
          <div className="genres">{genres}</div>
          <div className="movie-card__description">
            <Text strong>{this.minify(overview, 180)}</Text>
          </div>
          <div>
            <Rate movieid={id} guestSessionID={guestSessionID} rating={rating} />
          </div>
          <div style={{ border: `2px solid ${colorRating}` }} className="movie-card__rating">
            {voteAverage}
          </div>
        </div>
      </Card>
    );
  }
}
