<template>
  <div>
    <nuxt-child/>
    <agency-map />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AgencyMap from '@/components/AgencyMap.vue'

export default {
  components: {
    AgencyMap
  },
  transition(to, from) {
    if (from && from.name === 'agency-agency') {
      return 'slide-right'
    }
  }
}
</script>
