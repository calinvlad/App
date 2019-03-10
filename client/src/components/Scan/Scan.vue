<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-btn
      class="mb-4"
      v-if="isUserLoggedIn && user.id == $route.params.UserId"
      :to="{ name: 'createscan' }">
        Create Property
      </v-btn>
      <v-card
      class="box mb-5"
      v-for="scan in scans" :key="scan.id">
        <h1>Property</h1>
        <h1>{{scan.scan_name}}</h1>
        <p>{{scan.scan_link}}</p>
        <p>User Id {{scan.UserId}}</p>
        <v-btn
        v-if="isUserLoggedIn && user.id == $route.params.UserId"
        class="teal mt-2 mb-5"
        :to="{name: 'editscan', params: {ScanId: scan.id}}">
        <v-icon>edit</v-icon>
        </v-btn>
        <room :scan_id="scan.id"/>
      </v-card>
    </v-flex>
    <v-flex xs6 offser-xs3>
      <socials />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ScanService from '@/services/ScanService'
import Room from '@/components/Room/Room'
import Socials from '@/components/Public/Socials'

export default {
  components: {
    Room,
    Socials
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
    beforeEnter: (to, from, next) => {
      if (this.scans[0] === undefined && !this.isUserLoggedIn) {
        next({ name: 'notfound' })
      } else {
        next()
      }
    },
    async getData () {
      this.UserId = this.$route.params.UserId
      this.scans = (await ScanService.show(this.UserId)).data
    }
  }
}
</script>
