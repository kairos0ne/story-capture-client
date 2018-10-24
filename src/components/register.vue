<template>
  <v-container>
      <v-card max-width="600" class="register-card">
          <v-card-title class="grey lighten-4 py-4 title">
            Registar User
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <p> You must use the email that you use to login with Jira.</p>
              <v-flex xs12 align-center justify-space-between>
                  <v-form v-model="valid">
                      <v-text-field v-model="userDetails.user.name" :rules="nameRules" :counter="10" label="Name" required>
                      </v-text-field>
                      <v-text-field v-model="userDetails.user.email" :rules="emailRules" label="Email" required>
                      </v-text-field>
                      <v-text-field v-model="userDetails.user.password" :rules="passwordRules" label="Password">
                      </v-text-field>
                      <v-text-field v-model="userDetails.user.password_confirmation" :rules="passwordRules" label="Password Confirmation">
                      </v-text-field>
                  </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn @click="authenticate(authDetails)" flat color="black">Register</v-btn>
            </v-card-actions>
        </v-card>
  </v-container >
</template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  name: 'register',
  data () {
    return {
      user: {},
      userDetails: {
        user: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      passwordRules: [
        v => !!v || 'Passowrd is required',
        v => v.length <= 6 || 'Password must be 6 charicters',
        v => v.length >= 6 || 'Password must be 6 charicters'
      ],
      emailRules: [
        v => !!v || 'Description is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  methods: {
    authenticate () {
      HTTP.post('users', this.userDetails)
        .then(response => {
          let user = response.data
          this.user = user
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push('/login')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .register-card
    left: 25%
</style>
