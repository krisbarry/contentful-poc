export default () => ({
    error: null,
    county: null,
    content: [],
    agencies: [],
    searching: false,
    searchResults: [],
    findingCounty: false,
    findingContent: false,
    selectedLocale: process.env.VUE_APP_I18N_LOCALE
})
  