<template>
    <div class="rich-text component" v-html="richText" />
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    props: ['data'],
    computed: {
        richText() {
            return documentToHtmlString(this.data.body)
        }
    }
}
</script>
