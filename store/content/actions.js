import { findContent, searchAgencies } from '../../middleware/content/service'

export default {

    async findContent({ commit, state }, params) {
        commit('searching', true)
        const existingContent = state.content.find( (current) => current.key === (params.slug || params.key) && current.locale === state.selectedLocale)
        if (!existingContent) {
            const content = await findContent(params.key, {
                slug: params.slug,
                locale: params.locale || state.selectedLocale
            })
            commit('storeContent', {
                key: params.slug || params.key,
                locale: state.selectedLocale,
                content
            })    
        }
    },

    async findCounty({ commit, state }) {
        if (!state.county && !state.findingCounty) {
            commit('setFindingCounty', true)
            navigator.geolocation.getCurrentPosition((position) => {
                new google.maps.Geocoder().geocode({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                },
                    (results, status) => {
                        if (status === 'OK') {
                            let county
                            if (results.length) {
                                results[0].address_components.forEach((comp) => {
                                    if (comp.types.indexOf('administrative_area_level_2') > -1) {
                                        county = comp.short_name.indexOf(' County') > -1 ?
                                            comp.short_name.substr(0, comp.short_name.indexOf(' County')) : comp.short_name
                                    }
                                })
                            }
                            commit('setCounty', county)
                        }
                    })    
            })
        }
    },

    async findNearbyAgencies({ dispatch, state }) {
        dispatch('searchAgencies', {
            county: state.county,
            storeAgencies: true
        })
    },

    async searchAgencies({ commit }, search) {
        commit('searching', true)
        const agencies = await searchAgencies(search)
        if (search.storeAgencies) {
            commit('storeAgencies', agencies)
        } else {
            commit('storeSearchResults', agencies)
        }
    },

    async selectAgency({ commit }, agencyName) {
        commit('setSelectedAgency', agencyName)
    },

    async updateLocale({ commit }, locale) {
        commit('setSelectedLocale', locale)
    }
}