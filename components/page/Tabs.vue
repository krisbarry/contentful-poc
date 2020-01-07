<template>
    <v-layout class="tabs component" wrap>
        <v-flex xs12 class="header" v-html="header" v-if="data.header" />
        <v-flex xs12 class="items">
            <v-tabs>
                <v-tab v-for="(label, i) in headerLabels" :key="i" ripple>{{ label }}</v-tab>
                <v-tab-item v-for="(item, j) in data.items" :key="j">
                    <component v-bind:is="item.type" :data="item" />
                </v-tab-item>
            </v-tabs>
        </v-flex>
    </v-layout>
</template>
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    props: ['data'],
    components: {
        'dynamic-component': () => import('@/components/page/Dynamic.vue'),
        'rich-text-component': () => import('@/components/page/RichText.vue')
    },
    computed: {

        header() {
            return documentToHtmlString(this.data.header)
        },

        headerLabels() {
            if (this.data.headerLabels) {
                return this.data.headerLabels
            } else {
                const labels = []
                this.data.items.forEach((item) => labels.push(item.title) )
                return labels
            }
        }
    }
}
</script>