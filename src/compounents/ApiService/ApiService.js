export default class ApiService {
  _apiKey = '681c96bec32cf56673f8d69774323307';
  _apiBase = 'https://api.themoviedb.org/3';

  //GET List
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Warn!!! Could not fetch URL, received ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
  //GET All movie
  async getAllMovies(term) {
    const res = await this.getResource(`${this._apiBase}/search/movie?api_key=${this._apiKey}&query=${term}`);
    return res;
  }

  //GET Rate Movie
  async getRateMovie(guestSessionID) {
    if (guestSessionID) {
      const res = await this.getResource(
        `${this._apiBase}/guest_session/${guestSessionID}/rated/movies?api_key=${this._apiKey}`
      );
      return res;
    }
  }

  // GET GenresList
  async getGenresList() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error(`Could not fetch url, received ${res.status}`);
    }
    return await res.json();
  }

  getGenre() {
    const genresList = this.getGenresList();
    return genresList;
  }

  //GET NEW Session - guest_session_id
  async getSessioID() {
    const res = await fetch(`${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`);
    return await res.json();
  }
  //POST post Rated Movie
  async postMovie(movieId, rate, guestSessionID) {
    const body = {
      value: rate,
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionID}`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },

        body: JSON.stringify(body),
      }
    );
    return res.json();
  }

  postRateMovie(movieId, rate, guestSessionID) {
    const res = this.postMovie(movieId, rate, guestSessionID);
    return res;
  }
}
