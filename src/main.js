import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import VueAxios from 'vue-axios'

import router from "./router/index.js"

import vuerouter from "vue-router"




Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vuerouter)


Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')

