<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <h1>Sign up with email</h1>

    <v-text-field
      v-model="email"
      :rules="rules.emailText"
      label="E-mail"
      required
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
          v-model="password"
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
          v-model="passwordConfirm"
          @click:append="show = !show">
        </v-text-field>
      </v-col>
    </v-row>

    <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">
      Sign up
    </v-btn>

    <h1 style="padding-top:20px;">or social media</h1>

    <v-row>
      <v-col>
        <img width="100%" src="../assets/signingoogle.png">
      </v-col>
      <v-col>
        <img width="100%" src="../assets/facebook.png">
      </v-col>
    </v-row>


  </v-form>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
    show: false,
    email: '',
    password: '',
    passwordConfirm: '',
    valid: true,
    rules: {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      //
    },
  }),

  methods: {
    match(v) {
      if (v !== this.password) {
        return 'passwords must match';
      }
      return true;
    },


    submit() {
    },
  },
};
</script>

<style scoped>
  h1{
    text-align: left;
  }
</style>
