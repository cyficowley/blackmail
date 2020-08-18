<template>
  <v-dialog
    :value="loginRegisterDialogue"
    max-width="430px"
    width="95%"
    @click:outside="close">
    <v-card>
      <v-card-title
        class="headline"
        :class="$style.title">
        {{title}}
      </v-card-title>

      <v-btn
        :class="$style['google-button']"
        height="50px"
        color="accent"
        dark
        @click="googleLogin">
        <v-icon
          :class="$style.icon"
          left>
          mdi-google
        </v-icon>
        Continue with Google
      </v-btn>

      <div :class="$style.separator">
        <v-divider/>

        <p :class="$style.or">
          OR
        </p>

        <v-divider/>
      </div>

      <v-card-text>
        <v-form
          v-model="valid"
          ref="form"
          lazy-validation>
          <v-text-field
            v-model.trim="email"
            class="margin-less"
            ref="email"
            color="#DF622C"
            label="Email"
            :rules="rules.emailText"
            dense
            single-line
            outlined
            required>
          </v-text-field>

          <div :class="$style['forgot-password']">
            <v-btn
              v-if="loginRegisterDialogue == 1"
              text
              small
              @click="forgotPassword">
              Forgot Password
            </v-btn>
          </div>

          <v-text-field
            v-model.trim="password"
            ref="password"
            label="Password"
            color="#DF622C"
            hint="At least 8 characters"
            :rules="[rules.min]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            dense
            single-line
            required
            outlined
            @click:append="showPassword = !showPassword">
          </v-text-field>

          <v-text-field
            v-if="loginRegisterDialogue == 2"
            v-model="confirmPass"
            ref="confirm"
            label="Confirm Password"
            color="#DF622C"
            :error-messages="invalidPasswords ? 'Passwords must match.' : ''"
            :type="showPassword ? 'text' : 'password'"
            dense
            single-line
            outlined>
          </v-text-field>

          <p>
            {{errorMsg}}
          </p>

          <div :class="$style.buttons">
            <v-btn
              :disabled="!validSubmit"
              color="accent"
              width="175px"
              outlined
              @click="submit">
              {{action}}
            </v-btn>

            <v-btn
              width="175px"
              outlined
              @click="switchType" >
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

<style>
div.v-input.v-text-field {
  margin: 0rem 0 1rem;
}

div.v-input.v-text-field.margin-less {
  margin: 1rem 0 0rem;
}
</style>

<style module>
.title {
  display: block;
  color: var(--accent);
  text-align: center;
  padding: 1.5rem 0 0;
  width: 100%;
}

.google-button {
  margin: 24px;
  width: calc(100% - 48px);
}

.google-button .icon {
  margin-right: 1rem;
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

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.forgot-password {
  display: flex;
  justify-content: flex-end;
}
</style>
