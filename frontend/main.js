import Vue from 'vue'
// import Store from './store/store'
// import Router from './router/router'
import vuetify from './plugins/vuetify'
import App from './layouts/app'
// import Panel from './components/panel'

import moment from 'moment'
moment.locale('ja')
window.moment = moment


// Vue.component('v-panel', Panel)
// Vue.mixin({
//   methods: {
//     navigateTo (params) {
//       this.$router.push(params)
//     }
//   }
// })

new Vue({
  el: '#app',
  // store: Store,
  // router: Router,
  vuetify,
  render: h => h(App),
  // async created() {
  //   this.$store.dispatch('SetHeadersConfig')
  //   this.$store.dispatch('SessionLogin')
  // }
})