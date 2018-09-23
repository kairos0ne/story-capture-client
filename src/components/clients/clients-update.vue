<template>
    <v-container>
        <v-card max-width="600" class="client-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Update Client
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="clientForm.name" :rules="nameRules" label="Name" required>
                        </v-text-field>
                        <v-text-field v-model="clientForm.description" label="Description">
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="updateClient(user)" flat color="black">Update Client</v-btn>
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
import { HTTP } from '@/http-common.js'

export default {
  name: 'client-update',
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      clientForm: {
        name: '',
        description: '',
        user_id: null
      },
      valid: false,
      password: '',
      nameRules: [
        v => !!v || 'Passowrd is required'
      ]
    }
  },
  created () {
  },
  mounted () {
    this.setData()
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    },
    user () {
      return this.$store.getters.getUser
    },
    client () {
      return this.$store.getters.getCurrentClient
    }
  },
  methods: {
    updateClient (user) {
      this.clientForm.user_id = user.id
      HTTP.put('/users/' + user.id + '/clients/' + this.client.id, this.clientForm)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot update client'
        })
      this.$router.push('/clients')
    },
    setData () {
      this.clientForm.name = this.client.name
      this.clientForm.description = this.client.description
      this.clientForm.user_id = this.client.user.id
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .client-create-card
    left: 25%
</style>
