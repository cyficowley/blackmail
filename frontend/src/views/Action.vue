<template>
  <v-app id="landing">
    <v-content>
      <v-container fluid class="fullwindow" style="z-index:0;">
        <v-row id="landing-row" class="fullwindow">
          <v-col class="forward colParent" cols="12" md="4">
            <h1 v-if="verifyMode">VERIFYING  EMAIL1</h1>
            <div v-else class="title-card">
              <v-card class="card" style="padding:20px;text-align:left">
                <ChangePassword/>
              </v-card>
            </div>
          </v-col>

          <div class="stripe2"></div>
          <div class="stripe"></div>
        </v-row>
        <v-row id="row2" class="forward light-2">
          <v-container>
            <v-row>
              <v-col class="forward" cols="12" xl="10"></v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-row>
       <Footer/>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
// @ is an alias to /src
import ChangePassword from '@/components/ChangePassword.vue';
import Footer from '@/components/Footer.vue';

const fb = require('../plugins/firebase');

document.body.style.backgroundColor = '#303C6C';

export default {
  name: 'Action',

  data: () => ({
    verifyMode: false,
  }),

  components: {
    ChangePassword,
    Footer,
  },

  created() {
    this.mode = this.getUrlVal('mode');
    if (this.mode === 'verifyEmail') {
      this.verifyMode = true;
      this.verify();
    }
  },

  methods: {

    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },

    async verify() {
      console.log('verifying');
      try {
        this.urlCode = this.getUrlVal('oobCode');
        await fb.auth.applyActionCode(this.urlCode);
        await fb.auth.currentUser.reload();
        this.$store.commit('setCurrentUser', fb.auth.currentUser);
        console.log(this.$store.state.currentUser);
        console.log(fb.auth.currentUser);
        this.$router.push('/home');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },
  },

};
</script>

<style scoped>
.fullwindow {
  padding-top: 0;
  padding-bottom: 0;
  height: 100vh;
}

.title-card {
  padding: 20px;
  padding-top: 80px;
  margin-left: auto;
  margin-right: auto;
}

.stripe {
  width: 100vw;
  height: 50vh;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right bottom,
    rgba(0, 0, 0, 0) 50%,
    var(--light-2) 50%
  );
}
.stripe2 {
  width: 70vw;
  height: 70vh;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    to left bottom,
    rgba(0, 0, 0, 0) 50%,
    var(--light-1) 50%
  );
}
.forward {
  z-index: 2;
}

#landing-row {
  background-image: linear-gradient(to bottom, var(--dark-1), var(--dark-2));
  /* background-image: url("../assets/landing.jpg");
    background-size: cover; */
}
.bigTitle {
  font-size: 100px;
  padding-left: 20px;
}

p {
  color: black;
  font-size: 1.2em;
}
.colParent {
  margin: 0 auto;
}

@media only screen and (max-width: 1263px) {
  .fullwindow {
    height: auto !important;
    position: relative;
  }

  .title-card {
    padding: 10px;
  }
}
</style>
