<template>
   <v-container>
     <h1>Clients</h1>
    <v-data-table :headers="headers" :items="clientArray" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td @click="visitClient(props.item)">{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td class="table-row">
            {{ props.item.epics.length }}
        </td>
        <td class="table-row">
          {{ props.item.stories.length }}
        </td>
        <td class="table-row">
            <v-icon @click="visitClient(props.item)">pageview</v-icon>
        </td>
        <td class="table-row">
            <v-icon @click="editClient(props.item)">edit</v-icon>
        </td>
        <td @click="deleteConfirm(props.item)" class="table-row">
            <v-icon>delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="createClient(user)">Create Client</v-btn>
    <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Confirm Delete
          </v-card-title>
          <v-card-text>
            This action will perminantly delete this item and all its subsidaries.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="deleteClient(SetDeleteClient)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
        {{ error }}
        <v-btn color="white" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  </v-container>
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
      SetDeleteClient: {},
      clientArray: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Description',
          value: 'description',
          align: 'left',
          sortable: false
        },
        {
          text: 'Epics',
          value: 'badge',
          alight: 'left'
        },
        {
          text: 'Stories',
          value: 'badge',
          alight: 'left'
        },
        {
          text: 'View',
          value: 'icon',
          align: 'left'
        },
        {
          text: 'Edit',
          value: 'icon',
          align: 'left'

        },
        {
          text: 'Delete',
          value: 'icon',
          align: 'left'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getClients()
    })
  },
  methods: {
    getClients () {
      HTTP.get('/users/' + this.user.id + '/clients')
        .then(response => {
          this.clientArray = response.data.clients
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get clients'
        })
    },
    visitClient (client) {
      this.$router.push('client/' + client.id.toString())
      this.$store.dispatch('setCurrentClient', client)
    },
    createClient (user) {
      this.$router.push('clients-create')
    },
    deleteConfirm (client) {
      this.dialog = true
      this.SetDeleteClient = client
    },
    deleteClient () {
      HTTP.delete('/users/' + this.user.id + '/clients/' + this.SetDeleteClient.id)
        .then(response => {
          this.getClients()
          this.dialog = false
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot delete client'
        })
    },
    editClient (client) {
      this.$router.push('clients-update')
      this.$store.dispatch('setCurrentClient', client)
    }
  }
}
</script>
<style lang="sass">
  .table-row
    width: 50px
</style>
