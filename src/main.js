// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import FileSaver from 'file-saver'

// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuex from 'vuex'
import store from './vuex/store.js'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(FileSaver)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
