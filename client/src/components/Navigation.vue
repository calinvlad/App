<template>
  <v-toolbar>
    <v-toolbar-title
    v-if="$store.state.isUserLoggedIn"
    >{{$store.state.user.company_name}}</v-toolbar-title>
    <v-toolbar-title
    v-if="!$store.state.isUserLoggedIn"
    >App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
      :to="{name: 'register'}"
      v-if="!$store.state.isUserLoggedIn">
      Register</v-btn>
      <v-btn flat
      :to="{name: 'login'}"
      v-if="!$store.state.isUserLoggedIn">
      Login</v-btn>
      <v-btn flat
      @click="logout"
      v-if="$store.state.isUserLoggedIn">
      Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
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
