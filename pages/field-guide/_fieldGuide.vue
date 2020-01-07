<template>
  <v-layout wrap justify-center class="field-guide page">
    <v-flex xs12>
        <div class="image" v-if="fieldGuide.image || fieldGuide.thumbnail">
            <img :src="fieldGuide.image ? fieldGuide.image.url : fieldGuide.thumbnail.url" />
        </div>
        <div class="details">
            <div class="title">{{ fieldGuide.title }}</div>
            <div class="body" v-html="body" v-if="fieldGuide.body" />
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
import page from '@/pages/page.vue'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    extends: page,
    computed: {

        fieldGuide() {
            if (this.pageContent && this.pageContent.length) {
                return this.pageContent[0]
            }
            return {}
        },
        
        body() {
            return documentToHtmlString(this.fieldGuide.body)
        }
    },
  head() {
    return {
      title: this.fieldGuide ? this.fieldGuide.title : '',
      meta: [{
        description: this.fieldGuide ? this.fieldGuide.summary : ''
      }]
    }
  }
}
</script>