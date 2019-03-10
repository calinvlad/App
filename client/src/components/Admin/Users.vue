<template>
  <h1>Users</h1>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  beforeRouteEnter: (to, from, next) => {
    if (store.state.isAdmin) {
      next()
    } else {
      next({ name: 'notfound' })
    }
  },
  computed: {
    ...mapState(['isAdmin'])
  }
}
</script>

<style>

</style>
