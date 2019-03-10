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
        <div class="error" v-html="error"></div>
        <v-btn
        @click="update"
        >Submit</v-btn>
        <v-btn
        class="red"
        @click="destroy"
        >Delete
        </v-btn>
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
    async update () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.room)
        .every(key => !!this.room[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        const RoomId = this.room.id
        const RoomUserId = this.room.UserId
        const ScanId = this.room.ScanId
        const UserId = this.user.id

        if (RoomUserId && UserId) {
          await RoomService.update(this.room, {
            ScanId: ScanId,
            RoomId: RoomId
          })
          this.$router.push({
            name: 'scan',
            params: {
              UserId: UserId
            }
          })
        } else {
          this.error('No permission for you. Please log in.')
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async destroy () {
      try {
        const UserId = this.user.id
        const ScanId = this.room.ScanId
        const RoomId = this.room.id

        await RoomService.destroy({
          UserId: UserId,
          ScanId: ScanId,
          id: RoomId
        })
        this.$router.push({
          name: 'scan',
          params: {
            UserId: UserId
          }
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    try {
      const ScanId = this.route.params.ScanId
      const RoomId = this.route.params.RoomId
      const UserId = this.user.id
      this.room = (await RoomService.getById(UserId, ScanId, RoomId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
