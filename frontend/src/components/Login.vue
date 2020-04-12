<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h1>Login</h1>

      <v-row>
        <v-col>
          <v-text-field
            v-model.trim="email"
            :rules="rules.emailText"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
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
      </v-row>

      <v-btn v-if="loggingIn"
        disabled
        color="primary"
        class="mr-4"
      >
        Logging In
      </v-btn>

      <v-btn v-else
        :disabled="!valid"
        color="primary"
        class="mr-4"
        @click="submit"
      >
        Login
      </v-btn>
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
    loggingIn: false,
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

    async login() {
      this.loggingIn = true;
      const { email, password } = this;

      try {
        const user = await fb.auth.signInWithEmailAndPassword(email, password);
        this.loggingIn = false;
        this.$store.commit('setCurrentUser', user.user);
        this.$router.push('/home');
      } catch (err) {
        this.loggingIn = false;
        this.email = '';
        this.password = '';
        this.errorMsg = err.message;
        console.log(err);
      }
    },

    submit() {
      this.login();
    },
  },
};
</script>
