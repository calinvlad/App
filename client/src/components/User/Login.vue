
<template>
  <v-layout mt-5>
    <v-flex xs-6 offset-xs3>
      <form>
        <v-text-field
          v-model="company_name"
          label="Company Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <div class="danger-alert mb-3" v-html="error"></div>
        <v-btn @click="login">submit</v-btn>
        <v-btn :to="{name: 'forgot'}">Forgot Password?</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      company_name: '',
      password: '',
      error: null
    }
  },
  computed: {
    ...mapState([
      'isAdmin'
    ])
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          company_name: this.company_name,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        if (this.isAdmin) {
          this.$router.push({
            name: 'companies'
          })
        } else {
          this.$router.push({
            name: 'scan',
            params: { UserId: this.$store.state.user.id }
          })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
