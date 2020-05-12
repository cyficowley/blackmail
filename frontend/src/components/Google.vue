<template>

  <v-row>
    <v-col class="googleLoginSurround">
      <v-card id="googleButton" @click="googleLogin">
        <span class="icon"></span>
        <span class="buttonText">
          CONTINUE WITH GOOGLE
        </span>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
const fb = require('../plugins/firebase');


export default {
  name: 'Login',


  methods: {
    match(v) {
      if (v !== this.password) {
        return 'passwords must match';
      }
      return true;
    },

    googleLogin() {
      fb.auth.signInWithPopup(fb.provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        this.$store.commit('setCurrentUser', user.user);
        this.$router.push('/home');
      }).catch((error) => {
        console.log(error);
      });
    },

  },
};
</script>

<style scoped>

  .googleLoginSurround{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #googleButton {
    display: inline-block;
    background: white;
    width: 100%;
    white-space: nowrap;
    text-align:center;
  }
  #googleButton:hover {
    background: var(--gray);
    cursor: pointer;
  }
  span.label {
    font-family: serif;
    font-weight: normal;
  }
  span.icon {
    margin:20px;
    background: url('../assets/gogole.svg');
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
  }
  span.buttonText {
    margin:0 auto;
    display: inline-block;
    vertical-align: middle;
    text-align:center;
    font-size: 24px;
    font-weight: bold;
    color:rgba(0, 0, 0, 0.87);
    /* Use the Roboto font that is loaded in the <head> */
    font-family: 'Roboto', sans-serif;
  }

  @media only screen and (max-width: 1536px) {
    span.buttonText {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 1281px) {
    span.icon {
      margin:10px;
    }
  }
</style>
