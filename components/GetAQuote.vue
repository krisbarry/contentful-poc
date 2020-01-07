<template>
    <v-layout class="component" align-end justify-start row fill-height wrap>
        <v-flex class="subtitle" xs12 v-if="!isSummary">
            Select a product to get a quote.
        </v-flex>
        <v-flex :class="{'xs12 md8': isSummary, 'xs12 md4': !isSummary}">
            <div class="label" v-if="!isSummary">Select a Policy Type</div>
            <v-select v-model="selectedProduct" :items="products" :label="isSummary && !selectedProduct ? 'Select a Policy Type': ''" outline />
        </v-flex>
        <v-flex xs8 md4 v-if="!isSummary">
            <div class="label">Zip Code</div>
            <v-text-field outline />
        </v-flex>
        <v-flex xs12 md4 class="button-wrapper">
            <v-btn>Get a Quote</v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['data', 'searchFor'],
    data() {
        return {
            isSummary: false,
            selectedProduct: null,
            products: [
                'Auto Insurance',
                'Homeowners Insurance',
                'Renters Insurance',
                'Life Insurance'
            ]
        }
    },
    created() {
        if (this.data.metadata) {
            this.isSummary = this.data.metadata.isSummary
        } else {
            this.selectedProduct = 'Auto Insurance'
        }
    }
}
</script>