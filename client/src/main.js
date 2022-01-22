import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
