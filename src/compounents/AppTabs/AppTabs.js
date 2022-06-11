import React, { Component } from 'react';
import { Tabs, Input } from 'antd';
import debounce from 'lodash.debounce';

import ApiService from '../ApiService';
import Spinner from '../Spinner/Spinner';
import MovieList from '../MovieList';
import MyRatedMovie from '../MyRatedMovie';
import Footer from '../Footer';
import { GenreListProvider } from '../GenreListService';

import 'antd/dist/antd.css';
const { TabPane } = Tabs;
const { Search } = Input;

class AppTabs extends Component {
  ApiService = new ApiService();
  state = {
    movieList: null,
    loadMovieList: false,
    totalResult: 0,

    genres: [],
    loadGenres: false,

    rateMovieList: [],
    totalRateResult: 0,
    load: false,
  };

  componentDidMount() {
    this.updateMovie();
    this.updateGenres();
    this.updateRateMovie();
  }

  componentDidUpdate(prevProps) {
    if (this.props.term !== prevProps.term) {
      this.updateMovie();
    }
  }

  async updateRateMovie() {
    await this.ApiService.getRateMovie(this.props.guestSessionID)
      .then((list) => {
        this.setState({
          rateMovieList: [...list.results],
          totalRateResult: list.total_results,
          load: true,
        });
      })
      .catch(this.onError);
  }

  updateGenres() {
    this.ApiService.getGenre().then((list) => {
      this.setState({
        genres: [...list.genres],
        loadGenres: true,
      });
    });
  }

  updateMovie() {
    const { term } = this.props;
    if (!term) {
      return;
    }
    this.ApiService.getAllMovies(`${term}`)
      .then((movieList) => {
        this.setState({
          movieList: [...movieList.results],
          totalResult: movieList.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  }

  // eslint-disable-next-line no-unused-vars
  onError = (err) => {};

  nextPage = async (newPage) => {
    await this.setState({
      currentPage: newPage,
    });
    await this.ApiService.getAllMovies(`${this.props.term}&page=${this.state.currentPage}`)
      .then((movieList) => {
        this.setState({
          movieList: [...movieList.results],
          totalResult: movieList.total_results,
          loadMovieList: true,
        });
      })
      .catch(this.onError);
  };

  render() {
    const { movieList, totalResult, loadMovieList, loadGenres } = this.state;
    const { guestSessionID } = this.props;
    let moviesList = null;
    let footer = null;

    if (loadGenres && loadMovieList) {
      moviesList = <MovieList movieList={movieList} guestSessionID={guestSessionID} />;
    } else moviesList = <Spinner />;

    if (loadGenres && loadMovieList && totalResult > 20) {
      footer = <Footer nextPage={this.nextPage} currentPage={this.state.currentPage} total={totalResult} />;
    }

    const debounceChangeSearch = this.props.changeSearch;

    let myRatedMovie = <MyRatedMovie guestSessionID={guestSessionID} rateMovieList={this.state.rateMovieList} />;

    return (
      <GenreListProvider value={this.state.genres}>
        <header>
          <Tabs
            className="tabs"
            defaultActiveKey="1"
            centered
            onChange={() => {
              this.updateRateMovie();
            }}
          >
            <TabPane tab="Search" key="1">
              <Search className="search" placeholder="Search movie" onChange={debounce(debounceChangeSearch, 1000)} />
              {moviesList}
              {footer}
            </TabPane>
            <TabPane tab="Rated" key="2">
              {myRatedMovie}
            </TabPane>
          </Tabs>
        </header>
      </GenreListProvider>
    );
  }
}

export default AppTabs;
