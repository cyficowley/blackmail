import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#02244A',
        secondary: '#164869',
        accent: '#DF622C',
        error: '#DF622C',
        info: '#fff',
        success: '#fff',
        warning: '#DF622C',
        default: '#fff',
      },
    },
  },
});
