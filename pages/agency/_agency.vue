<template>
  <div class="agency-wrapper" :class="{'alert-exists': agency.alert}">
    <hero :data="heroImage" v-if="agency.backgroundImage" />
    <div class="agency-details">
      <div class="intro">
        <h3 class="county">{{ agency.county }} County</h3>
        <h3 class="name">{{ agency.name }}</h3>
        <div class="welcome" v-html="welcomeMessage" />
        <div class="address icon">
          <div class="address1">{{ agency.address1 }}</div>
          <div class="address2" v-if="agency.address2">{{ agency.address2 }}</div>
          <div class="location">{{ agency.city }}, {{ agency.state }} {{ agency.zipCode }}</div>
          <a class="directions">Get Directions</a>
        </div>
        <div class="hours icon">
          {{ agency.hours }}
        </div>
        <div class="phone icon">{{ agency.phoneNumber }}</div>
        <div class="email icon">
          <a :href="`mailto:${agency.emailAddress}`">Email Us</a>
        </div>
        <div class="clear" />
      </div>
      <div class="alert" v-html="alert" v-if="agency.alert" />
    </div>
    <v-layout wrap>
      <v-flex xs12 sm7 class="agents manager">
        <h4 class="subtitle">Our Agency Manager</h4>
        <agent :data="agencyManager" />
      </v-flex>
      <v-flex xs12 sm7 class="agents">
        <h4 class="subtitle">Our Agents</h4>
        <v-layout wrap>
          <template v-for="(agent, i) in agency.agents">
            <v-flex xs12 md6 :key="i" v-if="!agent.isManager">
              <agent :data="agent" />
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm7 class="team" v-if="agency.teamPhoto">
        <div class="subtitle">Meet Our Team</div>
        <div class="photo">
          <img :src="agency.teamPhoto.url" />
        </div>
        <div class="body">
          {{ agency.teamPhoto.description }}
        </div>
        <div class="clear" />
      </v-flex>
      <v-flex xs12>
        <component-renderer :page-components="agency.pageComponents" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import hero from '@/components/page/Hero.vue'
import page from '@/pages/page.vue'
import agent from '@/components/agent.vue'
import { mapGetters } from 'vuex'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  extends: page,
  components: {
    agent,
    hero
  },
  transition(to, from) {
    if (from && from.name === 'agencies') {
      return  'slide-left'
    } else {
      return  'slide-right'
    }
  },
  computed: {
    ...mapGetters({
      selectedLocale: 'content/selectedLocale'
    }),
    agency() {
      if (this.pageContent && this.pageContent.length) {
        return this.pageContent[0]
      }
      return {}
    },
    alert() {
      return documentToHtmlString(this.agency.alert)
    },
    heroImage() {
      return {
        backgroundImage: this.agency.backgroundImage
      }
    },
    welcomeMessage() {
      return documentToHtmlString(this.agency.welcomeMessage)
    },
    agencyManager() {
      if (this.agency && this.agency.agents) {
        return this.agency.agents.find((agent) => agent.isManager)
      }
      return {}
    }
  },
  watch: {
    selectedLocale(locale) {
      this.$store.dispatch('content/findContent', {
          key: 'agency-agency',
          slug: this.$route.params.agency
      })
    }
  },
  head() {
    return {
      title: this.agency ? this.agency.title : '',
      meta: [{
        description: this.agency ? this.agency.description : ''
      }]
    }
  }
}
</script>