import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as types from './mutation-types.js'
import * as actions from './actions.js'
import * as getters from './getters.js'
// Make vue aware of Vuex
Vue.use(Vuex)

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
const state = {
  tokenHeader: {},
  auth: {
    isAuthenticated: false,
    token: ''
  },
  user: {},
  selectedClient: {},
  selectedEpic: {},
  selectedStory: {},
  jiraToken: {},
  code: '',
  basicAuth: '',
  cloudDetails: {},
  selectedProject: {},
  selectedIssue: {}
}

const mutations = {
  [types.SET_AUTH_TOKEN] (state, token) {
    state.tokenHeader = token
  },
  [types.SET_USER] (state, user) {
    state.user = user
  },
  [types.SET_AUTHENTICATED] (state, token) {
    state.auth.isAuthenticated = true
    state.auth.token = token
  },
  [types.LOGOUT_USER] (state) {
    state.auth.isAuthenticated = false
    state.auth.token = null
    state.tokenHeader = null
  },
  [types.SET_CURRENT_CLIENT] (state, client) {
    state.selectedClient = client
  },
  [types.SET_CURRENT_EPIC] (state, epic) {
    state.selectedEpic = epic
  },
  [types.SET_CURRENT_STORY] (state, story) {
    state.selectedStory = story
  },
  [types.SET_CODE] (state, code) {
    state.code = code
  },
  [types.SET_JIRA_TOKEN] (state, jiraToken) {
    state.jiraToken = jiraToken
  },
  [types.SET_BASIC_AUTH] (state, token) {
    state.basicAuth = token
  },
  [types.SET_CLOUD_ID] (state, cloud) {
    state.cloudDetails = cloud
  },
  [types.SET_PROJECT] (state, project) {
    state.selectedProject = project
  },
  [types.SET_ISSUE] (state, issue) {
    state.selectedIssue = issue
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  actions,
  mutations
})
