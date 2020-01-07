<template>
    <v-layout class="x-up component" wrap>
        <v-flex xs12 class="header" v-html="header" v-if="data.header" />
        <v-flex xs12 class="items">
            <div class="previous" :class="{'inactive': this.itemIndex === 0, 'hide': data.items.length <= data.numItemsToDisplay}"
                @click="decrementItemIndex" @enter="decrementItemIndex">
                <v-icon>chevron_left</v-icon>
            </div>
            <v-layout wrap>
                <v-flex :class="itemsLayout" v-for="(item, i) in contentItems" :key="i">
                    <!-- {{ item.type }} -->
                    <component v-bind:is="item.type" :data="item" v-if="i < data.numItemsToDisplay" />
                </v-flex>
            </v-layout>
            <div class="next" :class="{'inactive': !canIncrement(), 'hide': data.items.length <= data.numItemsToDisplay}"
                @click="incrementItemIndex" @enter="incrementItemIndex">
                <v-icon>chevron_right</v-icon>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    props: ['data'],
    data() {
        return {
            itemIndex: 0
        }
    },
    components: {
        'promo': () => import('@/components/Promo.vue'),
        'testimonial': () => import('@/components/Testimonial.vue'),
        'field-guide': () => import('@/components/FieldGuideSummary.vue'),
        'agent-summary': () => import('@/components/AgentSummary.vue'),
        'image-component': () => import('@/components/page/Image.vue'),
        'rich-text-component': () => import('@/components/page/RichText.vue')
    },
    computed: {

        header() {
            return documentToHtmlString(this.data.header)
        },

        contentItems() {
            return this.data.items.slice(this.itemIndex, this.itemIndex + this.data.numItemsToDisplay)
        },

        itemsLayout() {
            let classes
            switch (this.data.numItemsToDisplay) {
                case 1:
                    classes = 'xs12'
                    break
                case 2:
                    classes = 'xs12 md6'
                    break
                case 3:
                    classes = 'xs12 md4'
                    break
                case 4:
                    classes = 'xs12 md3'
                    break
                case 6:
                    classes = 'xs12 md2'
                    break
            }
            return classes                
        }
    },
    methods: {

        canIncrement() {
            return (this.itemIndex + this.data.numItemsToDisplay) < this.data.items.length
        },

        decrementItemIndex() {
            if (this.itemIndex > 0) {
                this.itemIndex--
            }
        },

        incrementItemIndex() {
            if (this.canIncrement()) {
                this.itemIndex++
            }
        }
    }
}
</script>