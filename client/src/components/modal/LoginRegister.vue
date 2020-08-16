<template>
  <v-dialog
    class="LoginRegister"
    :value="loginRegisterDialogue"
    max-width="430px"
    width="95%"
    @click:outside="close">
    <v-card color="">
      <v-card-title class="headline" id="title">
        {{title}}
      </v-card-title>

      <v-btn
        @click="googleLogin"
        class="google-button"
        height="50px"
        dark
        color="accent">
        <v-icon left style="margin-right: 1rem;">
          mdi-google
        </v-icon>
        Continue with Google
      </v-btn>

      <div class="separator">
        <v-divider/>
        <p class="or">OR</p>
        <v-divider/>
      </div>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-text-field
            v-model.trim="email"
            :rules="rules.emailText"
            class="margin-less"
            ref="email"
            dense
            single-line
            outlined
            color="#DF622C"
            required
            label="Email">
          </v-text-field>

          <div class="forgot-password-wrapper">
            <v-btn text small @click="forgotPassword" v-if="loginRegisterDialogue == 1" >
              Forgot Password
            </v-btn>
          </div>

          <v-text-field
            v-model.trim="password"
            dense
            single-line
            ref="password"
            required
            outlined
            label="Password"
            color="#DF622C"
            :rules="[rules.min]"
            hint="At least 8 characters"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword">
          </v-text-field>

          <v-text-field
            v-if="loginRegisterDialogue == 2"
            v-model="confirmPass"
            dense
            single-line
            ref="confirm"
            outlined
            label="Confirm Password"
            color="#DF622C"
            :error-messages="invalidPasswords ? 'Passwords must match.' : ''"
            :type="showPassword ? 'text' : 'password'">
          </v-text-field>

          <p>{{errorMsg}}</p>

          <div class="buttons">
            <v-btn outlined color="accent" width="175px" @click="submit"
            :disabled="!validSubmit">
              {{action}}
            </v-btn>

            <v-btn outlined @click="switchType" width="175px">
              {{switchTitle}}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import fb from '@/plugins/firebase';

export default {
  name: 'LoginRegister',
  data: () => ({
    valid: true,
    showPassword: false,
    email: '',
    password: '',
    confirmPass: '',
    errorMsg: '',
    rules: {
      emailText: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
  }),
  methods: {
    close() {
      this.$store.dispatch('updateLoginRegisterDialogue', 0);
    },
    switchType() {
      this.$store.dispatch('updateLoginRegisterDialogue', this.loginRegisterDialogue === 1 ? 2 : 1);
    },
    forgotPassword() {
      this.$store.dispatch('updateLoginRegisterDialogue', 0);
      this.$router.push('/reset');
    },
    async googleLogin() {
      const provider = await fb.provider();
      fb.auth().signInWithPopup(provider).then((result) => {
        const { user } = result;
        this.$store.commit('setCurrentUser', user.user);
        this.$router.push('/home');
      }).catch((error) => {
        console.log(error);
      });
    },
    async submit() {
      if (this.validSubmit) {
        if (this.loginRegisterDialogue === 1) {
          this.login();
        } else if (this.loginRegisterDialogue === 2) {
          this.signup();
        }
      }
    },
    async signup() {
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(this.email, this.password);
        this.$store.commit('setCurrentUser', user.user);
        await fb.auth().currentUser.sendEmailVerification();
        this.$router.push('/verificationWaiting');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },
    async login() {
      try {
        const user = await fb.auth().signInWithEmailAndPassword(this.email, this.password);
        this.$store.commit('setCurrentUser', user.user);
        this.$router.push('/home');
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },
  },
  computed: {
    loginRegisterDialogue() {
      return this.$store.state.loginRegisterDialogue;
    },
    title() {
      return this.loginRegisterDialogue === 1 ? 'Welcome Back' : 'Welcome to Blackmailer';
    },
    action() {
      return this.loginRegisterDialogue === 1 ? 'Login' : 'Sign Up';
    },
    switchTitle() {
      return this.loginRegisterDialogue === 1 ? 'Sign Up Instead' : 'Login Instead';
    },
    invalidPasswords() {
      if (this.loginRegisterDialogue === 2 && this.password !== '' && this.confirmPass !== '' && this.confirmPass !== this.password) {
        return true;
      }
      return false;
    },
    validSubmit() {
      return this.valid
        && this.password.length
        && this.email.length
        && (this.loginRegisterDialogue !== 2
          || (this.confirmPass.length
            && this.confirmPass === this.password));
    },
  },
};
</script>

<style scoped>
#title.headline {
  display: block;
  color: var(--accent);
  text-align: center;
  padding: 1.5rem 0 0;
  width: 100%;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.separator {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .5rem 1rem 1.5rem;
}

.separator .v-divider {
  padding: 0 0rem;
  width: calc((100% - 100px) / 2);
  flex: none;
}

.separator p {
  margin: 0;
  color: rgba(0, 0, 0, 0.329);
}

.google-button {
  margin: 24px;
  width: calc(100% - 48px);
}

div.v-input.v-text-field {
  margin: 0rem 0 1rem;
}

div.v-input.v-text-field.margin-less {
  margin: 1rem 0 0rem;
}

.forgot-password-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
