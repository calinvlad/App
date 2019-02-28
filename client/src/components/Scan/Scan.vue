<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div
      v-for="scan in scans" :key="scan.id">
        <h1>{{scan.scan_name}}</h1>
        <p>{{scan.scan_link}}</p>
        <p>User Id {{scan.UserId}}</p>
      </div>
      <v-btn
      v-if="isUserLoggedIn && user.id == $route.params.UserId"
      :to="{ name: 'createscan' }">
        Create Scan
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ScanService from '@/services/ScanService'

export default {
  data () {
    return {
      scans: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    '$route': 'getData'
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.UserId = this.$route.params.UserId
      console.log('USERID: ', this.UserId)
      console.log(this.IsUserLoggedIn)
      this.scans = (await ScanService.show(this.UserId)).data
    }
  }
}
</script>
