<template>
  <div>
    <v-carousel class="carousel">
      <h1 class="carousel-title">Story capture is used to capture stories against clients</h1>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
      </v-carousel-item>
    </v-carousel>
      <v-container>
        <v-card  color="grey darken-2" class="white--text cta-card">
          <v-card-title primary-title>
            <div class="headline">Get Started.</div>
          </v-card-title>
          <p class="cta-body">You'll need to create an account to start the process. </p>
          <v-card-actions>
            <v-btn @click="createAccount" flat dark>Create Account</v-btn>
          </v-card-actions>
        </v-card>
        <v-card  color="grey darken-2" class="white--text cta-card">
          <v-card-title primary-title>
            <div class="headline">Login</div>
          </v-card-title>
          <p class="cta-body">Login to your account.</p>
          <v-card-actions>
            <v-btn @click="loginUser" flat dark>Login</v-btn>
          </v-card-actions>
        </v-card>
        <v-card  color="grey darken-2" class="white--text cta-card">
          <v-card-title primary-title>
            <div class="headline">Get Started.</div>
          </v-card-title>
          <p class="cta-body">Create a new client to get started</p>
          <v-card-actions>
            <v-btn @click="createStory" flat dark>Capture</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showLinks: false,
      items: [
        {
          src: 'static/process-management.jpg'
        },
        {
          src: 'static/code.png'
        },
        {
          src: 'static/wireframe.jpeg'
        }
      ]
    }
  },
  mounted () {
    this.checkAuth()
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  methods: {
    checkAuth () {
      if (this.auth.isAuthenticated) {
        this.showLinks = true
      } else {
        this.showLinks = false
      }
    },
    createAccount () {
      this.$router.push('/register')
    },
    createStory () {
      this.$router.push('/stories-create')
    },
    loginUser () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="sass">
  .title-about
    text-align: left
    margin-left: 40px
  .v-content
    padding-top: 0px !important
  .carousel-title
    top: 50%
    transform, translateY(-50%)
    text-align: center
    color: white
    position: absolute
    z-index: 1
    width: 100%
  .carousel
    height: 400px
    position: relative
    &:before
      content: ''
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.5)
      z-index: 1
  .cta-body
    text-align: left
    margin-left: 20px
  .cta-card
    min-width: 300px
    width: 30%
    height: 200px
    float: left
    margin: 10px
</style>
