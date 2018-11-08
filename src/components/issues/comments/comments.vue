<template>
  <v-card>
      <v-list two-line>
          <div v-for="(item, index) in comments">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item.author.displayName" avatar >
              <v-list-tile-avatar>
                <img :src="item.author.avatarUrls['48x48']">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.author.displayName"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.body"></v-list-tile-sub-title>
                <v-list-tile-sub-title class="date" v-html="formatDate(item.created )"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider ></v-divider>
          </div>
      </v-list>
      <v-container  grid-list-xs>
        <v-layout row wrap>
            <v-flex xs6 md6>
                <v-form v-model="valid">
                    <v-text-field  v-model="commentForm.text"  label="Comment" required>
                    </v-text-field>
                </v-form>
            </v-flex>
            <v-flex xs2>
              <v-btn color="grey" small @click="postComment()">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
        </v-layout>
      </v-container>
  </v-card>
</template>
<script>
import {HTTP} from '@/http-common.js'
import moment from 'moment'

export default {
  data () {
    return {
      commentForm: {
        text: '',
        key: ''
      },
      comments: [],
      notice: '',
      displayNotice: false,
      valid: false
    }
  },
  created () {
    // Created hook
  },
  mounted () {
    // Mounted hook
    this.getComments()
    this.checkComments()
  },
  computed: {
    // Computed properties
    selectedIssue () {
      return this.$store.getters.getIssue
    }
  },
  methods: {
    getComments () {
      this.comments = this.selectedIssue.fields.comment.comments
    },
    checkComments () {
      if (this.comments.length) {
        this.displayNotice = false
      } else {
        this.displayNotice = true
        this.notice = 'There are currently no comments'
      }
    },
    
    postComment () {
      // Set the issue key in the comment form
      this.commentForm.key = this.selectedIssue.key
      // Post the comment to the issue
      HTTP.post('/comment', this.commentForm)
        .then(response => {
          console.log('Comment posted')
          this.commentForm.text = ''
          this.commentForm.key = ''
          location.reload()
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    formatDate (date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  },
  
}
</script>

<style lang="sass">
.date
  font-weight: 0.1em
</style>
