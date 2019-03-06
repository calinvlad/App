<template>
  <v-layout mt-5>
    <v-flex xs-6 offset-xs3>
      <h1>Forgot password?</h1>
      <form>
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        <div class="danger-alert mb-3" v-html="success"></div>
        <div class="danger-alert mb-3" v-html="error"></div>
        <v-btn @click="forgot">submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  data () {
    return {
      email: '',
      error: null,
      success: null
    }
  },
  methods: {
    async forgot () {
      try {
        await AuthService.forgot({
          email: this.email
        })
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style>

</style>
