<template>
  <div>
  </div>
</template>
<script>
import {HTTP} from '@/http-common.js'

export default {
  data () {
    return {
      error: '',
      cloudDetails: {},
      jiraToken: {},
      auth: {
        auth_token: ''
      },
      jiraClient: {
        code: '',
        client_id: '',
        client_secret: '',
        redirect_uri: '',
        grant_type: 'authorization_code'
      }
    }
  },
  created () {
  },
  mounted () {
    this.getClientDetails()
    this.getBasicAuth()
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    getJiraToken (jiraClient) {
      HTTP.post('https://accounts.atlassian.com/oauth/token', jiraClient)
        .then(response => {
          this.jiraToken = response.data
          this.auth.auth_token = response.data.access_token
          this.$store.dispatch('setJiraToken', response.data)
          sessionStorage.setItem('JiraAuth', response.data.access_token)
          this.getCloudId()
          this.postToken(response.data.access_token)
          // this.$router.push('/')
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get token'
        })
    },
    getCloudId () {
      HTTP.get('/oauth/token/accessible-resources')
        .then(response => {
          this.cloudDetails = response.data[0]
          this.$store.dispatch('setCloudId', response.data[0])
          sessionStorage.setItem('CloudId', response.data[0].id)
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get token'
        })
    },
    getCodeFromUrl () {
      this.jiraClient.code = this.$route.query.code
      this.$store.dispatch('setCode', this.$route.query.code)
      this.getJiraToken(this.jiraClient)
    },
    getClientDetails () {
      HTTP.get('/auths/1')
        .then(response => {
          this.jiraClient.client_id = response.data.auth.client_id
          this.jiraClient.client_secret = response.data.auth.client_secret
          this.jiraClient.redirect_uri = response.data.auth.redirect_uri
          this.getCodeFromUrl()
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get client details'
        })
    },
    getBasicAuth () {
      HTTP.get('/token')
        .then(response => {
          this.$store.dispatch('setBasicAuth', response.data.token)
          sessionStorage.setItem('BasicAuth', response.data.token)
        })
    }
  }
}
</script>
<style>
</style>
