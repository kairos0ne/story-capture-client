<template>
  <v-responsive color="primary">
    <v-container grid-list-xs>
      <h3 class="display-3">{{setStory.task}}</h3>
      <span class="subheading">{{setStory.story_type}}</span>
      <v-divider class="my-3"></v-divider>
      <v-data-table :headers="headers" :items="storyArray" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td @click="setStory(props.item)">{{ props.item.task }}</td>
          <td>{{ props.item.task_type }}</td>
          <td>{{ props.item.points }}</td>
          <td class="table-row">
              <v-icon @click="editStory(props.item)">edit</v-icon>
          </td>
          <td class="table-row">
              <v-icon>delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </v-responsive>
</template>

<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
      setStory: {},
      headers: [
        {
          text: 'Subtask',
          align: 'left',
          sortable: true,
          value: 'task'
        },
        {
          text: 'Type',
          value: 'story_type',
          align: 'left'
        },
        {
          text: 'Points',
          value: 'points',
          alight: 'left'
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
  created () {
  },
  mounted () {
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    client () {
      return this.$store.getters.getCurrentClient
    },
    epic () {
      return this.$store.getters.getCurrentEpic
    },
    story () {
      return this.$store.getters.getCurrentStory
    }
  },
  methods: {
    getStory () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.client.id + '/epics/' + this.epic.id + '/stories/' + this.$route.params.id)
        .then(response => {
          this.client = response.data.client
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get client'
        })
    }
  }
}
</script>

<style>

</style>
