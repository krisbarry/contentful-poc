import Vue from 'vue'
import colors from 'vuetify/es5/util/colors'
import Vuetify/*, {
  VApp, // required
  VNavigationDrawer,
  VFooter,
  VToolbar,
  VTab,
  VTabs,
  VTabItem,
  VLayout,
  VFlex,
  VBtn,
  VImg,
  VIcon,
  VExpansionPanel,
  VExpansionPanelContent,
  VAutocomplete
}*/ from 'vuetify/lib'
// import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  /*components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
    VTab,
    VTabs,
    VTabItem
  },
  directives: {
    Ripple
  },*/
  theme: {
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})
