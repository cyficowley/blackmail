<template>
  <v-app id="landing">
    <v-content>
      <v-container fluid class="fullwindow">
        <v-row id="landing-row" class="fullwindow">
          <v-col cols="12" lg="4">
            <div style="padding:20px; padding-top:80px;">
              <v-card color="rgba(255,255,255,.8)" flat>
                <h1 id="header">BLACKMAIL</h1>
                <p id="tagline">No one can motivate you better than you</p>
                <p id="tagpara">
                  You will be more motivated then you ever have been in your entire miserable life.
                  Please use our product we want ad revenue.
                </p>
              </v-card>
            </div>
          </v-col>
          <v-col cols="4">
            <v-btn style="top:90vh;" class="d-none d-md-inline" depressed
              color="rgba(255,255,255,.8)"
              align-bottom @click="$vuetify.goTo('#row2', {duration:800})">
              More Questions?
            </v-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <div style="padding:20px; padding-top:80px;">
              <v-card color="rgba(255,255,255,.8)" style="padding:20px; text-align:left" flat>
                <Signup/>
                <v-divider style="margin:10px;"/>
                <Login/>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row id="row2">
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
          litle bitcharoo<br/>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';

export default {
  name: 'Landing',
  components: {
    Login,
    Signup,

  },
};
</script>

<style scoped>
  @media only screen and (max-width: 1263px) {
    .fullwindow{
      height:auto !important;
    }
  }

  .fullwindow{
    padding-top:0;
    padding-bottom:0;
    height: 100vh;
    background-color:lightcyan;
  }
  #tagpara{
    text-align:left;
    margin-top:80px;
    font-size: 1.5em;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
  #header{
    font-size: 6em;
    font-weight: 600;
  }
  #tagline{
    font-size: 2.3em;
    font-weight: 400;
  }
  #landing-row{
    background-image: url("../assets/landing.jpg");
    background-size: cover;
  }
</style>
