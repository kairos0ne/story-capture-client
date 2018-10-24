<template>
  <v-container grid-list-sm>
    <v-progress-circular class="loader" v-if="loading"
      indeterminate
      color="grey"
    ></v-progress-circular>
    <v-flex v-if="! loading" >
      <h3 class="display-1">Summary: {{issue.fields.summary}}</h3>
      <span class="chip-label">Status:<v-chip class="subheading"> {{issue.fields.status.name}}</v-chip></span>
      <span class="chip-label">Key:</span><v-chip>{{issue.key}}</v-chip>
      <span class="chip-label">Priority:</span><v-chip>{{issue.fields.priority.name}}</v-chip>
      <div v-if="issue.fields.assignee">
      <span class="chip-label">Assignee:</span><v-chip>{{issue.fields.assignee.displayName}}</v-chip>
      </div>
      <v-divider class="my-3"></v-divider>
      <v-tabs slot="extension" v-model="tab" color="grey" grow >
        <v-tabs-slider color="black"></v-tabs-slider>
        <v-tab @click="activateTab('Comments')">Comments
          <v-badge left color="black" class="badge">
            <span slot="badge">{{issue.fields.comment.comments.length}}</span>
          </v-badge>
        </v-tab>
        <v-tab @click="activateTab('Subtasks')">Subtasks
          <v-badge left color="black" class="badge">
            <span slot="badge">{{issue.fields.subtasks.length}}</span>
          </v-badge>
        </v-tab>
      </v-tabs>
        <comments v-if="commentsActive"></comments>
        <subtasks v-if="subtasksActive"></subtasks>
    <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      {{ error }}
      <v-btn color="white" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-spacer></v-spacer>
    <v-container v-if="attachments.length" grid-list-xs>
      <h3 class="display-1">Attachments</h3>
      <v-layout row wrap>
      <v-flex xs2 v-for="(item, index) in attachments" align-content-left :key="index">
        <a :href="item.content"><img v-show="item.thumbnail" class="thumbnail" :src="item.thumbnail" alt="test">
        <div v-if="!item.thumbnail" class="thumbnail">
          <v-icon >file_copy</v-icon>
          {{item.mimeType}}
        </div>
        </a>
      </v-flex>
      </v-layout>
    </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import {HTTP} from '@/http-common.js'
import comments from '@/components/issues/comments/comments'
import subtasks from '@/components/subtasks/subtasks-list'

export default {
  data () {
    return {
      tab: null,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      issue: [],
      loading: false,
      activeTab: 'Comments',
      attachments: []
    }
  },
  components: {
    comments,
    subtasks
  },
  created () {
    // Whe the composnent is created
    this.getIssue()
  },
  mounted () {
    // When the composnent is mounted
  },
  computed: {
    selectedIssue () {
      return this.$store.getters.getIssue
    },
    commentsActive () {
      return this.activeTab === 'Comments'
    },
    subtasksActive () {
      return this.activeTab === 'Subtasks'
    }
  },
  methods: {
    getIssue () {
      // Set loading
      this.loading = true
      // Get request for a single issue
      HTTP.get('/issue?key=' + this.selectedIssue.key)
        .then(response => {
          this.loading = false
          this.issue = response.data.issue
          this.attachments = response.data.issue.fields.attachment
          this.$store.dispatch('setIssue', response.data.issue)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get issue'
        })
    },
    activateTab (name) {
      this.activeTab = name
    }
  }
}
</script>

<style lang="sass">
.loader
  top: 50%
  left: 50%
  position: absolute
.chip-label
  font-size: 1.2em
.badge
  margin-left: 30px
.thumbnail
  border: 1px solid #ddd
  border-radius: 4px
  padding: 5px
  max-height: 120px
  max-width: 150px
  width: 120px
  min-height: 120px
  vertical-align: center

</style>
