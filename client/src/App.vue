<template>
  <v-app>
      <navigation />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.flex.offset-xs3 {
  margin-right: 25%
}
</style>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation
  }
}
</script>
