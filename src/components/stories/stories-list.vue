<template>
   <v-container>
     <h1>Stories</h1>
    <v-data-table :headers="headers" :items="storyArray" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.task }}</td>
        <td>{{ props.item.story_type }}</td>
        <td>{{ props.item.points }}</td>
        <td class="table-row">
            <v-icon>edit</v-icon>
        </td>
        <td class="table-row">
            <v-icon>delete</v-icon>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="createStory">Create Story</v-btn>
  </v-container>
</template>
<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
      storyArray: [],
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
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    currentClient () {
      return this.$store.getters.getCurrentClient
    },
    currentEpic () {
      return this.$store.getters.getCurrentEpic
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getStories()
    })
  },
  methods: {
    getStories () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.currentClient.id + '/epics/' + this.currentEpic.id + '/stories')
        .then(response => {
          this.storyArray = response.data.stories
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    createStory () {
      this.$router.push('stories-create')
    }
  }
}
</script>
<style lang="sass">
  .table-row
    width: 50px
</style>
