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
                        <v-select :items="clients" item-text="name" item-value="id" input-value="epicForm.client_id"  @change="setClient" label="Client">
                        </v-select>
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
    </v-container >
  </template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  name: 'CreateEpic',
  data () {
    return {
      clients: [],
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
        .catch(e => {
          this.errors.push(e)
        })
    },
    getClients () {
      HTTP.get('/users/' + this.user.id + '/clients')
        .then(response => {
          let clients = response.data.clients
          this.clients = clients
        })
        .catch(e => {
          this.errors.push(e)
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
