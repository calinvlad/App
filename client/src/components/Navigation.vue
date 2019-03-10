<template>
  <v-toolbar>
    <v-toolbar-title v-if="isUserLoggedIn">{{user.company_name}}</v-toolbar-title>
    <v-toolbar-title v-if="!isUserLoggedIn">App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'companies'}" v-if="isAdmin">Admin Panel</v-btn>
      <v-btn flat :to="{name: 'register'}" v-if="!isUserLoggedIn">Register</v-btn>
      <v-btn flat :to="{name: 'login'}" v-if="!isUserLoggedIn">Login</v-btn>
      <v-btn flat :to="{name: 'scan', params: {UserId: user.id}}" v-if="isUserLoggedIn && !isAdmin">Scan</v-btn>
      <v-btn flat @click="logout" v-if="isUserLoggedIn">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isUserLoggedIn', 'isAdmin', 'user'])
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
