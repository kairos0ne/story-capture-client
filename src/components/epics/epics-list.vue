<template>
   <v-container>
     <h1>Epics</h1>
    <v-data-table :headers="headers" :items="epicArray" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td @click="visitEpic(props.item)">{{ props.item.name }}</td>
        <td>{{ props.item.summary }}</td>
        <td class="table-row">
            {{ props.item.stories.length }}
        </td>
        <td class="table-row">
            <v-icon @click="visitEpic(props.item)">pageview</v-icon>
        </td>
        <td class="table-row">
            <v-icon>edit</v-icon>
        </td>
        <td class="table-row">
            <v-icon>delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="createEpic">Create Epic</v-btn>
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
      epicArray: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Summary',
          value: 'summary',
          align: 'left',
          sortable: false
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
    },
    currentClient () {
      return this.$store.getters.getCurrentClient
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getEpics()
    })
  },
  methods: {
    getEpics () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.currentClient.id + '/epics')
        .then(response => {
          this.epicArray = response.data.epics
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get epics'
        })
    },
    visitEpic (epic) {
      this.$router.push('epic/' + epic.id.toString())
      this.$store.dispatch('setCurrentEpic', epic)
    },
    createEpic (user) {
      this.$router.push('epics-create')
    }
  }
}
</script>
<style lang="sass">
  .table-row
    width: 50px
</style>
