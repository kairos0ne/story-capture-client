<template>
    <v-container>
        <v-card max-width="600" class="client-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Client
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
              <v-btn @click="createClient(user)" flat color="black">Create Client</v-btn>
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
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    createClient () {
      this.clientForm.user_id = this.user.id
      HTTP.post('/users/' + this.user.id + '/clients', this.clientForm)
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push('/clients')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .client-create-card
    left: 25%
</style>
