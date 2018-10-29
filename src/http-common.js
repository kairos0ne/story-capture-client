import axios from 'axios'
import store from './vuex/store.js'

// var token = sessionStorage.getItem('Authorisation')
var tokenheader = store.getters.getAuthToken

export const HTTP = axios.create({
  baseURL: 'http://178.62.9.173:3000/api/v1/',
  headers: {
    Authorization: 'Token ' + tokenheader
  }
})
