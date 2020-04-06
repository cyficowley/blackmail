<template>

  <v-app id="landing">
    <v-content>
      <v-container class="fill-height" fluid>
        <Login/>
        <Signup/>
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
