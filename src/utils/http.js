import validator from 'validator'
import request from 'then-request'

export class Http {
  constructor() {
    this.httpReq = request
    this.authorization = undefined
  }

  setAuthorization(auth) {
    this.authorization = auth
  }

  setOptions(options) {
    if (!options.headers) options.headers = {}

    if (options.wallet && this.authorization) {
      options.headers.wallet = options.wallet
      options.headers.Authorization = `Token ${this.authorization}`

    } else if (this.authorization) {
      options.headers.Authorization = this.authorization
      options.headers["x-access-token"] = this.authorization
    }
    return options
  }

  parseBody(response) {
    let isJson = validator.isJSON(response.body)
    if (isJson) response.body = JSON.parse(response.body)
    return response
  }

  async get(url, options = {}) {
    options = this.setOptions(options)
    let response = await this.httpReq('GET', url, options)
    return this.parseBody(response)
  }

  async post(url, options = {}) {
    options = this.setOptions(options)
    let response = await this.httpReq('POST', url, options)
    return this.parseBody(response)
  }

  async put(url, options = {}) {
    options = this.setOptions(options)
    let response = await this.httpReq('PUT', url, options)
    return this.parseBody(response)
  }

  async patch(url, options = {}) {
    options = this.setOptions(options)
    let response = await this.httpReq('PATCH', url, options)
    return this.parseBody(response)
  }

  async delete(url, options = {}) {
    options = this.setOptions(options)
    let response = await this.httpReq('DELETE', url, options)
    return this.parseBody(response)
  }
}

export const http = new Http()
export default http