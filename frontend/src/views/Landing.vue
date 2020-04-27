
<template>
  <v-app id="landing">
    <v-content>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <v-row id="landing-row" class="fullwindow">
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">
              <v-card class="">
                <h1 id="header-desktop">BLACKMAIL</h1>
                <h1 id="header-mobile">BLACKMAIL</h1>
                <p id="tagline">Necessity is the mother of invention</p>
                <p id="tagpara">
                  You have a goal.  You can't make yourself do it. <br/><br/>
                  Find an embarrasing file and someone you would never want to see it.<br/><br/>
                  Upload proof that you completed your goal by your deadline or we send the file.
                </p>
              </v-card>
            </div>
          </v-col>
          <v-col class="forward d-none d-md-inline" md="4">
            <div style="height:0px;">
              <v-btn style="top:90vh;" class="d-none d-md-inline accent-1"
                @click="$vuetify.goTo('#row2', {duration:800})">
                More Questions?
              </v-btn>
            </div>
            <v-row>
              <img src="../assets/landingGirl.svg" style="width:100%; padding-top:80px;">
            </v-row>
          </v-col>
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">
              <v-card class="" style="padding:20px; text-align:left">
                <Signup/>
                <v-divider style="margin:10px;"/>
                <Login/>
              </v-card>
            </div>
          </v-col>

          <div class="stripe2">
          </div>
          <div class="stripe">
          </div>
        </v-row>
        <v-row id="row2" class='forward light-2'>
          <v-container>
            <v-row>
              <h1 class="bigTitle">WORKFLOW</h1>
            </v-row>
            <v-row>
              <v-col class="forward" cols="12" md="4">
                FIND A FRINED
              </v-col>
              <v-col class="forward" cols="12" md="4">
                dabba
              </v-col>
              <v-col class="forward" cols="12" md="4">
                do
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row class='forward text-left light-2'>
          <div id="faq-container">
            <h1 class="text-left bigTitle">FAQ</h1>
            <v-expansion-panels accordion multiple>
              <v-expansion-panel class="light-1"
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

document.body.style.backgroundColor = '#303C6C';

export default {
  name: 'Landing',

  created() {
    this.questions = [
      {
        q: 'How much will you email me?',
        a: 'We will never email you, only the recipients of your blackmail',
      },
      {
        q: 'Do we ever look at your photos?',
        a: 'No, they are deleted immediatly once your proof has been aproved or the deadline has passed, and are never viewed by our approvers',
      },
      {
        q: 'What kind of proof can I submit?',
        a: 'We except proof in the following formats: .jpg, .png, .pdf, .mp4, and .gif. The most important thing is that the proof clearly shows completiion of the task',
      },
      {
        q: 'Who approves the proof?',
        a: 'Shane or I are the only approvers',
      },
      {
        q: 'What happens if I don\'t meet the deadline?',
        a: 'We send the photo that you submitted out to the person you specified',
      },
      {
        q: 'Is blackmail email anonymous?',
        a: 'No, we explain why they are getting that photo and what email it came from',
      },
      {
        q: 'What kind of blackmail can I upload?',
        a: 'Whatever type of nonexecutable file you want',
      },
      {
        q: 'Does the recipient need to be registered at blackmail.io?',
        a: 'No, you can enter the email of anyone you know',
      },
    ];
  },

  components: {
    Login,
    Signup,

  },
};

</script>

<style scoped>
  .fullwindow{
    padding-top:0;
    padding-bottom:0;
    height: 100vh;
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
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
  }
  #header-desktop{
    font-size: 6em;
    font-weight: 600;
  }
  #header-mobile{
    font-size: 3em;
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
  .bigTitle{
    font-size: 100px;
    padding-left: 20px;
  }

  #faq-container{
    width:70vw;
    margin:0 auto;
  }

  .faqList{
    list-style: none;
  }

  .cardQuestion{
    padding-left: 10px;
  }
  .cardAnswer{
    padding-left: 10px;
  }
  @media only screen and (max-width: 1850px) {
    #header-desktop{
      font-size: 5em;
    }
  }
  @media only screen and (max-width: 1536px) {
    #header-desktop{
      font-size: 4em;
    }
    #tagpara{
      font-size: 1.2em;
    }
  }
  @media only screen and (max-width: 1263px) {
    .fullwindow{
      height:auto !important;
      position: relative;
    }
    #header-desktop{
      display: none;
    }
    #header-mobile{
      display: inline;
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
</style>
