<template>
    <div class="hero component" :style="getBackgroundImageStyle()">
        <v-layout align-center justify-space-between row fill-height>
            <v-flex xs10 offset-xs1 :class="contentClass()">
                <div class="content" v-html="renderContent()" />
                <v-btn class="cta1" @click="callToAction(data.ctaButton1Path)" v-if="data.ctaButton1Subtitle">
                    {{ getButtonSubtitle(data.ctaButton1Subtitle) }}
                </v-btn>
                <v-btn class="cta2" @click="callToAction(data.ctaButton2Path)" v-if="data.ctaButton2Subtitle">
                    {{ getButtonSubtitle(data.ctaButton2Subtitle) }}
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const DYNAMIC_VARIABLE_REG_EX = /\${(.*?)\}/

export default {
    props: ['data'],
    computed: {
        ...mapGetters({
            county: 'content/county'
        })
    },
    methods: {
        callToAction(buttonPath) {
            const path = this.updateContentWithDynamicVariables(buttonPath)
            this.$router.push({ path })
        },

        contentClass() {
            let contentClass = this.data.alignContent
            if (this.data.alignContent === 'center') {
                contentClass += ' md6 offset-md3'
            } else if (this.data.alignContent === 'right') {
                contentClass += ' md4 offset-md7'
            } else {
                contentClass += ' md4'
            }
            return contentClass
        },

        getBackgroundImageStyle() {
            if (this.data.backgroundImage) {
                return `background-image: url('${this.data.backgroundImage.url}');`
            }
        },

        renderContent() {
            return documentToHtmlString(this.data.content)
        },

        getButtonSubtitle(subtitle) {
            return this.updateContentWithDynamicVariables(subtitle)
        },

        updateContentWithDynamicVariables(content) {
            const match = content.match(DYNAMIC_VARIABLE_REG_EX)
            if (match) {
                const matchingVar = this[match[match.length - 1]]
                if (matchingVar) {
                   return content.replace(DYNAMIC_VARIABLE_REG_EX, matchingVar)
                }
                return null
            }
            return content
        }
    }
}
</script>
