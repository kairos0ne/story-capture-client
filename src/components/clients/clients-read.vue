<template>
  <v-container>
    <v-responsive>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">{{client.name}}</h3>
              <span class="subheading">{{client.description}}</span>
              <v-divider class="my-3"></v-divider>
              <v-data-table :headers="headers" :items="epics" hide-actions class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td @click="visitEpic(props.item)">{{ props.item.name }}</td>
                    <td>{{ props.item.summary }}</td>
                    <td>{{ props.item.stories.length }}</td>
                    <td class="table-row">
                        <v-icon @click="visitEpic(props.item)">pageview</v-icon>
                    </td>
                    <td class="table-row">
                        <v-icon @click="editEpic(props.item)">edit</v-icon>
                    </td>
                    <td @click="deleteConfirmEpic(props.item)" class="table-row">
                        <v-icon>delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
                <v-btn @click="createEpic()">Create Epic</v-btn>
              <div class="spacer"></div>
              <span class="subheading">Stories</span>
              <v-divider class="my-3"></v-divider>
              <v-data-table :headers="storyHeaders" :items="client.stories" hide-actions class="elevation-1">
                  <template slot="items" slot-scope="props">
                    <td @click="setStory(props.item)">{{ props.item.task }}</td>
                    <td>{{ props.item.story_type }}</td>
                    <td>{{ props.item.points }}</td>
                  </template>
                </v-data-table>
                <v-btn><router-link class="remove-link-styles" to="/stories-create">Create Story</router-link></v-btn>
                <v-btn @click="exportCSV()" :download="fileName">Export CSV</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-responsive>
      <v-dialog v-model="dialog1" width="500">
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
            <v-btn color="primary" flat @click="deleteEpic(SetDeleteEpic)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" width="500">
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
            <v-btn color="primary" flat @click="deleteStory(SetDeleteStory)">
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
import { HTTP } from '@/http-common.js'
import FileSaver from 'file-saver'

export default {
  name: 'ClientRead',
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog1: false,
      dialog2: false,
      SetDeleteEpic: {},
      SetDeleteStory: {},
      client: {},
      epics: [],
      headers: [
        {
          text: 'Epic',
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
          value: 'story',
          align: 'left',
          sortable: false
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
      ],
      storyHeaders: [
        {
          text: 'Story',
          align: 'left',
          sortable: true,
          value: 'name'
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
        }
      ],
      fileName: 'export_stories.csv'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getClient()
      this.getEpics()
    })
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    getClient () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.$route.params.id)
        .then(response => {
          this.client = response.data.client
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get client'
        })
    },
    getEpics () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.$route.params.id + '/epics')
        .then(response => {
          this.epics = response.data.epics
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get epics'
        })
    },
    visitEpic (epic) {
      this.$router.push('/epic/' + epic.id)
      this.$store.dispatch('setCurrentEpic', epic)
    },
    exportCSV () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.$route.params.id + '/export.csv')
        .then(response => {
          let blob = new File([response.data], 'export.csv')
          FileSaver.saveAs(blob, 'export.csv')
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot export CSV'
        })
    },
    createEpic () {
      this.$router.push('/epics-create')
    },
    deleteEpic (epic) {
      HTTP.delete('/users/' + this.user.id + '/clients/' + this.client.id + '/epics/' + epic.id)
        .then(response => {
          this.getEpics()
          this.dialog1 = false
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot delete epic'
        })
    },
    deleteConfirmStory (story) {
      this.dialog2 = true
      this.SetDeleteStory = story
    },
    deleteStory (story) {
      HTTP.delete('/users/' + this.user.id + '/clients/' + this.client.id + '/epics/' + this.epic.id + '/stories/' + story.id)
        .then(response => {
          this.getEpics()
          this.dialog2 = false
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot delete epic'
        })
    },
    deleteConfirmEpic (epic) {
      this.dialog = true
      this.SetDeleteEpic = epic
    },
    editEpic (epic) {
      this.$store.dispatch('setCurrentEpic', epic)
      this.$router.push('/epics-update')
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
.spacer
  height: 30px
.remove-link-styles
  text-decoration: none
  color: black
</style>
