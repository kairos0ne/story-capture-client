<template>
    <v-container>
        <v-card max-width="600" class="login-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Login
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="authDetails.email" :rules="emailRules" label="Email" required>
                        </v-text-field>
                        <v-text-field v-model="authDetails.password" :rules="passwordRules" label="Password">
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="authenticate(authDetails)" flat color="black">Login</v-btn>
             </v-card-actions>
          </v-card>
    </v-container >
  </template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  name: 'login',
  data () {
    return {
      authDetails: {
        email: '',
        password: ''
      },
      jiraAuth: {
        clientId: 'LqD8mcIP6oiE1itB4lB4xChOCZWH4iqR',
        apiToken: 'EW4aE7t205HXTScy1SUn0DFE'

      },
      valid: false,
      password: '',
      passwordRules: [
        v => !!v || 'Passowrd is required',
        v => v.length >= 6 || 'Password must be 6 charicters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Description is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created () {
  },
  mounted () {
    this.checkAuth()
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  methods: {
    authenticate () {
      HTTP.post('login', this.authDetails)
        .then(response => {
          let token = response.data.user.token
          let user = response.data.user
          sessionStorage.setItem('Authorisation', token)
          this.$store.dispatch('setAuthToken', token)
          this.$store.dispatch('setUser', user)
          this.$store.dispatch('setAuth', token)
          location.reload()
        })
        .catch(e => {
          this.errors.push(e)
        })
      if (this.auth.isAuthenticated) {
        this.$router.push('/clients')
      }
    },
    checkAuth () {
      if (this.auth.isAuthenticated) {
        this.$router.push('/clients')
      }
    },
    loginJira () {
      let client = this.clientId
      HTTP.get('')
      .then(response => {
        console.log(response)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .login-card
    left: 25%
</style>
