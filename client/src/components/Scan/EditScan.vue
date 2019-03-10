<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
        <v-text-field
        label="Scan Name*"
        :rules="[rules.required]"
        v-model="scan.scan_name">
        </v-text-field>
        <v-text-field
        label="Scan Link*"
        :rules="[rules.required]"
        v-model="scan.scan_link">
        </v-text-field>
        <div class="danger-alert mt-2 mb-2" v-html="error">
          {{ error }}
        </div>
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
import ScanService from '@/services/ScanService'

export default {
  beforeRouteEnter: (to, from, next) => {
    if (!store.state.isUserLoggedIn) {
      next({ name: 'notfound' })
    } else {
      next()
    }
  },
  data () {
    return {
      scan: {
        scan_name: null,
        scan_link: null
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
      'user'
    ])
  },
  methods: {
    async update () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.scan)
        .every(key => !!this.scan[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        const ScanId = this.scan.id
        const UserId = this.user.id
        if (this.scan.UserId && this.user.id) {
          await ScanService.update(this.scan, {
            ScanId: ScanId
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
        const ScanId = this.scan.id
        await ScanService.destroy({
          UserId: UserId,
          id: ScanId
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
      const ScanId = this.$store.state.route.params.ScanId
      const UserId = this.user.id
      this.scan = (await ScanService.getById(UserId, ScanId)).data
      // console.log(this.scan)
      // if (this.scan.id === undefined) {
      //   this.$router.push({
      //     path: '*'
      //   })
      // } else {
      //   console.log('Do nothing')
      // }
      // console.log(song)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
