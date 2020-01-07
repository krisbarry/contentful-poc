export default {
    errorOccurred(state, error) {
        state.error = error
    },

    searching(state, flag) {
        state.searching = flag
    },

    setCounty(state, county) {
        state.county = county
        state.findingCounty = false
    },

    setFindingCounty(state, flag) {
        state.findingCounty = flag
    },

    setSelectedAgency(state, agencyName) {
        const agency = state.searchResults.find( agency => agency.name === agencyName)
        state.agencies = [].concat(agency)
    },

    setSelectedLocale(state, locale) {
        state.selectedLocale = locale
    },

    storeAgencies(state, agencies) {
        state.agencies = agencies
        state.searching = false
    },

    storeContent(state, content) {
        const existingContent = state.content.find( (current) => current.key === content.key && current.locale === content.locale)
        if (existingContent) {
            existingContent.content = content.content
        } else {
            state.content.push(content)
        }
        state.searching = false
    },

    storeSearchResults(state, searchResults) {
        state.searching = false
        state.searchResults = searchResults
    }
}
