import Vue from 'vue'
import App from './App.vue'

//add vuetify plugin
import vuetify from '@/plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)
Vue.config.productionTip = false

//import css files
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
//ue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

new Vue({
  //add vuetify to vue
  vuetify,

  router,
  render: h => h(App)
}).$mount('#app')
