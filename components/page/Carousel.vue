<template>
    <div class="carousel component">
        <div class="header" v-html="header" v-if="data.header" />
        <v-carousel height="inherit">
            <v-carousel-item v-for="(slideData,i) in data.items" :key="i">
                <component v-bind:is="slideData.type" :data="slideData"></component>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>
<script>
import image from './Image.vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    props: ['data'],
    components: {
        'image-component': () => import('@/components/page/Image.vue')
    },
    computed: {
        header() {
            return documentToHtmlString(this.data.header)
        }
    }
}
</script>