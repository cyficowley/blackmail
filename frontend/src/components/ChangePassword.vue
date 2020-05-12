<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <h1>Reset Password</h1>
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

      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="reset">
        Reset Password
      </v-btn>


    </v-form>
    <transition name="fade">
      <div v-if="errorMsg !== ''">
        <p style="color:red; padding-top:10px;">{{ errorMsg }}</p>
      </div>
    </transition>
     <v-snackbar
             v-model="success"
            :timeout="timeout"
            color="green"
            top
      >Password recovery email sent.</v-snackbar>
  </div>
</template>

<script>
const fb = require('../plugins/firebase');


export default {
  name: 'Change',

  data: () => ({
    show: false,
    success: false,
    password: '',
    passwordConfirm: '',
    valid: true,
    errorMsg: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
  }),

  created() {
    this.timeout = 3000;
    this.urlCode = this.getUrlVal('oobCode');
    console.log(this.urlCode);
  },

  methods: {
    match(v) {
      if (v !== this.password) {
        return 'passwords must match';
      }
      return true;
    },

    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },

    async reset() {
      try {
        await fb.auth.confirmPasswordReset(this.urlCode, this.password);
        this.success = true;
        this.$router.push('/?snackbar=pwreset');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>

  h1{
    text-align: left;
  }
</style>
