<template>
    <v-container>
        <v-card max-width="600" class="epic-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Story
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                      <v-autocomplete v-model="autoClient" :hint="!isEditing ? 'Start typing the client name' : 'Click the icon to save'" :items="clients" item-text="name" item-value="id" label="Client" persistent-hint   @change="setClient">
                        <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                        </v-slide-x-reverse-transition>
                      </v-autocomplete>
                      <v-autocomplete v-model="autoEpic" :hint="!isEditing ? 'Start typing the epic name' : 'Click the icon to save'" :items="epics" item-text="name" item-value="id" label="Epic" persistent-hint  @change="setEpic">
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                          </v-slide-x-reverse-transition>
                        </v-autocomplete>
                        <v-text-field v-model="storyForm.task" :rules="taskRules" label="Story" required>
                        </v-text-field>
                        <v-autocomplete v-model="autoType" :hint="!isEditing ? 'Start typing the type' : 'Click the icon to save'" :items="types" label="Type" persistent-hint  @change="setType">
                            <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                            </v-slide-x-reverse-transition>
                          </v-autocomplete>
                        <v-text-field v-model="storyForm.points" label="Points">
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="createStory(storyForm)" flat color="black">Create Story</v-btn>
             </v-card-actions>
          </v-card>
          <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
              Select Operation
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row align-center justify-space-between>
                  <v-flex xs4>
                    <v-card color="grey darken-2 fab-card" class="white--text">
                        <v-card-title primary-title>
                          <div class="headline">Create another story</div>
                          <div>Create another story with your data pre-filled.</div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn class="fab-card-button" flat dark @click="clearForm">Create Story</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-flex>
                  <v-flex xs4>
                    <v-card color="grey darken-2 fab-card" class="white--text">
                        <v-card-title primary-title>
                          <div class="headline">Create epic</div>
                          <div>Create a new epic to log stories against.</div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn class="fab-card-button" flat dark @click="createEpic">Create Epic</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-flex>
                  <v-flex xs4>
                    <v-card color="grey darken-2 fab-card" class="white--text">
                        <v-card-title primary-title>
                          <div class="headline">Create client</div>
                          <div>Create a new client to log epics and stories against.</div>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn class="fab-card-button" flat dark @click="createClient">Create Client</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
          {{ error }}
          <v-btn color="white" flat @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
    </v-container >
  </template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  name: 'CreateStory',
  data () {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      autoClient: '',
      autoEpic: '',
      autoType: '',
      isEditing: '',
      storyCreated: {},
      clients: [],
      epics: [],
      types: [
        {
          text: 'Story',
          value: 'Story'
        },
        {
          text: 'Bug',
          value: 'Bug'
        },
        {
          text: 'Task',
          value: 'Task'
        },
        {
          text: 'Subtask',
          value: 'Subtask'
        }
      ],
      dialog: false,
      selectedEpicId: null,
      selectedClientId: null,
      storyForm: {
        task: '',
        story_type: '',
        points: '',
        epic_id: null
      },
      valid: false,
      taskRules: [
        v => !!v || 'Task is required'
      ]
    }
  },
  created () {
  },
  mounted () {
    this.getClients()
    this.checkClientSelected()
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    },
    user () {
      return this.$store.getters.getUser
    },
    client () {
      return this.$store.getters.getCurrentClient
    }
  },
  methods: {
    createStory (form) {
      HTTP.post('/users/' + this.user.id + '/clients/' + this.selectedClientId + '/epics/' + this.selectedEpicId + '/stories', form)
        .then(response => {
          console.log(response.data)
          this.storyCreated = response.data.story
          this.dialog = true
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          if (error.response.status === 422) {
            this.error = 'Task, Client and Epic of the story is required'
          } else {
            this.error = error.response.data.name
          }
        })
    },
    getClients () {
      HTTP.get('/users/' + this.user.id + '/clients')
        .then(response => {
          let clients = response.data.clients
          this.clients = clients
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get clients'
        })
    },
    getEpics (item) {
      HTTP.get('/users/' + this.user.id + '/clients/' + item + '/epics')
        .then(response => {
          let epics = response.data.epics
          this.epics = epics
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get epics'
        })
    },
    setClient (item) {
      this.selectedClientId = item
      this.getEpics(item)
    },
    setEpic (item) {
      this.storyForm.epic_id = item
      this.selectedEpicId = item
    },
    gotoStory (storyCreated) {
      this.$router.push('/story/' + this.storyCreated.id)
    },
    clearForm () {
      this.storyForm.task = ''
      this.storyForm.points = null
      this.dialog = false
    },
    setType (item) {
      console.log(item)
      this.storyForm.story_type = item
    },
    gotoClients  () {
      this.$router.push('/clients')
    },
    createClient () {
      this.$router.push('/clients-create')
    },
    createEpic () {
      this.$router.push('/epics-create')
    },
    checkClientSelected () {
      if (this.client) {
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .epic-create-card
    left: 25%
</style>
