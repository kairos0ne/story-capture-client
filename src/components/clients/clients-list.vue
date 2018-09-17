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
            <v-icon @click="visitClient(props.item)">pageview</v-icon>
        </td>
        <td class="table-row">
            <v-icon>edit</v-icon>
        </td>
        <td class="table-row">
            <v-icon>delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="createClient(user)">Create Client</v-btn>
  </v-container>
</template>
<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
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
        .catch(e => {
          this.errors.push(e)
        })
    },
    visitClient (client) {
      this.$router.push('client/' + client.id.toString())
      this.$store.dispatch('setCurrentClient', client)
    },
    createClient (user) {
      this.$router.push('clients-create')
    }
  }
}
</script>
<style lang="sass">
  .table-row
    width: 50px
</style>
