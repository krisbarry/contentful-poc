<template>
  <div class="local-agents component">
    <x-up :data="localAgents" />
  </div>
</template>

<script>
import XUp from '@/components/page/XUp.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['data'],
  components: {
    XUp
  },
  computed: {
    ...mapGetters({
        county: 'content/county',
        agencies: 'content/agencies'
    }),

    localAgents() {
      const agents = []
      this.agencies.forEach((agency) => {
        agency.agents.forEach((agent) => {
          agents.push({
            city: agency.city,
            name: agent.name,
            slug: agent.slug,
            type: 'agent-summary',
            state: agency.state,
            county: agency.county,
            picture: agent.picture,
            agencyName: agency.name,
            agencyManager: agent.isManager           
          })
        })
      })
      return {
        items: agents,
        numItemsToDisplay: this.data.metadata ? this.data.metadata.numItemsToDisplay : 2
      }
    }
  },
  watch: {
    county() {
      console.log('LocalAgents::county changed: ' + this.county)
      if (this.county) {
        this.$store.dispatch('content/findNearbyAgencies')
      }
    }
  }
}
</script>
