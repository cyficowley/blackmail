import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        light: '#F2F2F2',
        dark1: '#202225',
        dark2: '#2F3136',
        dark3: '#363941',
        dark4: '#585C62',
        dark5: '#72767D',
        dark6: '#A6A7A8',
        blue1: '#02244A',
        blue2: '#164869',
        blue3: '#8CE5F5',
        blue4: '#55BDCA',
        accent: '#DF622C',
        error: '#6E1110',
        warning: '#612B13',
      },
    },
  },
});
