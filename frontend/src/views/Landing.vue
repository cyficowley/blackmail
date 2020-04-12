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
        <v-row id="row2" class='text-left'>
          <div style="width:70vw; margin:0 auto;">
            <h1 class="text-left bigTitle">FAQ</h1>
                <v-expansion-panels accordion multiple>
                  <v-expansion-panel style = "background-color: #F6F6F6"
                  v-for="question in questions" :key="question.q">
                    <v-expansion-panel-header><strong>{{ question.q }}</strong>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ question.a}}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
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
      { q: 'Do we ever look at your photos?', a: 'No, once we have them, we store them in our database, and delete them once you have submitted proof of completion of task, or the deadline has passed and we have sent the photo.' },
      { q: 'What kind of proof can I submit ', a: 'We except proof in the following formats: .jpg, .png, .pdf, .mp4, and .gif. The more important thing is that the proof clearly shows completiion of the task. ' },
      { q: "What happens if I don't meet the deadline?", a: 'We send the photo that you submitted out to the person you specified.' },
      { q: 'Is this legal?', a: "Honestly, we're not sure but we had you sign the terms and conditions when you sign up so I'm pretty sure that means you can't sue us." },
      { q: 'Is the email anonymous?', a: 'No, when we sent out your picture to the person you specified, we explain why they are getting that photo and who it came from. ' },
      { q: 'What kind of blackmail can I upload?', a: 'We accept photo or video blackmail with file type .pdf, .png, .jpeg, .mp4, .mov ' },
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
    padding-left: 20px;
  }

  .faqList{
    list-style: none;
  }

  #row2{
    background-color: #f4f4f4;
  }
  .cardQuestion{
    padding-left: 10px;
  }
  .cardAnswer{
      padding-left: 10px;
  }
</style>
