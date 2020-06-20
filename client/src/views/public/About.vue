<template>
  <v-app id="about">
    <v-content>
      <a href="/#/home" style="text-decoration:none;color:black;"><v-btn class="home">
        <strong>View Deadlines</strong>
      </v-btn></a>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <HowItWorks/>
        <FAQ/>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
// @ is an alias to /src
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

<style scoped>
  .home {
    width: "8%";
    position: fixed;
    right: 20px;
    top: 20px;
    font-size:19px;
    z-index: 99;
    color:black;
  }

</style>
