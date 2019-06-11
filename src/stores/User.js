
import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { http } from '../utils/http'
import { storage } from '../utils/storage'

const defObj = {
  _id: '',
  name: '',
  email: '',
  token: ''
}

export class User extends BaseStore {
  constructor() {
    super()
    this.observable({
      user: _.cloneDeep(defObj),
      message: '',
    })

    this.init()
  }

  async init() {
    await this.loadFromStorage()
  }

  async reset() {
    
    await http.setAuthorization(undefined)
    this.user = _.cloneDeep(defObj)
    this.message = ''
    this.removeStorage()
    
  }

  async isLogin() {
    
    let auth = storage.load('authentication')

    if (auth && auth.token) {
      if(auth.token !== '')
        return true;
    }
    return false;
  }

  async login({ email, password }) {
    try {
      let json ={
        email,
        password,
      }
      this.reset()
      let url = `${config.api}/user/login`
      let res = await http.post(url, { json })
      if (res.statusCode === 200) {
        this.user = res.body.data
        this.saveToStorage({_id: this.user._id, name: this.user.name, email: this.user.email, token: this.user.token})
        return true
      }
      
      this.message =  res.body.message; //'something wrong. please try again';
      return false
    } catch (e) {
      this.message =  e.message //'something wrong. please try again';
      return false
    }
  }

  async logout() {
    await this.reset()
  }

  saveToStorage({ _id, name, email, token }) {
    let auth = {
      token,
    }

    storage.save('authentication', auth)

    let userjson = {
      _id,
      name,
      email,
      token
    }
    storage.save('user', userjson);
  }

  removeStorage() {
    storage.save('authentication', {})
    storage.save('user', {})
  }

   
  async loadFromStorage() {
    let auth = await storage.load('authentication')
    let userjson = await storage.load('user')
    if (auth && auth.token) {
      await http.setAuthorization(auth.token)
      //this.getMemberProfile()
    }

    this.user = userjson;

    
  }
}

export default new User()