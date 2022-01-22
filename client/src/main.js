import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/antd.css';

// Import all ant design components
import {
  Button,
  Layout,
} from 'ant-design-vue';
Vue.use(Button, Layout);

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
