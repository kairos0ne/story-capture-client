import axios from 'axios'

var token = sessionStorage.getItem('Authorisation')

export const HTTP = axios.create({
  baseURL: `http://localhost:3000/api/v1/`,
  headers: {
    Authorization: 'Token ' + token
  }
})
