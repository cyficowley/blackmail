
<template>
  <v-app id="landing">
    <v-content>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <v-row id="landing-row" class="fullwindow">
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">
              <v-card class="">
                <h1 id="header-desktop">BLACKMAILER</h1>
                <h1 id="header-mobile">BLACKMAILER</h1>
                <p id="tagline">Incentivize yourself to complete tasks</p>
                <ol id="tagpara">
                  <li style="margin-bottom:15px;">
                    You have a goal that you can't make yourself complete.
                  </li>
                  <li style="margin-bottom:15px;">
                    Find an embarrasing file and someone you wouldn't want to see it.
                  </li>
                  <li style="margin-bottom:15px;">
                    Upload proof that you completed your goal or we send the file.
                  </li>
                </ol>
              </v-card>
            </div>
          </v-col>
          <v-col class="forward d-none d-md-inline" md="4">
            <div style="height:0px;">
              <v-btn style="top:90vh;" class="d-none d-md-inline accent-1"
                @click="$vuetify.goTo('#row2', {duration:800})">
                <h2>More Questions?</h2>
              </v-btn>
            </div>
            <v-row>
              <img src="../assets/landingGirl.svg" style="width:100%; padding-top:80px;">
            </v-row>
          </v-col>
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">
              <v-card class="" style="padding:20px 20px 10px 20px; text-align:left">
                <Login/>
                <v-divider style="margin:10px;"/>
                <Signup/>
                <v-divider style="margin:10px;"/>
                <Google/>
              </v-card>
            </div>
          </v-col>

          <div class="stripe2">
          </div>
          <div class="stripe">
          </div>
        </v-row>
        <v-row id="row2" class='forward light-2'>
          <HowItWorks/>
        </v-row>
        <v-row class='forward text-left light-2'>
          <FAQ/>
        </v-row>
        <Footer/>
      </v-container>
      <modal name="email-example" :width="600" :height="800">
        <img src="../assets/email.png" style="width:100%;max-height:100vh;">
      </modal>
    </v-content>
     <v-snackbar
             v-model="pwreset"
            :timeout="timeout"
            color="green"
            top
      >Password reset successful. You can now log in.</v-snackbar>
  </v-app>
</template>


<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import HowItWorks from '@/components/HowItWorks.vue';
import FAQ from '@/components/FAQ.vue';
import Google from '@/components/Google.vue';
import Footer from '@/components/Footer.vue';


export default {
  name: 'Landing',

  created() {
    this.pwreset = false;
    this.urlCode = this.getUrlVal('snackbar');
    this.timeout = 3000;
    if (this.urlCode === 'pwreset') {
      this.pwreset = true;
    }
  },
  data: () => ({
    pwReset: false,
  }),

  methods: {
    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },
  },

  components: {
    Login,
    Signup,
    FAQ,
    Google,
    Footer,
    HowItWorks,
  },
};

</script>

<style scoped>

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

  .stripe {
    width:100vw;
    height:50vh;
    position:absolute;
    left:0;
    bottom:0;
    background-image: linear-gradient(to right bottom, rgba(0,0,0,0) 50%, var(--light-2) 50%);
  }
  .stripe2 {
    width:70vw;
    height:70vh;
    position:absolute;
    left:0;
    bottom:0;
    background-image: linear-gradient(to left bottom, rgba(0,0,0,0) 50%, var(--light-1) 50%);
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
    #faq-container{
      width:100%;
      padding: 10px;
      margin:0 auto;
    }
  }
  @media only screen and (max-width: 959px) {
    .fullwindow{
      height:auto !important;
      position: relative;
    }

  }
</style>
