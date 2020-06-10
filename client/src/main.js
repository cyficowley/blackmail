import Vue from 'vue';

import { Datetime } from 'vue-datetime';
import VModal from 'vue-js-modal';
import 'vue-datetime/dist/vue-datetime.css';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.use(Datetime);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
