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
