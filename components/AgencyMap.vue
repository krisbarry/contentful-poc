<template>
  <div class="agency-map component">
    <GmapMap ref="agencyMap" :center="agencyMapCenter" :options="agencyMapOptions">
      <GmapInfoWindow :options="infoWindowOptions" :opened="infoWindowOpen"
        :position="infoWindowPosition" @closeclick="infoWindowPosition = false">
        <div class="agency-details" v-if="currentMarkerIndex > -1">
          <div class="photo">
            <img :src="agencies[currentMarkerIndex].teamPhoto.url" />
          </div>
          <div class="content">
            <div class="name" @click="goToAgencyDetails()">
              {{ agencies[currentMarkerIndex].name }}
            </div>
            <div class="address1">{{ agencies[currentMarkerIndex].address1 }}</div>
            <div class="address2" v-if="agencies[currentMarkerIndex].address2">
              {{ agencies[currentMarkerIndex].address2 }}
            </div>
            <div class="city-state-zip">
              {{ agencies[currentMarkerIndex].city }}, {{ agencies[currentMarkerIndex].state }} {{ agencies[currentMarkerIndex].zipCode }}
            </div>
            <div class="phone">{{ agencies[currentMarkerIndex].phoneNumber }}</div>
          </div>
          <div class="clear" />
        </div>
      </GmapInfoWindow>
      <GmapMarker v-for="(marker, index) in agencyMapMarkers" :key="index"
        :position="marker.position" :clickable="true" @click="showAgencyDetails(marker.position, index)" />
    </GmapMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const MAP_OFFSET_TOP = 90
const DEFAULT_MAP_ZOOM = 8
const DEFAULT_MAP_CENTER = {
  lat: 35.1543297,
  lng: -82.1044371
}

export default {
  data() {
    return {
      geocoder: null,
      agencyMapCenter: DEFAULT_MAP_CENTER,
      agencyMapMarkers: [],
      agencyMapOptions: {
        zoom: DEFAULT_MAP_ZOOM,
        maxZoom: 19,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      },
      infoWindowOpen: false,
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPosition: {},
      currentMarkerIndex: -1
    }
  },
  computed: {
    ...mapGetters({
        agencies: 'content/agencies'
    })
  },
  watch: {
    agencies() {
      this.updateAgencyMap()
    },

    county() {
      console.log('AgencyMap::county changed: ' + this.county)
      if (this.county && !vm.$route.params.searchFor) {
        this.$store.dispatch('content/findNearbyAgencies')
      }
    }

  },
  methods: { 
    updateAgencyMap() {
      const vm = this
      vm.agencyMapMarkers = []
      vm.agencies.forEach( (agency) => {
        vm.agencyMapMarkers.push({
          position: {
            lat: agency.latitude, 
            lng: agency.longitude
          }
        })
      })
      if (vm.agencies.length === 1) {
        vm.agencyMapCenter = {
          lat: vm.agencies[0].latitude,
          lng: vm.agencies[0].longitude
        }
        vm.agencyMapOptions.zoom = 15
        vm.$refs.agencyMap.panBy(MAP_OFFSET_TOP, 0)
      } else if (vm.agencies.length > 1) {
        const bounds = new google.maps.LatLngBounds()
        vm.agencyMapMarkers.forEach( marker => {
          bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng))
        })
        vm.$refs.agencyMap.fitBounds(bounds, { top: MAP_OFFSET_TOP })
      } else {
        vm.infoWindowOpen = false
        vm.agencyMapCenter = DEFAULT_MAP_CENTER
        vm.currentMarkerIndex = -1
        vm.agencyMapOptions.zoom = DEFAULT_MAP_ZOOM
      }
    },

    showAgencyDetails(position, index) {
      this.infoWindowPosition = position;
      if (this.currentMarkerIndex === index) {
        this.infoWindowOpen = !this.infoWindowOpen;
      } else {
        this.infoWindowOpen = true;
        this.currentMarkerIndex = index;
      }
    },

    goToAgencyDetails() {
      this.$router.push({
        path: '/agency/' + this.agencies[this.currentMarkerIndex].slug
      })
    }
  }
}
</script>
