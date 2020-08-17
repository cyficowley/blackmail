
<template>
  <div :class="$style.component">
    <striped-transition>
      <tagline slot="content" />
    </striped-transition>

    <features />

    <v-snackbar
      v-model="pwReset"
      color="green"
      :timeout="timeout"
      top>
      Password reset successful. You can now log in.
    </v-snackbar>
  </div>
</template>


<script>
import Tagline from '@/components/landing/Tagline.vue';
import Features from '@/components/landing/Features.vue';
import StripedTransition from '@/components/misc/StripedTransition.vue';

export default {
  name: 'Landing',
  components: {
    Tagline,
    Features,
    StripedTransition,
  },
  data: () => ({
    pwReset: false,
    timeout: 0,
  }),
  methods: {
    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },
  },
  created() {
    this.pwReset = false;
    const urlCode = this.getUrlVal('snackbar');
    this.timeout = 3000;
    if (urlCode === 'pwreset') {
      this.pwReset = true;
    }
  },
};
</script>

<style module>
.component {
  position: relative;
}
</style>
