
<template>
  <div id="Landing">

    <StripedTransition
      :start="transitionColors.start"
      :middle="transitionColors.middle"
      :end="transitionColors.end">
      <Tagline slot="content"/>
    </StripedTransition>

    <Features/>

    <!-- <v-container fluid class="fullwindow" style="z-index:0;">
        <v-row id="landing-row" class="fullwindow">
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">

            </div>
          </v-col>
        </v-row>
        <v-row id="row2" class='forward light-2'>
          <HowItWorks/>
        </v-row>
        <v-row class='forward text-left light-2'>
          <FAQ/>
        </v-row>
        <Footer/>
      </v-container> -->
    <v-snackbar
      v-model="pwreset"
      :timeout="timeout"
      color="green"
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
    transitionColors: {
      start: {
        r: 2,
        g: 36,
        b: 74,
      },
      middle: {
        r: 140,
        g: 229,
        b: 245,
      },
      end: {
        r: 85,
        g: 189,
        b: 202,
      },
    },
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
    this.pwreset = false;
    this.urlCode = this.getUrlVal('snackbar');
    this.timeout = 3000;
    if (this.urlCode === 'pwreset') {
      this.pwreset = true;
    }
  },
};
</script>

<style scoped>
#Landing {
  position: relative;
}

.content {
  padding-top:0;
  padding-bottom:0;
  height: 100vh;
  z-index: 5;
}

#email-pic{
  box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),
  0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius:4px;
}

.fullwindow{
  padding-top:0;
  padding-bottom:0;
  height: 100vh;
  background-color: var(--dark-1);
}

.title-card{
  padding: 20px;
  padding-top: 80px;
}
.forward{
  z-index:2;
}
#tagpara{
  text-align:left;
  margin-top:80px;
  font-size: 1.5em;
  padding-left: 60px;
  padding-right: 40px;
  padding-bottom: 40px;
}
#header-desktop{
  font-size: 80px;
  font-weight: 600;
}
#header-mobile{
  font-size: 42px;
  font-weight: 600;
  display: none;
}
#tagline{
  font-size: 2.3em;
  font-weight: 400;
}
#landing-row{

  background-image: linear-gradient(to bottom, var(--dark-1), var(--dark-2));
  /* background-image: url("../assets/landing.jpg");
  background-size: cover; */
}

.cardQuestion{
  padding-left: 10px;
}
.cardAnswer{
  padding-left: 10px;
}

p{
  color:black;
  font-size: 1.2em;
}
table{
  color:black;
  font-size: 1.2em;
  border-spacing: 0 8px;
}

li{
  color:black;
  font-size: 1.2em;
}

@media only screen and (max-width: 1850px) {
  #header-desktop{
    font-size: 64px;
  }
}
@media only screen and (max-width: 1536px) {
  #header-desktop{
    font-size: 48px;
  }
  #tagpara{
    font-size: 19px;
  }
}
@media only screen and (max-width: 1281px) {
  #tagpara{
    margin-top:40px;
  }
  #header-desktop{
    display: none;
  }
  #header-mobile{
    display: block;
    padding-top: 20px;
  }
  #tagline{
    font-size: 1.7em;
    font-weight: 400;
  }
  .title-card{
    padding: 10px;
  }
}
@media only screen and (max-width: 959px) {
  .fullwindow{
    height:auto !important;
    position: relative;
  }

}
</style>
