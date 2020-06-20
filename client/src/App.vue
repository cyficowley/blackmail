<template>
  <v-app id="app">
    <v-app-bar color="blue1">
      <v-row class="limit-width app-bar-row">
        <img id="app-bar-logo" src="./assets/logo.svg" @click="route('/')"/>

        <h1 id="app-bar-title" @click="route('/')">
          BLACKMAILER
        </h1>

        <v-btn text large color="light" class="font-weight-medium" to="/about">
          How it Works
        </v-btn>

        <v-spacer/>

        <v-btn
          v-if="currentUser == null"
          text
          large
          color="light"
          class="font-weight-medium"
          @click="loginRegister(1)">
          Login
        </v-btn>

        <v-btn
          v-if="currentUser == null"
          text
          large
          color="accent"
          class="font-weight-medium"
          @click="loginRegister(2)">
          Signup
        </v-btn>

        <v-btn
          v-if="currentUser != null"
          text
          large
          color="accent"
          class="font-weight-medium"
          @click="route('/home')">
          <v-icon left style="margin-right: 1rem;">
            mdi-home
          </v-icon>
          Home
        </v-btn>

        <v-btn
          v-if="currentUser != null"
          text
          large
          color="light"
          class="font-weight-medium"
          @click="route('/home')">
          Sign Out
        </v-btn>
      </v-row>
    </v-app-bar>

    <LoginRegister/>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer color="dark1" class="footer">
      <v-col>
        <p>
          &copy; 2020 Blackmailer.xyz
        </p>

        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdYiCTydQO68LIU5otXWmK1TB3f14wKVqQFkeqM6pmzGS5vCA/viewform?usp=sf_link">
          Feedback Form
        </a>

        <p>
          Created by Shane Folden, Cyrus Cowley and Andrew Young
        </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import LoginRegister from '@/components/modal/LoginRegister.vue';

export default {
  name: 'App',
  components: {
    LoginRegister,
  },
  methods: {
    route(path) {
      this.$router.push(path);
    },
    loginRegister(window) {
      this.$store.dispatch('updateLoginRegisterDialogue', window);
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    loginRegisterDialogue() {
      return this.$store.state.loginRegisterDialogue;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --blackmailer-light: #F2F2F2;
  --blackmailer-dark-1: #202225;
  --blackmailer-dark-2: #2F3136;
  --blackmailer-dark-3: #363941;
  --blackmailer-dark-4: #585C62;
  --blackmailer-dark-5: #72767D;
  --blackmailer-dark-6: #A6A7A8;
  --blackmailer-blue-1: #02244A;
  --blackmailer-blue-1-clear: #02244ACC;
  --blackmailer-blue-2: #164869;
  --blackmailer-blue-3: #8CE5F5;
  --blackmailer-blue-4: #55BDCA;
  --accent: #DF622C;

}

#app {
  background-color: rgba(0,0,0,0) !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6{
  color: var(--blackmailer-light);
  font-family: 'Poppins', sans-serif;
}

.v-app-bar .v-toolbar__content {
  justify-content: center;
}

.app-bar-row {
  align-items: center;
  padding: 0 12px;
}

#app-bar-title {
  color: var(--blackmailer-light);
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin: 0 24px 0 12px;
}

#app-bar-logo {
  --size: 35;
  cursor: pointer;
  height: calc(var(--size) * 1px);
  width: calc(var(--size) * 1px);
}

.footer p {
  color: rgba(255,255,255,.6);
  margin: 4px 0px !important;
  text-align: center;
  white-space: nowrap;
}

.footer a {
  color: rgba(255,255,255,.6) !important;
  display: block;
  margin: 6px 0px;
  text-align: center;
  width: 100%;
  white-space: nowrap;
}

.limit-width {
  max-width: 1088px;
}

.center {
  margin: 0 auto;
}

.flex-justify-center {
  justify-content: center;
}

.v-app-bar.v-toolbar {
  flex: none;
}
</style>
