class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config._headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  getMovies() {
    return fetch(`${ this._url }/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => this._getResponseData(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default moviesApi;