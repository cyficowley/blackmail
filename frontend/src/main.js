import Vue from 'vue';
import { Datetime } from 'vue-datetime';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/store';
import 'vue-datetime/dist/vue-datetime.css';

const fb = require('./plugins/firebase.js');

Vue.config.productionTip = false;
Vue.use(Datetime);


let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
