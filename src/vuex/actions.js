// An action will receive the store as the first argument.
// Since we are only interested in the commit (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature
export const setAuthToken = ({ commit }, token) => {
  commit('SET_AUTH_TOKEN', token)
}
export const setUser = ({ commit }, user) => {
  commit('SET_USER', user)
}
export const setAuth = ({ commit }, token) => {
  commit('SET_AUTHENTICATED', token)
}
export const logout = ({ commit }) => {
  commit('LOGOUT_USER')
}
export const setCurrentClient = ({ commit }, client) => {
  commit('SET_CURRENT_CLIENT', client)
}
export const setCurrentEpic = ({ commit }, epic) => {
  commit('SET_CURRENT_EPIC', epic)
}
export const setCurrentStory = ({ commit }, story) => {
  commit('SET_CURRENT_STORY', story)
}
export const setCode = ({ commit }, code) => {
  commit('SET_CODE', code)
}
export const setJiraToken = ({ commit }, jiraToken) => {
  commit('SET_JIRA_TOKEN', jiraToken)
}
export const setBasicAuth = ({ commit }, token) => {
  commit('SET_BASIC_AUTH', token)
}
export const setCloudId = ({ commit }, cloud) => {
  commit('SET_CLOUD_ID', cloud)
}
export const setProject = ({ commit }, project) => {
  commit('SET_PROJECT', project)
}
export const setIssue = ({ commit }, issue) => {
  commit('SET_ISSUE', issue)
}
