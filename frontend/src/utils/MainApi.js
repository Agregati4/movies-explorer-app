class MainApi {
  constructor(config) {
    this._url = config.baseURL;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  getUserInfo() {
    return fetch(`${ this._url }/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._getResponseData(res));
  }

  updateCurrentUser(userInfo) {
    return fetch(`${ this._url }/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      })
    })
    .then((res) => this._getResponseData(res));
  }

  getSavedMoviesData() {
    return fetch(`${ this._url }/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res));
  }

  saveMovie(movieData) {
    return fetch(`${ this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co/${ movieData.image.url }`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${ movieData.image.formats.thumbnail.url }`,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN
      })
    })
    .then((res) => this._getResponseData(res));
  }

  deleteMovie(_id) {
    return fetch(`${ this._url }/movies/${ _id }`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res));
  }
}

const mainApi = new MainApi({
  baseURL: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default mainApi;