<template>
  <div id="app">
    <v-app id="inspire">
      <!-- Start Navigation -->
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
          <v-list dense>
            <template v-if="showLinks" v-for="item in loggedInItems">
              <v-layout v-if="item.heading" :key="item.heading" row align-center>
                <v-flex xs6>
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-flex>
                <v-flex xs6 class="text-xs-center">
                  <a href="#!" class="body-2 black--text">EDIT</a>
                </v-flex>
              </v-layout>
              <v-list-tile :key="item.text">
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title >
                    <router-link tag="li" :to=item.url>
                      {{ item.text }}
                    </router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <template v-if="!showLinks" v-for="item in loggedOutItems">
                <v-layout v-if="item.heading" :key="item.heading" row align-center>
                  <v-flex xs6>
                    <v-subheader v-if="item.heading">
                      {{ item.heading }}
                    </v-subheader>
                  </v-flex>
                  <v-flex xs6 class="text-xs-center">
                    <a href="#!" class="body-2 black--text">EDIT</a>
                  </v-flex>
                </v-layout>
                <v-list-tile :key="item.text">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <router-link tag="li" :to=item.url>
                        {{ item.text }}
                      </router-link>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
          </v-list>
        </v-navigation-drawer>
        <!-- Start Menu Bar  -->
        <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="black" dark app fixed>
          <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down"><router-link class="homepage-link" to="/">Story Capture</router-link></span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div @click="logout(auth.token)" v-if="showLinks" class="log-out">Logout</div>
            <img class="logo" src="/static/small-logo.svg" alt="Monochrome">
          </v-toolbar>
        <v-content >
          <!-- Start content section -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-content>
        <v-btn fab bottom right color="black" dark fixed @click="dialog = !dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              Select Operation
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row justify-space-between>
                <v-flex align-center md6 xs12 d-flex>
                    <v-card color="grey darken-2 fab-card" class="white--text">
                        <v-card-title primary-title>
                          <div class="headline">Create an Issue</div>
                        </v-card-title>
                        <v-card-text>
                          <p>Create an issue for the selected project.</p>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn class="fab-card-button"  flat dark @click="createIssue" >Create Issue</v-btn>
                        </v-card-actions>
                      </v-card>
                </v-flex>
                <v-flex align-center md6 xs12 d-flex>
                  <v-card color="grey darken-2 fab-card" class="white--text">
                      <v-card-title primary-title>
                        <div class="headline">Create a Project</div>
                      </v-card-title>
                      <v-card-text>
                        <p>Create an project.</p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn class="fab-card-button"  flat dark @click="createProject" >Create Project</v-btn>
                      </v-card-actions>
                    </v-card>
              </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
      </v-app>
  </div>
</template>

<script>
import { HTTP } from '@/http-common.js'

export default {
  data () {
    return {
      showLinks: false,
      dialog: false,
      drawer: false,
      loggedInItems: [
        { icon: 'description', text: 'Projects', url: '/projects' },
        { icon: 'portrait', text: 'Account', url: '/account' }
      ],
      loggedOutItems: [
        { icon: 'folder', text: 'About', url: '/' },
        { icon: 'portrait', text: 'Login', url: '/login' },
        { icon: 'portrait', text: 'Register', url: '/register' }
      ]
    }
  },
  props: {
    source: String
  },
  updated () {
    this.checkAuth()
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  methods: {
    checkAuth () {
      if (this.auth.isAuthenticated) {
        this.showLinks = true
      } else {
        this.showLinks = false
      }
    },
    logout (auth) {
      this.$store.dispatch('logout')
      HTTP.delete('/logout')
        .then(response => {
          localStorage.clear()
          sessionStorage.clear()
          location.reload()
          this.$router.push('/')
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    createIssue () {
      this.$router.push('/issues-create')
      this.dialog = false
    },
    createProject () {
      this.$router.push('/project-create')
      this.dialog = false
    }
  }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.block {
  width: 100%;
  height: 50px;
}
.left {
  float:left;
  width:30%;
  }
.logo {
  width: 25px;
  height: 25px;
}
.log-out {
  margin-right: 20px;
}
.homepage-link {
  text-decoration: none;
  color:white;
}
.fab-card {
  min-height: 200px;
}
.v-content {
  padding-top: 0px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
h3 {
  font-size: 0.5em;
}

</style>
