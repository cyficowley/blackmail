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
  .fullwindow{
    height: 100%;
    background-color:lightcyan;
  }
</style>
