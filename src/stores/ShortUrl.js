import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { http } from '../utils/http'
import { helper } from '../utils/helper'

const defObj = {
  _id: undefined,
  originalUrl: '',
  urlCode: '',
  numberOfAccessTime: 0,
}

export class ShortUrl extends BaseStore {
  constructor() {
    super()
    this.observable({
      detail: _.cloneDeep(defObj),
      created: _.cloneDeep(defObj),
      message: '',
    })
  }

  async getByCode({ code }) {
    let msg = ''
    try {
      await helper.sleep(2000)
      let url = `${config.api}/shurl/${code}`
      let res = await http.get(url)
      if (res.statusCode === 200) {
        this.detail = res.body.data
        return true
      }

      msg = res.body.message
    } catch (e) {
      msg = e.message
    }

    this.message = msg
    return false
  }

  async create({ originalUrl, customAlias }) {
    let msg=''
    try {
      let json ={
        originalUrl,
        customAlias
      }
      let path = `${config.api}/shurl`
      
      await helper.sleep(2000)
      this.message = ''
      this.created = _.cloneDeep(defObj)
      let res = await http.post(path, { json })
      if (res.statusCode === 200) {
        this.created = res.body.data
        return true
      }

      msg = res.body.message
    } catch (e) {
      msg = e.message
    }

    this.message = msg
    return false
  }
}

export default new ShortUrl()