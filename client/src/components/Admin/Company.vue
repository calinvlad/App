<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{company.company_name}} Properties</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.scan_name" label="Scan Name"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="editedItem.scan_link" label="Scan Link"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="companyScans"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.scan_name }}</td>
        <td class="text-xs-left">{{ props.item.scan_link }}</td>
        <td class="text-xs-left">{{ props.item.rooms }}</td>
        <td class="justify-left layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import store from '@/store'
import AdminService from '@/services/AdminService'

export default {
  data: () => ({
    company: {},
    dialog: false,
    headers: [
      {
        text: 'Property Name',
        align: 'left',
        sortable: false,
        value: 'scan_name'
      },
      { text: 'Matterport Link', value: 'scan_link' },
      { text: 'Rooms', value: 'rooms' }
    ],
    companyScans: [],
    companyScan: '',
    editedIndex: -1,
    editedItem: {
      scan_name: '',
      scan_link: ''
    },
    defaultItem: {
      scan_name: '',
      scan_link: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  // created () {
  //   this.initialize()
  // },
  methods: {
    editItem (item) {
      this.editedIndex = this.companyScans.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.companyScan = item
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.companyScans.indexOf(item)
      this.companyScan = item
      confirm('Are you sure you want to delete this property?') && this.companyScans.splice(index, 1)
      this.scan = await AdminService.removeCompanyScan(this.CompanyName, this.companyScan)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.companyScans[this.editedIndex], this.editedItem)
        this.companyScanUpdate = (await AdminService.editCompanyScan(this.CompanyName, this.companyScan)).data
      } else {
        this.companyScans.push(this.editedItem)
        this.scan = (await AdminService.createCompanyScan(this.CompanyName, {
          scan_name: this.editedItem.scan_name,
          scan_link: this.editedItem.scan_link
        })).data
      }
      this.close()
    }
  },
  async mounted () {
    this.CompanyName = store.state.route.params.company_name
    this.company = (await AdminService.getCompanyByName(this.CompanyName)).data
    this.companyScans = (await AdminService.getCompanyScans(this.CompanyName)).data
  }
}
</script>

<style>

</style>
