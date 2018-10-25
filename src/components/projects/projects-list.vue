<template>
  <v-container grid-list-sm>
    <v-progress-circular class="loader" v-if="loading"
      indeterminate
      color="grey"
    ></v-progress-circular>
    <v-flex v-if="! loading">
      <h3 class="display-3">Projects</h3>
      <span class="subheading">Here is a list of projects from Jira</span>
      <v-divider class="my-3"></v-divider>
      <v-data-table :headers="headers" :items="projects" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td @click="readProject(props.item)">{{ props.item.name }}</td>
          <td>{{ props.item.key }}</td>
        </template>
      </v-data-table>
      <v-btn @click="createProject">New Project</v-btn>
    </v-flex>
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
      loading: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      projects: [],
      headers: [
        {
          text: 'Project',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Key',
          value: 'key',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.getAllProjects()
    })
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    getAllProjects () {
      this.loading = true
      HTTP.get('/projects')
        .then(response => {
          this.projects = response.data
          this.loading = false
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get projects'
        })
    },
    createProject () {
      // Goto the correct route
      this.$router.push('/project-create')
    },
    readProject (item) {
      // Set the project in vuex
      this.$store.dispatch('setProject', item)
      this.$router.push('/project')
    }
  }
}
</script>
<style lang="sass">
.loader
  top: 50%
  left: 50%
  position: absolute
</style>
