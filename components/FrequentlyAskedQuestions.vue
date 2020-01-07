<template>
    <v-layout class="frequently-asked-questions component" wrap>
        <v-flex xs12>
            <v-expansion-panel class="categories" v-model="panels" expand>
                <v-expansion-panel-content v-for="(category, i) in faqs" :key="i">
                    <div slot="header" class="category">
                        {{ category.name }}
                    </div>
                    <v-expansion-panel class="faqs">
                        <v-expansion-panel-content v-for="(faq, i) in category.faqs" :key="i">
                            <div slot="header" class="question">
                                {{ faq.question }}
                            </div>
                            <div class="answer" v-html="renderAnswer(faq.answer)" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
    data() {
        return {
            panels: []
        }
    },
    computed: {
        ...mapGetters({
            content: 'content/content'
        }),
        faqs() {
            const faqs = this.content.find(content => content.key === this.getContentKey())
            if (faqs) {
                return faqs.content
            }
            return []
        },
        renderAnswer() {
            return (answerContent) => documentToHtmlString(answerContent)
        }
    },
    watch: {
        faqs() {
            const vm = this
            this.$nextTick(() => {
                vm.faqs.forEach((category, i) => {
                    vm.panels.push(i === 0)
                })
            })
        }
    },
    created() {
        this.$store.dispatch('content/findContent', {
            key: this.getContentKey()
        })
    },
    methods: {
        getContentKey() {
            return 'faq'
        }
    }
}
</script>
