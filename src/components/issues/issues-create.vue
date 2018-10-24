<template>
  <v-container>
        <v-card max-width="600" class="client-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Issue
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="issueForm.summary"  label="Issue Summary" required>
                        </v-text-field>
                        <v-autocomplete v-model="autoAssingee" :hint="'Start typing'" :items="users" item-text="displayName" item-value="name" label="Assignee"  @change="setAssingee">
                            <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                            </v-slide-x-reverse-transition>
                          </v-autocomplete>
                        <v-autocomplete v-model="autoType" :hint="'Start typing'" :items="types" item-text="name" item-value="id" label="Type"  @change="setType">
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                          </v-slide-x-reverse-transition>
                        </v-autocomplete>
                        <v-autocomplete v-if="showParent" v-model="autoIssue" :hint="'Start typing'" :items="issues" item-text="fields.summary" item-value="key" label="Parent"  @change="setParent">
                            <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                            </v-slide-x-reverse-transition>
                          </v-autocomplete>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn v-if="!showParent" @click="createIssue()" flat color="black">Create Issue</v-btn>
              <v-btn v-if="showParent" @click="createSubtask()" flat color="black">Create Issue</v-btn>
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
      issueForm: {
        summary: '',
        project_id: null,
        issuetype_id: null,
        assignee_name: ''
      },
      subtaskForm: {
        summary: '',
        project_id: null,
        issuetype_id: null,
        assignee_name: '',
        parent_key: ''
      },
      loading: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      valid: false,
      autoType: '',
      autoAssingee: '',
      autoIssue: '',
      types: [],
      showParent: false,
      issues: [],
      users: []
    }
  },
  created () {
    // Created hook
  },
  mounted () {
    // Mounted hook
    this.$nextTick(() => {
      this.setProject()
      this.getIssueTypes()
      this.getUsers()
      this.getIssues()
    })
  },
  computed: {
    // Computed properties
    // Get the logged in user
    user () {
      return this.$store.getters.getUser
    },
    project () {
      return this.$store.getters.getProject
    }
  },
  methods: {
    // Mothods
    // Get a list of user
    getUsers () {
      HTTP.get('/jirausers')
        .then(response => {
          this.users = response.data
        })
    },
    // Get a list of issue types
    getIssueTypes () {
      HTTP.get('/issuetypes')
        .then(response => {
          this.types = response.data
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get Issue Types'
        })
    },
    getIssues () {
      HTTP.get('/issues?key=' + this.project.key)
        .then(response => {
          this.issues = response.data
        })
    },
    // Set the project id
    setProject () {
      this.issueForm.project_id = parseInt(this.project.id)
    },
    setType (item) {
      this.issueForm.issuetype_id = parseInt(item)
      this.checkIfSubtask()
    },
    setParent (item) {
      this.subtaskForm.parent_key = item
    },
    setAssingee (item) {
      this.issueForm.assignee_name = item
    },
    checkIfSubtask () {
      if (this.issueForm.issuetype_id === 10003) {
        this.showParent = true
      } else {
        this.showParent = false
      }
    },
    createIssue () {
      // Post action to issue endpoint
      HTTP.post('/issues', this.issueForm)
        .then(response => {
          console.log('Issue Posted')
          this.$router.push('/project')
        })
    },
    createSubtask () {
      // Set the summary
      this.subtaskForm.summary = this.issueForm.summary
      // Set the assignee
      this.subtaskForm.assignee_name = this.issueForm.assignee_name
      // Set the project
      this.subtaskForm.project_id = this.issueForm.project_id
      // Post action to issue endpoint
      HTTP.post('/issues', this.subtaskForm)
        .then(response => {
          console.log('Issue Posted')
          this.$router.push('/project')
        })
    }

  }
}
</script>

<style>

</style>
