<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <v-btn
      class="mb-4"
      v-if="isUserLoggedIn && user.id == $route.params.UserId"
      :to="{ name: 'createscan' }">
        Create Scan
      </v-btn>
      <v-card
      class="box mb-5"
      v-for="scan in scans" :key="scan.id">
        <h1>{{scan.scan_name}}</h1>
        <p>{{scan.scan_link}}</p>
        <p>User Id {{scan.UserId}}</p>
        <v-btn
        v-if="isUserLoggedIn && user.id == $route.params.UserId"
        class="teal mt-2 mb-5"
        :to="{name: 'editscan', params: {ScanId: scan.id}}">
        Edit Scan
        </v-btn>
        <room :scan_id="scan.id"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ScanService from '@/services/ScanService'
import Room from '@/components/Room/Room'

export default {
  components: {
    Room
  },
  data () {
    return {
      scans: {},
      rooms: {}
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
      // Get the user data from the router's :UserId
      this.UserId = this.$route.params.UserId
      this.scans = (await ScanService.show(this.UserId)).data
    }
  }
}
</script>
