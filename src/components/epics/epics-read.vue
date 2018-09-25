<template>
  <v-container>
    <v-responsive>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">{{epic.name}}</h3>
              <span class="subheading">{{epic.summary}}</span>
              <v-divider class="my-3"></v-divider>
              <v-data-table :headers="headers" :items="stories" hide-actions class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td @click="setStory(props.item)">{{ props.item.task }}</td>
                    <td>{{ props.item.story_type }}</td>
                    <td>{{ props.item.points }}</td>
                    <td class="table-row">
                        <v-icon @click="editStory(props.item)">edit</v-icon>
                    </td>
                    <td class="table-row">
                        <v-icon>delete</v-icon>
                    </td>
                  </template>
              </v-data-table>
              <v-btn><router-link class="remove-link-styles" to="/stories-create">Create Story</router-link></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-responsive>
      <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
        {{ error }}
        <v-btn color="white" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  </v-container>
</template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      epic: {},
      stories: [],
      headers: [
        {
          text: 'Story',
          align: 'left',
          sortable: true,
          value: 'task'
        },
        {
          text: 'Type',
          value: 'story_type',
          align: 'left',
          sortable: false
        },
        {
          text: 'Points',
          value: 'points',
          align: 'left',
          sortable: false
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
  created () {
    this.getEpic()
  },
  methods: {
    getEpic () {
      HTTP.get('users/' + this.user.id + '/clients/' + this.currentClient.id + '/epics/' + this.$route.params.id)
        .then(response => {
          this.epic = response.data.epic
          this.stories = response.data.epic.stories
          console.log(response.data.epic.stories)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get epic'
        })
    },
    visitStory (story) {
      this.$router.push('/story/' + story.id)
    },
    setStory (story) {
      this.$store.dispatch('setCurrentStory', story)
    },
    editStory (story) {
      this.$store.dispatch('setCurrentStory', story)
      this.$router.push('/stories-update')
    }
  }
}
</script>
<style lang="sass">
.remove-link-styles
  text-decoration: none
  color: black
</style>
