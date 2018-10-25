<template>
      <v-container>
        <v-card max-width="600" class="login-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Update Account
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <p> You must use the email that you use to login with Jira.</p>
                <v-flex xs12 align-center justify-space-between>
                    <v-form >
                        <v-text-field v-model="form.name" :rules="nameRules" label="Name" required>
                        </v-text-field>
                        <v-text-field v-model="form.email" :rules="emailRules" label="Email" required>
                        </v-text-field>
                        <p> You can setup a new API key when you visit https://id.atlassian.com. Once you have your API key, add it below to authenticate with Jira.</p>
                        <v-text-field v-model="form.jira_token"  label="Jira API Key" >
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="updateDetails" flat color="black">Update Details</v-btn>
             </v-card-actions>
          </v-card>
          <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
          {{ error }}
          <v-btn color="white" flat @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
    </v-container >
</template>

<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      form: {
        name: '',
        email: '',
        jira_token: ''
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      valid: false
    }
  },
  created () {
    // Created hook
  },
  mounted () {
    // Mounted hook
    this.setDetails()
  },
  computed: {
    // Computed properties
    // Get the user from Vuex
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    // Methods
    setDetails () {
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.jira_token = this.user.jira_token
    },
    updateDetails () {
      // update your profile
      HTTP.put('/users/' + this.user.id, this.form)
        .then(response => {
          this.$router.push('/account')
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot update account'
        })
    }
  }
}
</script>

<style lang="sass">
.login-card
  left: 25%
</style>
