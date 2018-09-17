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
                        <v-select :items="clients" item-text="name" item-value="id" input-value="epicForm.client_id"  @change="setClient" label="Client" required>
                        </v-select>
                        <v-select :items="epics" item-text="name" item-value="id" input-value="storyFrom.epic_id"  @change="setEpic" label="Epic" required>
                            </v-select>
                        <v-text-field v-model="storyForm.task" :rules="taskRules" label="Story" required>
                        </v-text-field>
                        <v-select :items="types"  @change="setType" label="Type" required>
                            </v-select>
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
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-btn xs3 class="left" @click="clearForm()">
                        Create another story
                    </v-btn>
                    <v-btn xs3 class="left" @click="gotoStory(storyCreated)">
                        Vist story created
                    </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-dialog>
    </v-container >
  </template>
<script>
import { HTTP } from '@/http-common.js'

export default {
  name: 'CreateStory',
  data () {
    return {
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
        .catch(e => {
          this.errors.push(e)
        })
    },
    getClients () {
      HTTP.get('/users/' + this.user.id + '/clients')
        .then(response => {
          let clients = response.data.clients
          this.clients = clients
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getEpics (item) {
      HTTP.get('/users/' + this.user.id + '/clients/' + item + '/epics')
        .then(response => {
          let epics = response.data.epics
          this.epics = epics
        })
        .catch(e => {
          this.errors.push(e)
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
      this.storyForm.story_type = ''
      this.storyForm.points = null
      this.dialog = false
    },
    setType (item) {
      console.log(item)
      this.storyForm.story_type = item
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .epic-create-card
    left: 25%
</style>
