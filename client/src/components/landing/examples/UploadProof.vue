<template>
  <v-card
    width="95%"
    max-width="330px"
    color="accent"
    :class="$style.component"
    raised>
    <h1
      v-if="!timerExpired"
      :class="$style.timer">
      {{timer}}
      <span>
        Seconds
      </span>
    </h1>

    <h3 v-if="!timerExpired">
      To eat fewer cup noodles
    </h3>

    <h1
      v-if="timerExpired"
      :class="[$style.pulse, $style.fail]">
      TASK FAILED
    </h1>

    <h3 v-if="timerExpired">
      You just blackmailed yourself.
    </h3>
  </v-card>
</template>

<script>
export default {
  name: 'UploadProof',
  data: () => ({
    timer: 30,
    timerInterval: null,
    timerExpired: false,
  }),
  methods: {
    countdown() {
      if (this.$route.name !== 'Landing') {
        clearInterval(this.timerInterval);
      } else {
        this.timer -= 1;
        if (this.timer === 0) {
          this.timer = 30;
          clearInterval(this.timerInterval);
          this.timerExpired = true;
          this.timerInterval = setInterval(this.resetTimer, 5000);
        }
      }
    },
    resetTimer() {
      this.timerExpired = false;
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(this.countdown, 1000);
    },
  },
  created() {
    this.timerInterval = setInterval(this.countdown, 1000);
  },
  destroyed() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  },
};
</script>

<style module>
.component {
  padding: 1rem 1rem 1rem .5rem;
  margin-bottom: 1rem;
}

.timer {
  text-align: center;
  font-size: 3rem;
  margin: 0;
}

.timer span {
  font-size: 2rem;
}

.component h3 {
  text-align: center;
}

.fail {
  text-align: center;
  font-size: 3rem;
  margin: 0;
}

.pulse {
  opacity: .8;
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0);
  animation: pulse-text 1s ease infinite;
}

@keyframes pulse-text {
  50% {
    opacity: 1;
    text-shadow: 2px 2px 5px rgba(255, 195, 195, 0.699);
  }
  100% {
    opacity: .8;
    text-shadow: 2px 2px 5px rgba(255, 109, 109, 0);
  }
}
</style>
