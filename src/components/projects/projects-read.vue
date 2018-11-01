<template>
  <v-container grid-list-sm>
    <v-progress-circular class="loader" v-if="loading"
      indeterminate
      color="grey"
    ></v-progress-circular>
    <v-flex v-if="! loading" >
      <h3 class="display-3">{{project.name}}</h3>
      <span class="subheading">Here is a list of issues for the project</span>
      <v-divider class="my-3"></v-divider>
      <v-data-table :headers="headers" :items="issues" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td @click="gotoIssue(props.item)">{{ props.item.fields.summary }}</td>
          <td>{{ props.item.key }}</td>
          <td>{{ props.item.fields.status.name }}</td>
          <td v-if="props.item.fields.assignee">
            <span class="chip-label"><v-chip class="subheading"> {{ props.item.fields.assignee.displayName }}</v-chip></span>
          </td>
          <td>
            <span class="chip-label"><v-chip class="subheading"> {{ props.item.fields.priority.name }}</v-chip></span>
          </td>
          <td>
            <span class="chip-label"><v-chip class="subheading"> {{ props.item.fields.issuetype.name }}</v-chip></span>
          </td>
        </template>
      </v-data-table>
      <v-btn @click="createIssue" color="grey">Create Issue</v-btn>
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
      project: [],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      issues: [],
      loading: false,
      headers: [
        {
          text: 'Issues',
          align: 'left',
          value: 'name',
          sortable: false
        },
        {
          text: 'Key',
          value: 'key',
          align: 'left',
          sortable: false
        },
        {
          text: 'Status',
          value: 'name',
          align: 'left',
          sortable: false
        },
        {
          text: 'Assignee',
          value: 'displayName',
          align: 'left',
          sortable: false
        },
        {
          text: 'Priority',
          value: 'priority',
          align: 'left',
          sortable: false
        },
        {
          text: 'Type',
          value: 'name',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getProject()
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    cloudId () {
      return this.$store.getters.getCloudId
    },
    selectedProject () {
      return this.$store.getters.getProject
    }
  },
  methods: {
    getProject () {
      // Set loading state
      this.loading = true
      // get project by key
      HTTP.get('/project?key=' + this.selectedProject.key)
        .then(response => {
          this.loading = false
          this.project = response.data.project
          console.log(response.data)
          this.getIssues(this.project.key)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get project'
        })
    },
    getIssues (projectKey) {
      // Get all issues for the project
      // Set loading state
      this.loading = true
      HTTP.get('issues?key=' + projectKey)
        .then(response => {
          this.loading = false
          this.issues = response.data
        })
    },
    gotoIssue (issue) {
      // Goto the issue selected
      this.$store.dispatch('setIssue', issue)
      this.$router.push('/issue')
    },
    createIssue () {
      // Goto /issues-create
      this.$router.push('/issues-create')
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
