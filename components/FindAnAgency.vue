<template>
    <v-layout class="find-an-agency component" row>
        <v-flex class="summary" xs12 v-if="!isAgenciesView">
            <div class="subtitle">Enter zip code or agency name to find a local agency</div>
            <div class="label">Zip Code or Agency Name</div>
            <v-text-field v-model="searchTerm" @click:append="goToAgencies()" @keyup.enter.native="goToAgencies()" outline />
            <v-btn @click="goToAgencies()" @enter="goToAgencies()">Find an Agent</v-btn>
        </v-flex>
        <v-flex xs12 sm6 v-if="isAgenciesView">
            <v-autocomplete v-model="selectedAgency" label="Enter zip code or agency name"
                :items="searchResults" item-text="name" :search-input.sync="autocomplete"
                    :no-filter="true" :loading="searching" flat hide-no-data hide-details solo-inverted />
        </v-flex>
        <v-flex xs12 sm6 v-if="isAgenciesView">
            <v-autocomplete v-model="selectedCounty" :loading="searching" label="Select a County"
                :items="counties" flat hide-no-data hide-details solo-inverted />
        </v-flex>
    </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['data'],
    data() {
        return {
            counties: null,
            searchTerm: null,
            autocomplete: null,
            isAgenciesView: false,
            selectedAgency: null,
            selectedCounty: null
        }
    },
    computed: {
        ...mapGetters({
            county: 'content/county',
            content: 'content/content',
            searching: 'content/searching',
            searchResults: 'content/searchResults'
        })
    },
    created() {
        if (this.data.metadata) {
            this.counties = this.data.metadata.counties
        }
        this.isAgenciesView = this.$route.path.startsWith('/agencies')
    },
    mounted() {
        const searchFor = this.$route.params.searchFor
        if (searchFor) {
            this.selectedAgency = searchFor
            if (isNaN(searchFor)) {
                if (searchFor === this.county) {                    
                    this.searchAgencies({
                        county: this.selectedCounty = searchFor,
                        storeAgencies: true
                    })
                } else {
                    this.searchAgencies({
                        name: searchFor,
                        storeAgencies: true
                    })
                }
            } else {
                this.searchAgencies({
                    zipCode: searchFor,
                    storeAgencies: true
                })
            }
        }
    },
    watch: {
        autocomplete () {
            if (this.autocomplete && this.autocomplete != this.selectedAgency && this.autocomplete.length > 2) {
                this.selectedAgency = null
                if (isNaN(this.autocomplete)) {
                    this.searchAgencies({
                        name: this.autocomplete
                    })
                } else {
                    this.searchAgencies({
                        zipCode: this.autocomplete
                    })
                }
            }
        },
    
        selectedCounty (newCounty, oldCounty) {
            if (this.selectedCounty && this.selectedCounty != oldCounty ) {
                this.searchAgencies({
                    county: this.selectedCounty,
                    storeAgencies: true
                })
            }
        },

        selectedAgency () {
            const searchFor = this.$route.params.searchFor
            if (!searchFor || this.selectedAgency !== searchFor) {
                this.$store.dispatch('content/selectAgency', this.selectedAgency)
            }
        }
    },
    methods: {
        goToAgencies() {
            if (this.searchTerm && this.searchTerm.length > 2) {
                this.$router.push({
                    path: `/agencies/${encodeURIComponent(this.searchTerm)}`
                })
            }
        },

        searchAgencies(searchObj) {
            this.$store.dispatch('content/searchAgencies', searchObj)
        }
    }
}
</script>