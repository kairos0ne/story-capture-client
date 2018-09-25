<template>
  <v-container>
    <v-flex xs12>
      <h3 class="display-3"> Hello {{user.name}}!</h3>
      <span class="subheading"></span>
      <v-divider class="my-3"></v-divider>
      <p class="mail"><v-icon class="mail-icon">mail</v-icon>{{ user.email}}</p>
      <p class="mail"><v-icon class="mail-icon">account_box</v-icon>{{ user.name}}</p>
      <p class="mail"><v-icon class="mail-icon">vpn_key</v-icon>{{ user.token }}</p>
      <v-btn>Update Details</v-btn>
      <v-btn>Delete Account</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import { HTTP } from '@/http-common.js'

export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getProfile () {
      HTTP.get('/users/' + this.user.id)
        .then(response => {
        })
        .catch(error => {
          this.snackbar = true
          console.log(error.response)
          this.error = 'Cannot get User'
        })
    }
  }
}
</script>

<style lang="sass">
.mail
  padding-left: 20px
.mail-icon
  padding-right: 20px
</style>
