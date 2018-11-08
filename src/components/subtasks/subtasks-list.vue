<template>
     <v-card>
      <v-list two-line>
          <div v-for="(item, index) in subtasks">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item.key" >
              <v-list-tile-avatar color="grey">
                <img :src="item.fields.issuetype.iconUrl" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.key"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.fields.summary"></v-list-tile-sub-title>
              </v-list-tile-content>
              
            </v-list-tile>
            <v-divider ></v-divider>
          </div>
        </v-list>
        <v-container  grid-list-xs>
            <v-layout row wrap>
                <v-flex xs6 md6>
                    <v-form v-model="valid">
                        <v-text-field v-model="subtaskForm.summary"  label="Subtask" required>
                        </v-text-field>
                    </v-form>
                </v-flex>
                <v-flex xs2>
                  <v-btn color="grey" small @click="postSubtask()">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-flex>
            </v-layout>
          </v-container>
  </v-card>
</template>

<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
      subtasks: [],
      subtaskForm: {
        summary: '',
        project_id: null,
        issuetype_id: null,
        parent_key: ''
      },
      valid: false
    }
  },
  mounted () {
    // Mounted hook
    this.getSubtasks()
  },
  created () {
    // Created hook
  },
  computed: {
    selectedIssue () {
      return this.$store.getters.getIssue
    },
    project () {
      return this.$store.getters.getProject
    }
  },
  methods: {
    // Get subtasks
    getSubtasks () {
      this.subtasks = this.selectedIssue.fields.subtasks
    },
    postSubtask () {
      // Set the project id
      this.subtaskForm.project_id = parseInt(this.project.id)
      // Set the issue type
      this.subtaskForm.issuetype_id = 10003
      // Set the parent key
      this.subtaskForm.parent_key = this.selectedIssue.key
      // Post to Issue endpoint
      HTTP.post('/issues', this.subtaskForm)
        .then(response => {
          console.log('Issue posted')
          this.subtaskForm.summary = ''
        })
    }
  }
}
</script>

<style>

</style>
