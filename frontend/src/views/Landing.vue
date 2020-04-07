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
        <v-row id="row2" class = 'text-center'>
          <div style = "width: 100%">
            <h1 class="text-center bigTitle">FAQ</h1>
            <ul class = "faqList">
              <li class = "faqElement" v-for="question in questions" :key="question.q">
                <b>{{ question.q }}</b> <br/>
                {{ question.a}} <br/> <br/>
              </li>
            </ul>
            <a class="emailLink" ref = "mailto: footballshane@gmail.com">
              More Questions? Email us!</a>
          </div>
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
  data: () => ({
    questions: [
      { q: 'Do we ever look at your photos?', a: 'No, once we get them, we store them in our database, and delete them once deadline has passed' },
      { q: 'This is a filler question that I am using', a: 'Ah yes this is a filler answer' },
      { q: "What happens if I don't meet the deadline?", a: 'We send your photo out to the person you specified.' },
      { q: 'is my cock enormous', a: 'yes of course i have big dick ' },
    ],
  }),

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
  .bigTitle{
    font-size: 100px;
  }

  .faqList{
    list-style: none;
  }
  .faqElement{
    font-size: 20px;
  }
  #row2{
    background-color: #c3efff;
    padding-bottom: 30px;
    /* grey color: #D3D3D3 */
  }
</style>
