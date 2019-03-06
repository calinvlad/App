<template>
  <v-layout mt-5>
    <v-flex xs-6 offset-xs3>
      <h1>Reset your password</h1>
      <h3>{{ this.user.company_name }}</h3>
      <form>
        <v-text-field
          v-model="user.password"
          label="Password"
          required
        ></v-text-field>
        <div class="danger-alert mb-3" v-html="error"></div>
        <v-btn @click="reset">Submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      user: {
        id: '',
        email: '',
        company_name: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    async reset () {
      const Token = this.$store.state.route.params.Token
      try {
        await AuthService.reset(Token, {
          id: this.user.id,
          email: this.user.email,
          company_name: this.user.company_name,
          password: this.user.password
        })

        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    try {
      const Token = this.$store.state.route.params.Token

      this.user = (await AuthService.getUserData(Token)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
