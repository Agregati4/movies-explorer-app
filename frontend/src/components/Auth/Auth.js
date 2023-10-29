class Auth {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  validation() {
    return fetch(`${ this._url }/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res))
  }

  signUp(userInfo) {
    return fetch(`${ this._url }/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
    })
    .then((res) => this._getResponseData(res))
  }

  signIn(userInfo) {
    return fetch(`${ this._url }/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      })
    })
    .then((res) => this._getResponseData(res))
  }

  signOut() {
    return fetch(`${ this._url }/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._getResponseData(res));
  }
}

const auth = new Auth({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default auth;