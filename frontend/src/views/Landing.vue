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
              More Questions? Email us!/</a>
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
  .fullwindow{
    height: 100%;
    background-color:lightcyan;
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
