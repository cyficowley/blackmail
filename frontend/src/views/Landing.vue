<template>
  <v-app id="landing">
    <v-content>
      <v-container fluid class="fullwindow">
        <v-row class="fullwindow">
          <v-col cols="4">
            <h1>Blackmail</h1>
            <h3>No one can motivate you better than you</h3>
            <v-card>
              <ul>
                <li>one click sign up</li>
                <li>easy motivation</li>
                <li>yes yes good</li>
              </ul>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-btn style="position:absolute; top:90vh;"
              align-bottom @click="$vuetify.goTo('#row2', {duration:800})">
              More Questions?
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-card>
              <Login/>
              <Signup/>
            </v-card>
          </v-col>
        </v-row>
        <v-row id="row2" class = 'text-left'>
            <h1 class="text-left bigTitle">FAQ</h1>
                <v-expansion-panels accordion multiple>
                  <v-expansion-panel v-for="question in questions" :key="question.q">
                    <v-expansion-panel-header><strong>{{ question.q }}</strong>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ question.a}}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
            <a class="emailLink" ref = "mailto: footballshane@gmail.com">
              More Questions? Email us!</a>
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
  .fullwindow{
    height: 100vh;
    background-color:lightcyan;
  }
  .bigTitle{
    font-size: 100px;
    padding-left: 20px;
  }

  .faqList{
    list-style: none;
  }

  #row2{
    background-color: #c3efff;
    /* grey color: #D3D3D3 */
  }
  .cardQuestion{
    padding-left: 10px;
  }
  .cardAnswer{
      padding-left: 10px;
  }
  .emailLink{
    padding-top: 50px;
    padding-left: 10px;
    padding-bottom: 30px;
  }
</style>
