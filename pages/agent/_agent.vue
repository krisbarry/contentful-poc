<template>
  <v-layout wrap justify-center class="agent page">
    <v-flex xs12>
        <div class="photo">
            <img :src="agent.picture.url" v-if="agent.picture" />
        </div>
        <div class="details">
            <h2 class="name">{{ agent.name }}</h2>
            <div class="contact-info">
                <div class="phone" v-if="agent.officeNumber">
                    <span>Office:</span>{{ agent.officeNumber }}
                </div>
                <div class="phone" v-if="agent.mobileNumber">
                    <span>Mobile:</span>{{ agent.mobileNumber }}
                </div>
                <div class="email">
                    <a :href="`mailto:${agent.emailAddress}`">{{ agent.emailAddress }}</a>
                </div>
            </div>
            <div class="social" v-if="agent.facebookSlug">
                <span>Connect with {{ agent.name }}</span>
                <a :href="`https://facebook.com/${agent.facebookSlug}`">
                    <img src="https://www.ncfbins.com/images/agency/facebook_icon.png" />
                </a>
            </div>
            <div class="clear" />
        </div>
        <div class="clear" />
    </v-flex>
    <v-flex xs12>
      <h2 class="subtitle">About {{ agent.name }}</h2>
      <div v-html="bio" />
    </v-flex>
  </v-layout>
</template>

<script>
import page from '@/pages/page.vue'
import agent from '@/components/agent.vue'
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  extends: page,
  transition(to, from) {
    if (from.name === 'agency-agency') {
      return  'slide-left'
    } else {
      return  'slide-right'
    }
  },
  computed: {
    ...mapGetters({
      selectedLocale: 'content/selectedLocale'
    }),
    agent() {
      if (this.pageContent && this.pageContent.length) {
        return this.pageContent[0]
      }
      return {}
    },
    bio() {
      return documentToHtmlString(this.agent.bio)
    }
  },
  watch: {
    selectedLocale(locale) {
      this.$store.dispatch('content/findContent', {
          key: 'agent-agent',
          slug: this.$route.params.agent
      })
    }
  },
  head() {
    return {
      title: this.agent ? this.agent.title : '',
      meta: [{
        description: this.agent ? this.agent.description : ''
      }]
    }
  }
}
</script>