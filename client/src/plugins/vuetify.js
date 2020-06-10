import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    themes: {
      light: {
        primary: '#02244A',
        secondary: '#164869',
        accent: '#DF622C',
        error: '#6E1110',
        info: '#fff',
        success: '#fff',
        warning: '#612B13',
        default: '#fff',
        light1: '#8CE5F5',
        light2: '#55BDCA',
      },
    },
  },
});
