
class StorageServ { 

  constructor() {
    this.storage = window.localStorage;
    this.token_key = 'token';
    this.form_key = 'search_form'
  }

  getToken() {
    return this.storage.getItem(this.token_key) || false;
  }

  setToken(token) {
    if (token) {
        this.storage.setItem(this.token_key, token);
    }
  }

  removeToken() {
    this.storage.removeItem(this.token_key);
  }
}

export default new StorageServ()