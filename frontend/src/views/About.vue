<template>
  <v-app id="about">
    <v-content>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <HowItWorks/>
        <FAQ/>
        <div style="margin:0 -12px 0 -12px;">
          <Footer/>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue';
import HowItWorks from '@/components/HowItWorks.vue';
import FAQ from '@/components/FAQ.vue';


export default {
  name: 'About',

  components: {
    Footer,
    HowItWorks,
    FAQ,
  },
};
</script>

<style scoped>

  .fullwindow{
    padding-top:0;
    padding-bottom:0;
    background-color: var(--light-2);
  }
</style>
