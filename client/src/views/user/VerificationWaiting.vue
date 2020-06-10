<template>
  <div class="VerificationWaiting">
    <StripedTransition
      :start="transitionColors.start"
      :middle="transitionColors.middle"
      :end="transitionColors.end">
      <div slot="content" class="info-content">
        <v-card max-width="400px" width="calc(90% - 1rem)" class="info-card" color="accent" dark>
          <v-card-title class="headline" id="title">
            Please Verify your Email
          </v-card-title>

          <v-card-text>
            To continue please verify your email.
            If you have already verified your email, please refresh this page.
          </v-card-text>

          <v-card-actions>
            <v-btn @click="resend" outlined class="resend-button">
              Resend Email
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </StripedTransition>
  </div>
</template>

<script>
import StripedTransition from '@/components/misc/StripedTransition.vue';

const fb = require('../../plugins/firebase').default;

export default {
  name: 'VerificationWaiting',
  components: {
    StripedTransition,
  },
  data: () => ({
    transitionColors: {
      start: {
        r: 2,
        g: 36,
        b: 74,
      },
      middle: {
        r: 140,
        g: 229,
        b: 245,
      },
      end: {
        r: 85,
        g: 189,
        b: 202,
      },
    },
  }),
  methods: {
    async resend() {
      try {
        await fb.auth().currentUser.sendEmailVerification();
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>

<style scoped>
.info-content {
  height: calc(100vh - 24px);
}

.info-card {
  margin: 5% auto;
  padding: .5rem 0;
}

.resend-button {
  margin: .5rem auto;
}
</style>
