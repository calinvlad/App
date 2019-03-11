<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
    <v-card-title>
      Companies
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="companies"
      :search="search"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">
          <router-link
          :to="{name: 'company', params: {company_name: props.item.company_name}}"
          class="link">
            {{ props.item.company_name }}
          </router-link>
        </td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.id }}</td>
      </template>
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import AdminService from '@/services/AdminService'

export default {
  beforeRouteEnter: (to, from, next) => {
    if (store.state.isAdmin) {
      next()
    } else {
      next({ name: 'notfound' })
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Company',
          value: 'company_name',
          align: 'left'
        },
        {
          text: 'Contact',
          value: 'email',
          align: 'left'
        },
        {
          text: 'Id',
          value: 'id',
          align: 'left'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      companies: []
    }
  },
  computed: {
    ...mapState(['isAdmin'])
  },
  async mounted () {
    this.companies = (await AdminService.index()).data
  }
}
</script>

<style lang="sass" scoped>
.link
  text-decoration: none
  color: inherit
  &:hover
    color: blue
</style>
