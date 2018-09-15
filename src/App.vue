<template>
  <div id="app">
    <v-app id="inspire">
      <!-- Start Navigation -->
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
          <v-list dense>
            <template v-if="showLinks" v-for="item in items">
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
            <span class="hidden-sm-and-down">Story Capture</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <div @click="logout(auth.token)" v-if="showLinks" class="log-out">Logout</div>
            <img class="logo" src="/static/small-logo.svg" alt="Monochrome">
          </v-toolbar>
        <v-content >
          <!-- Start content section -->
          <router-view></router-view>
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
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-btn xs3 class="left">
                        Create Client
                    </v-btn>
                    <v-btn xs3 class="left">
                        Create Epic
                    </v-btn>
                    <v-btn xs3 class="left">
                        Create Story
                    </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
      </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLinks: false,
      dialog: false,
      drawer: false,
      items: [
        { icon: 'contacts', text: 'Clients', url: '/clients' },
        { icon: 'description', text: 'Epics', url: '/epics' },
        { icon: 'content_copy', text: 'Stories', url: '/stories' }
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
      location.reload()
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
</style>
