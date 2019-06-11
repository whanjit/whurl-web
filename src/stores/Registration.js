import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { http } from '../utils/http'
import { helper } from '../utils/helper'

const defObj = {
  _id: '',
  name: '',
  email: '',
}

export class Registration extends BaseStore {
  constructor() {
    super()
    this.observable({
      detail: _.cloneDeep(defObj),
      created: _.cloneDeep(defObj),
      message: '',
    })
  }

  async register({ name, email, password }) {
    let msg=''
    try {
      let json ={
        name,
        email,
        password
      }
      let path = `${config.api}/user`
      
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

export default new Registration()