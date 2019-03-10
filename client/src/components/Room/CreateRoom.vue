<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <v-text-field
      label="Room Name*"
      :rules="[rules.required]"
      v-model="room.room_name">
      </v-text-field>
      <v-text-field
      label="Room Link*"
      :rules="[rules.required]"
      v-model="room.room_link">
      </v-text-field>
      <div class="danger-alert mt-2 mb-2" v-html="error">
        {{ error }}
      </div>
      <v-btn
      @click="create"
      >Submit</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import RoomService from '@/services/RoomService'

export default {
  beforeRouteEnter: (to, from, next) => {
    const isUserLoggedIn = store.state.isUserLoggedIn
    if (isUserLoggedIn) {
      next()
    } else {
      next({ name: 'notfound' })
    }
  },
  data () {
    return {
      room: {
        room_name: null,
        room_link: null
      },
      rules: {
        required: (value) => !!value || 'required'
      },
      error: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    async create () {
      try {
        const UserId = this.user.id
        const ScanId = this.route.params.ScanId

        this.room = (await RoomService.post({
          UserId: UserId,
          ScanId: ScanId,
          room_name: this.room.room_name,
          room_link: this.room.room_link
        })).data
        this.$router.push({
          name: 'scan'
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
