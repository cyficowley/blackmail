<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1>Forgot Password?</h1>
      <h3>Enter your email to receive a password reset link</h3>

      <v-row>
        <v-col>
          <v-text-field v-model.trim="email" :rules="rules.emailText"
          label="E-mail" required></v-text-field>
        </v-col>
      </v-row>
      <v-row style="padding-left: 10px;">
        <v-btn v-if="resetting" disabled color="primary" class="mr-4">Resetting</v-btn>
        <v-btn v-else :disabled="!valid" color="primary" class="mr-4" @click="submit">Reset</v-btn>
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
    resetting: false,
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
    async forgotPassword() {
      this.resetting = true;
      try {
        await fb.auth.sendPasswordResetEmail(this.email);
        this.resetting = false;
      } catch (err) {
        this.resetting = false;
        this.email = '';
        this.errorMsg = err.message;
        console.log(err);
      }
    },

    submit() {
      this.forgotPassword();
    },
  },
};
</script>
