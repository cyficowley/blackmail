
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
                More Questions?
              </v-btn>
            </div>
            <v-row>
              <img src="../assets/landingGirl.svg" style="width:100%; padding-top:80px;">
            </v-row>
          </v-col>
          <v-col class="forward" cols="12" md="4">
            <div class="title-card">
              <v-card class="" style="padding:20px 20px 10px 20px; text-align:left">
                <Signup/>
                <v-divider style="margin:10px;"/>
                <Login/>
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
          <v-container>
            <v-row>
              <h1 class="bigTitle">HOW IT WORKS</h1>
            </v-row>
            <v-row>
              <v-col class="forward" cols="12" xl="10">
                <v-card class="workflow white">
                  <v-row>
                    <v-col md="6" cols="12">
                      <h1>Find your goal</h1>
                      <p style="font-size: 22px;">
                        Come up with a task that you want to complete.
                        This can be related to anything: Work, school, or personal life.
                        <br/>
                        <br/>
                        Once you have a goal in mind,
                        describe how you would upload proof of its completion.
                        Then choose the image you want to blackmail yourself with,
                        and the potential recipient.

                      </p>
                      <p style="font-size: 22px;">

                      </p>

                    </v-col>
                    <v-col md="6" cols="12">
                      <h1>Example</h1>
                      <v-card outlined class="gray">
                        <v-card-text>
                          <h2 style="padding-bottom:10px">
                            You need to finish your math homework by next Tuesday.
                          </h2>
                          <table>
                            <tr>
                              <td class="table-cell">
                                Goal:
                              </td>
                              <td>Finish Math Homework</td>
                            </tr>
                            <tr>
                              <td class="table-cell">
                                Blackmail Material:
                              </td>
                              <td>An embarassing selfie you took last weekend</td>
                            </tr>
                            <tr>
                              <td class="table-cell">
                                Recipient:
                              </td>
                              <td>Your ex that you haven't spoken to in 2 and a half months</td>
                            </tr>
                            <tr>
                              <td class="table-cell">
                                Proof description:
                              </td>
                              <td>A picture of your fully completed math homework</td>
                            </tr>
                          </table>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col class="forward" cols="12" xl="10">
                <v-card class="workflow white">
                  <h1>Complete your goal</h1>

                  <Deadline class="dark-1"
                    name="Finish Math Homework"
                    :dueStamp="this.exampleDate"
                    proofDescription="A picture of your fully completed math homework"
                    recipient="WhyDidYouLeaveMe@aol.com"
                    status="Incomplete"
                    disabled
                    />
                  <p style="padding-top: 20px; font-size: 22px;">
                    Once you have an uploaded deadline, it will have a status of 'Incomplete'.
                    To change this, upload proof of completion that matches your proof description.
                    This will change the status to 'Pending'.
                  </p>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="forward" cols="12" xl="10">
                <v-card class="workflow white">
                  <h1>Validate your goal</h1>
                  <v-row>
                    <v-col cols="3" clas="d-none d-md-inline">
                      <img src="../assets/email.png" id="email-pic"
                      @click="show" style="width:100%; cursor: pointer;">
                    </v-col>
                    <v-col cols="12" class="d-none d-md-none">
                      <img src="../assets/email.png" style="width:100%" id="email-pic">
                    </v-col>
                    <v-col cols="12" md="9">
                      <p style="font-size: 22px;">
                        We will validate your proof within 24 hours. You will get an
                        email from us letting you know if it was 'Approved' or 'Rejected'
                        once we process it.
                        <br/>
                        <br/>
                        If your proof is rejected, you will have 24 hours to resubmit proof.
                        If you fail to resubmit proof, or miss your deadline altogether,
                        your deadline will receive the 'Blackmailed' status,
                        and your blackmail material
                        will be sent to your recipient.
                        <br/>
                        <br/>

                        We will be lenient in our validation, we are trying to motivate you,
                        not ruin your life. We are willing to work with you to ensure that
                        we accurately assess whether or not you have successfully completed
                        your goal. However, if it is obvious the goal has not ben completed,
                        your recipient will recieve an email like this.

                      </p>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-row>
        <v-row class='forward text-left light-2'>
          <div id="faq-container">
            <h1 class="text-left bigTitle">FAQ</h1>
            <v-card class="light-1" style="padding:20px;">
              <div v-for="question in questions" :key="question.q" style="margin-bottom:20px;">
                <p style="margin-bottom:5px;"><strong>{{question.q}}</strong></p>
                <p style="padding-left:15px;">{{question.a}}</p>
              </div>
            </v-card>

            <!-- <v-expansion-panels accordion multiple>
              <v-expansion-panel class="light-1"
              v-for="question in questions" :key="question.q">
                <v-expansion-panel-header><strong>{{ question.q }}</strong>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ question.a}}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels> -->
          </div>
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
import Deadline from '@/components/Deadline.vue';
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
        a: 'Shane or Cyrus are the only approvers',
      },
      {
        q: 'Is there any way to get out of it?',
        a: 'No, the only way to have your blackmail not be sent is to submit valid proof',
      },
      {
        q: 'Is blackmail email anonymous?',
        a: 'No, we explain why they are getting that photo and what email it came from. See the validate your goal section for an example',
      },
      {
        q: 'What kind of blackmail can I upload?',
        a: 'Whatever type of nonexecutable file you want',
      },
      {
        q: 'Does the recipient need to be registered at blackmailer.xyz?',
        a: 'No, you can enter the email of anyone you know',
      },
    ];
    this.exampleDate = new Date();
    this.exampleDate.setDate(this.exampleDate.getDate() + 3);
  },
  data: () => ({
    pwReset: false,
  }),

  methods: {
    show() {
      this.$modal.show('email-example');
    },
    hide() {
      this.$modal.hide('email-example');
    },

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
    Deadline,
    Google,
    Footer,
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

  .table-cell{
    padding-right:10px;
    color:rgba(0,0,0,.7)
  }

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
  .bigTitle{
    font-size: 100px;
    padding-left: 20px;
  }

  #faq-container{
    width:70vw;
    margin:0 auto;
    margin-bottom:20px;
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
    padding: 20px;
    text-align: left;
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
    .mobile-padded{
      padding-bottom:10px;
    }
    .bigTitle{
      font-size: 60px;
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
