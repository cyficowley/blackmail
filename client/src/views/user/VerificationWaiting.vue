<template>
  <div>
    <StripedTransition
      :start="transitionColors.start"
      :middle="transitionColors.middle"
      :end="transitionColors.end">
      <div
        slot="content"
        :class="$style['info-content']">
        <v-card
          width="calc(90% - 1rem)"
          max-width="400px"
          color="accent"
          :class="$style['info-card']"
          dark>
          <v-card-title class="headline">
            Please Verify your Email
          </v-card-title>

          <v-card-text>
            <p>
              To continue please verify your email.
            <p>

            <p>
              If you have already verified your email, please refresh this page.
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :class="$style['resend-button']"
              outlined
              @click="resend">
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
import fb from '@/plugins/firebase';

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

<style module>
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
