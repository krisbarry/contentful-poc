<template>
    <div class="dynamic" :class="data.component" :style="{backgroundImage: (data.backgroundImage ? `url(${data.backgroundImage.url})` : null)}">
        <div class="header" v-html="header" v-if="data.header" />
        <component v-bind:is="data.component" :data="data" />
    </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    props: ['data'],
    components: {
        'agency-map': () => import('@/components/AgencyMap.vue'),
        'get-a-quote': () => import('@/components/GetAQuote.vue'),
        'local-agents': () => import('@/components/LocalAgents.vue'),
        'twitter-feed': () => import('@/components/page/TwitterFeed.vue'),
        'find-an-agency': () => import('@/components/FindAnAgency.vue'),
        'frequently-asked-questions': () => import('@/components/FrequentlyAskedQuestions.vue')
    },
    computed: {
        header() {
            return documentToHtmlString(this.data.header)
        }
    }
}
</script>