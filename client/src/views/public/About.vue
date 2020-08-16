<template>
  <div>
    <a href="/#/home">
      <v-btn :class="$style.button">
        View Deadlines
      </v-btn>
    </a>

    <div
      class="fullwindow"
      style="z-index:0;">
      <HowItWorks/>

      <FAQ/>
    </div>
  </div>
</template>


<script>
import HowItWorks from '@/components/HowItWorks.vue';
import FAQ from '@/components/FAQ.vue';

export default {
  name: 'About',
  components: {
    HowItWorks,
    FAQ,
  },
};
</script>

<style module>
.button {
  width: "8%";
  position: fixed;
  right: 20px;
  top: 20px;
  font-size:19px;
  z-index: 99;
  color:black;
  font-weight: 700;
  text-decoration: none;
}
</style>
