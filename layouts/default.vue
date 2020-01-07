<template>
  <v-app :class="pageClasses">
    <v-navigation-drawer v-model="drawer" app right>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact @click="closeDrawer()">
          <!--v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action-->
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <div class="top-bar">
        <v-toolbar-items>
          <v-btn class="agents" :to="`/agencies/${ county }`" flat :ripple="false">
            <span class="county" v-if="county">{{ county }} County</span>
            <span class="nearby">Nearby Agents</span>
          </v-btn>
          <v-btn class="quote hidden-sm-and-down" flat :ripple="false">Get a Quote</v-btn>
          <v-btn class="locale" flat :ripple="false" @click="changeLocale" @enter="changeLocale">
            {{ displayLocale.label }}
          </v-btn>
        </v-toolbar-items>
      </div>
      <div class="logo-wrapper">
        <n-link to="/">
          <div class="logo" />
        </n-link>
        <div class="logo-content">
          <div class="title">North Carolina</div>
          <div class="subtitle">Farm Bureau Insurance Group</div>
        </div>
      </div>
      <v-spacer />
      <v-toolbar-items class="main hidden-sm-and-down">
        <v-btn flat :ripple="false">Find Insurance</v-btn>
        <v-btn flat :ripple="false">File a Claim</v-btn>
        <v-btn flat :ripple="false">Pay Your Bill</v-btn>
        <v-btn class="login" flat :ripple="false">Log In</v-btn>
      </v-toolbar-items>
      <div class="menu" @click="drawer = !drawer">
        <i />
      </div>
      <!--v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer" /-->
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <v-layout wrap>
        <v-flex xs12 md3 class="top logo-wrapper">
          <n-link to="/">
            <div class="logo" />
          </n-link>
          <div class="nc">NC Farm Bureau</div>
          <div class="ig">Insurance Group</div>
        </v-flex>
        <v-flex xs12 md3 class="top first">
          <div class="subtitle">No Login Required</div>
          <div class="body">
            Short on time? No problem. We have the most important services available, no registration needed.
          </div>
          <ul class="cta">
            <li>
              <a>Make a Payment</a>
            </li>
            <li>
              <a>File a Claim</a>
            </li>
          </ul>
        </v-flex>
        <v-flex xs12 md3 class="top second">
          <div class="subtitle">Your Account</div>
          <div class="body">
            Register to manage payments with e-bills, file claims and view policy information.
          </div>
          <ul class="cta">
            <li>
              <a>Log In</a> <span>or</span> <a>Register</a>
            </li>
          </ul>
        </v-flex>
        <v-flex xs12 md3 class="top third">
          <div class="subtitle">Download Our App</div>
          <div class="body">
            Download the NCFBINS app today for on-the-go access to your registered policies.
          </div>
          <ul class="cta">
            <li>
              <a>Learn More</a>
            </li>
          </ul>
        </v-flex>
        <v-flex xs12 class="links">
          <v-toolbar-items>
            <v-btn flat :ripple="false">About Us</v-btn>
            <v-btn flat :ripple="false">Careers</v-btn>
            <v-btn flat :ripple="false">Member Benefits</v-btn>
            <v-btn flat :ripple="false">B2B Login</v-btn>
            <v-btn flat :ripple="false">Locations</v-btn>
          </v-toolbar-items>
        </v-flex>
        <v-flex xs12 class="copyright">&copy; Copyright 2019 North Carolina Farm Bureau Insurance Group</v-flex>
      </v-layout>
    </v-footer>
    <GmapMap ref="geocoder" class="geocoder" :center="{}" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      displayLanguage: '',
      items: [
        {
          icon: 'apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'house',
          title: 'Agencies',
          to: '/agencies'
        },
        {
          icon: 'question-mark',
          title: 'FAQs',
          to: '/faqs'
        }
      ],
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALES,
      showNav: false
    }
  },
  computed: {
    ...mapGetters({
        county: 'content/county',
        content: 'content/content',
        selectedLocale: 'content/selectedLocale'
    }),

    displayLocale() {
      let localeToReturn
      const vm = this
      vm.locales.forEach((locale) => {
        if (vm.selectedLocale !== locale.locale) {
          localeToReturn = locale
        }
      })
      return localeToReturn
    },

    pageClasses() {
      let key = this.$route.name.indexOf('-') === -1 ? this.$route.name : this.$route.name.substr(0, this.$route.name.indexOf('-'))
      let page = this.findContent(key)
      if (page) {
        return `${key} ${page.content.cssClasses}`
      } else {
        const paramKeys = Object.keys(this.$route.params)
        if (paramKeys.length) {
          page = this.findContent(this.$route.params[paramKeys[0]])
          if (page) {
            return `${key} ${page.content.length ? page.content[0].cssClasses : page.content.cssClasses}`
          }
        }
      }
      return null
    }
  },
  mounted() {
    const vm = this
    vm.$refs.geocoder.$mapPromise.then(() => {
      vm.$store.dispatch('content/findCounty')
    })
    vm.locales.forEach( (locale) => {
      if (locale.locale === vm.selectedLocale) {
        vm.displayLanguage = locale.label
      }
    })
  },
  methods: {
    changeLocale(locale) {
      this.$store.dispatch('content/updateLocale', this.displayLocale.locale)
    },

    closeDrawer() {
      this.drawer = false
    },

    findContent(key) {
      return this.content.find(content => content.key === key && content.locale === this.selectedLocale)
    }
  }
}
</script>
