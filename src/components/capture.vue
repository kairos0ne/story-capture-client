<template>
    <v-container>
        <v-card max-width="600" class="client-create-card">
            <v-card-title class="grey lighten-4 py-4 title">
              Create Client
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                    <v-form v-model="valid">
                        <v-text-field v-model="issueForm.name" :rules="nameRules" label="Name" required>
                        </v-text-field>
                        <v-text-field v-model="issueForm.description" label="Description">
                        </v-text-field>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-btn @click="createClient(user)" flat color="black">Create Client</v-btn>
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
export default {
  data () {
    return {
      issueForm: {
      }
    }
  },
  created () {
    // Created hook
  },
  mounted () {
    // Mounted hook
  }
}
</script>

<style>

</style>
