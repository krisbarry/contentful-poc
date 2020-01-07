<script>
import { mapGetters } from 'vuex'
import componentRenderer from '../components/page/ComponentRenderer.vue'

export default {
  middleware: 'content',
  components: {
    'component-renderer': componentRenderer
  },
  computed: {
    ...mapGetters({
        content: 'content/content',
        selectedLocale: 'content/selectedLocale'
    }),
    pageContent() {
      let page = this.findContent(this.getKey())
      if (page) {
        return page.content
      } else {
        const paramKeys = Object.keys(this.$route.params)
        if (paramKeys.length) {
          page = this.findContent(this.$route.params[paramKeys[0]])
          if (page) {
            return page.content
          }
        }
      }
      return {}
    }
  },
  watch: {
    selectedLocale(locale) {
      this.$store.dispatch('content/findContent', {
          key: this.$route.name,
          slug: this.$route.name
      })
    }
  },
  methods: {
    findContent(key) {
      return this.content.find(content => content.key === key && content.locale === this.selectedLocale)
    },

    getKey() {
      return this.$route.name
      // return this.$route.name.indexOf('-') === -1 ? this.$route.name : this.$route.name.substr(0, this.$route.name.indexOf('-'))
    }
  },
  head() {
    return {
      title: this.pageContent.title,
      meta: [{
        description: this.pageContent.description
      }]
    }
  }
}
</script>
