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
        @click="create"
        >Submit</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ScanService from '@/services/ScanService'

export default {
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
    ])
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.scan)
        .every(key => !!this.scan[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        if (isUserLoggedIn) {
          const UserId = this.$store.state.user.id
        }
        else {
          const UserId = this.$route.params.UserId
        }
        this.scan = (await ScanService.post({
          scan_name: this.scan.scan_name,
          scan_link: this.scan.scan_link,
          UserId: UserId
        })).data
        this.$router.push({
          name: 'scan'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
