<template>
    <v-container>
        <v-card max-width="600" class="epic-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Epic
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-autocomplete v-model="autoClient" :hint="!isEditing ? 'Start typing the client name' : 'Click the icon to save'" :items="clients" item-text="name" item-value="id" label="Client" persistent-hint  @change="setClient">
                            <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                            </v-slide-x-reverse-transition>
                          </v-autocomplete>
                        <v-text-field v-model="epicFrom.name" :rules="nameRules" label="Name" required>
                        </v-text-field>
                        <v-text-field v-model="epicFrom.summary" label="Summary">
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="createEpic(epicFrom)" flat color="black">Create Epic</v-btn>
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
  name: 'CreateEpic',
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      clients: [],
      isEditing: '',
      autoClient: '',
      selectedClientId: null,
      epicFrom: {
        name: '',
        summary: '',
        client_id: null
      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required'
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getClients()
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
    createEpic (form) {
      HTTP.post('/users/' + this.user.id + '/clients/' + this.selectedClientId + '/epics', form)
        .then(response => {
          console.log(response.data)
          this.$router.push('/epic/' + response.data.epic.id)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          if (error.response.status === 422) {
            this.error = 'Name, Client of the Epic is required'
          } else {
            this.error = error.response.data.name
          }
        })
    },
    getClients () {
      HTTP.get('/users/' + this.user.id + '/clients')
        .then(response => {
          let clients = response.data.clients
          this.clients = clients
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get clients'
        })
    },
    setClient (item) {
      this.epicFrom.client_id = item
      this.selectedClientId = item
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .epic-create-card
    left: 25%
</style>
