import axios from 'axios'

var token = sessionStorage.getItem('Authorisation')
var JiraToken = sessionStorage.getItem('JiraAuth')
var BasicAuth = sessionStorage.getItem('BasicAuth')

export const HTTP = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    Authorization: 'Token ' + token
  }
})
export const JIRA = axios.create({
  baseURL: 'https://monochrome-development.atlassian.net/rest/api/3/',
  headers: {
    Authorization: 'Bearer ' + JiraToken
  }
})
export const JIRABASIC = axios.create({
  baseURL: 'https://monochrome-development.atlassian.net/rest/api/3/',
  headers: {
    Authorization: 'Basic ' + BasicAuth
  }
})
export const JIRAAUTH = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: 'Bearer ' + JiraToken
  }
})
