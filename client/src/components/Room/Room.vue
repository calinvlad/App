<template>
  <div class="indigo lighten-5 pt-3 pb-3">
    <h1>Rooms</h1>
    <v-btn
    class="orange"
    v-if="isUserLoggedIn && user.id == $route.params.UserId"
    :to="{name: 'createroom', params: {ScanId: scan_id}}">
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout column>
      <v-flex
      v-for="room in rooms" :key="room.id">
        <h1>{{room.room_name}}</h1>
        <p>{{room.room_link}}</p>
        <v-btn
        v-if="isUserLoggedIn && user.id == $route.params.UserId"
        :to="{name: 'editroom', params: {ScanId: scan_id ,RoomId: room.id}}">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RoomService from '@/services/RoomService'
export default {
  data () {
    return {
      rooms: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  props: ['scan_id'],
  async mounted () {
    this.UserId = this.$route.params.UserId
    this.ScanId = this.scan_id
    this.rooms = (await RoomService.show(this.UserId, this.ScanId)).data
  }
}
</script>

<style>

</style>
