
// This getter is a function which just returns the count
// With ES6 you can also write it as:
// export const getCount = state => state.count

export const getAuthToken = state => state.tokenHeader
export const getUser = state => state.user
export const getAuth = state => state.auth
export const getCurrentClient = state => state.selectedClient
export const getCurrentEpic = state => state.selectedEpic
