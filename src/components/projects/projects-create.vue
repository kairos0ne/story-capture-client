<template>
      <v-container>
        <v-card max-width="600" class="client-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Project
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="projectForm.name"  label="Name" required>
                        </v-text-field>
                        <v-text-field v-model="projectForm.project_key"  label="Key" required>
                        </v-text-field>
                        <v-text-field v-model="projectForm.description" label="Description">
                        </v-text-field>
                        <v-autocomplete v-model="autoType" :hint="'Start typing'" :items="types" label="Type"  @change="setType">
                          <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                          </v-slide-x-reverse-transition>
                        </v-autocomplete>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="createProject()" flat color="black">Create Project</v-btn>
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
      loading: false,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      error: '',
      dialog: false,
      projectForm: {
        project_key: '',
        project_type: '',
        name: '',
        description: ''
      },
      valid: false,
      autoType: '',
      types: [
        {
          text: 'Software',
          value: 'software'
        },
        {
          text: 'Business',
          value: 'business'
        }
      ]
    }
  },
  created () {
    // Created hook
  },
  mounted () {
    // Mounted hook
  },
  computed: {
    // Computed properties
  },
  methods: {
    // Set the type of the project
    setType (item) {
      // Set the type
      this.projectForm.project_type = item
    },
    createProject () {
      HTTP.post('/projects', this.projectForm)
        .then(response => {
          console.log('Posted client')
          this.$router.push('/projects')
        })
    }
  }
}
</script>

<style>

</style>
