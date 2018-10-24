<template>
    <v-container>
        <v-card max-width="600" class="login-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Login
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <p> You must use the email that you use to login with Jira.</p>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="authDetails.email" :rules="emailRules" label="Email" required>
                        </v-text-field>
                        <v-text-field type="password" v-model="authDetails.password" :rules="passwordRules" label="Password">
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
      YOUR_USER_BOUND_VALUE: 'test',
      authDetails: {
        email: '',
        password: ''
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
          this.$router.push('/account')
          // window.location.href = `https://accounts.atlassian.com/authorize?audience=api.atlassian.com&client_id=LqD8mcIP6oiE1itB4lB4xChOCZWH4iqR&scope=read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20write%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback&state=${this.YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent`
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
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .login-card
    left: 25%
</style>
