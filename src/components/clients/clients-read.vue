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
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.summary }}</td>
                    <td>{{ props.item.stories.length }}</td>
                    <td class="table-row">
                        <v-icon @click="visitEpic(props.item)">pageview</v-icon>
                    </td>
                    <td class="table-row">
                        <v-icon>edit</v-icon>
                    </td>
                    <td class="table-row">
                        <v-icon>delete</v-icon>
                    </td>
                  </template>
                </v-data-table>
              <div class="spacer"></div>
              <span class="subheading">Stories</span>
              <v-divider class="my-3"></v-divider>
              <v-data-table :headers="storyHeaders" :items="client.stories" hide-actions class="elevation-1">
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
                <v-btn>Create Story</v-btn>
                <v-btn @click="exportCSV()" :download="fileName">Export CSV</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-responsive>
  </v-container>
</template>
<script>
import { HTTP } from '@/http-common.js'
import FileSaver from 'file-saver'

export default {
  name: 'ClientRead',
  data () {
    return {
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
      fileName: 'export_stories.csv'
    }
  },
  mounted () {
    this.getClient()
    this.getEpics()
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
          this.epics = response.data.client.epic
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getEpics () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.$route.params.id + '/epics')
        .then(response => {
          this.epics = response.data.epics
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    visitEpic (epic) {
      this.$router.push('/epic/' + epic.id)
    },
    exportCSV () {
      HTTP.get('/users/' + this.user.id + '/clients/' + this.$route.params.id + '/export.csv')
        .then(response => {
          let blob = new File([response.data], 'export.csv')
          FileSaver.saveAs(blob, 'export.csv')
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
<style lang="sass">
.spacer
  height: 30px
</style>
