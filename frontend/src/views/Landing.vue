
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
              <v-col class="forward" cols="12" md="10">
                <v-card class="workflow white">
                  <h1>Free motivation</h1>
                  <ol>
                    <li>
                      Take your goal and decide when you want it done by.
                    </li>
                    <li>
                      Go out and find some sort of embarrasing file.
                    </li>
                    <li>
                      Find someone you'd never want to see the file.
                    </li>
                    <li>
                      Describe how you would prove that you finished your goal in an image.
                    </li>
                  </ol>
                  <h2>Examples:</h2>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card outlined>
                        <v-card-text>
                          <h2>
                            You haven't cleaned your room in a month
                          </h2>
                          <table>
                            <tr>
                              <td style="padding-right:10px;">Goal:</td>
                              <td>Clean room</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Blackmail Material:</td>
                              <td>A picture of yourself in your disgusting room</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Recipient:</td>
                              <td>Your mother</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Proof description:</td>
                              <td>A picture of me in my clean room</td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card outlined>
                        <v-card-text>
                          <h2>
                            You haven't started your lab report
                          </h2>
                          <table>
                            <tr>
                              <td style="padding-right:10px;">Goal:</td>
                              <td>Finish hypothesis and materials section by 3 days</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Blackmail Material:</td>
                              <td>A text file saying what you actually think about biology
                                  and your teacher</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Recipient:</td>
                              <td>Your teacher</td>
                            </tr>
                            <tr>
                              <td style="padding-right:10px;">Proof description:</td>
                              <td>A picture of a completed hypothesis and materials section</td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <p>
                    Once you have these you can upload to our platform and instantly be
                    motivated by terror.
                  </p>
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col class="forward" cols="12" md="10">
                <v-card class="workflow white">
                  <h1>Completing your goal</h1>
                  <p>
                    With your newfound motivation you can go out and finish your goal.<br/>
                    If at any time you forget your goals you can
                    come back here and view them all.<br/>

                    Once you have finished your goal you come back here and upload your proof.<br/>
                    At which point it will be sent off to our approvers to validate that you have
                    successfully been motivated and completed your goal.<br/>
                  </p>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="forward" cols="12" md="10">
                <v-card class="workflow white">
                  <h1>Consequences</h1>
                  <p>
                    We will validate with relative leniancy,
                    we are trying to motivate you not screw you over.<br/>
                    However if your proof doesn't seem to match your description it will be rejected
                    and you will have to fix and reupload it.<br/>

                    If you finish your goal, congragulations! You broke through your motivation!

                    However if not your recipient will get an email looking something like this...
                  </p>
                  <img src="../assets/email.png">
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
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

  .workflow{
    padding: 10px;
    text-align: left;
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
