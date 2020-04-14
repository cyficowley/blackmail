<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h1>Sign up with email</h1>

      <v-text-field
        v-model.trim="email"
        :rules="rules.emailText"
        label="E-mail"
      ></v-text-field>
      <v-row>
        <v-col>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            name="input-10-2"
            hint="At least 8 characters"
            v-model.trim="password"
            @click:append="show = !show">
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, match]"
            :type="show ? 'text' : 'password'"
            label="Confirm Password"
            name="input-10-3"
            hint="Matches previous password"
            v-model.trim="passwordConfirm"
            @click:append="show = !show">
          </v-text-field>
        </v-col>
      </v-row>

      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
        Sign up
      </v-btn>

      <h1 style="padding-top:20px;">or social media</h1>

      <v-row>
        <v-col class="googleLoginSurround">
          <img class="googleLogin" width="100%"
            src="../assets/signingoogle.png" @click="googleLogin">
        </v-col>
      </v-row>


    </v-form>
    <transition name="fade">
      <div v-if="errorMsg !== ''">
        <p style="color:red; padding-top:10px;">{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
const fb = require('../plugins/firebase');


export default {
  name: 'Login',

  data: () => ({
    show: false,
    email: '',
    password: '',
    passwordConfirm: '',
    valid: true,
    errorMsg: '',
    rules: {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
  }),

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

    async signup() {
      try {
        const user = await fb.auth.createUserWithEmailAndPassword(this.email, this.password);
        this.$store.commit('setCurrentUser', user.user);
        this.$router.push('/home');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },

    submit() {
      this.signup();
    },
  },
};
</script>

<style scoped>
  .googleLogin{
    max-width: 300px;
  }

  .googleLoginSurround{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1{
    text-align: left;
  }
</style>
