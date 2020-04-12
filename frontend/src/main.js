import Vue from 'vue';
import { Datetime } from 'vue-datetime';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css';


Vue.config.productionTip = false;
Vue.use(Datetime);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
