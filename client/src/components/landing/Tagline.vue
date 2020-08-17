<template>
  <div :class="$style.component">
    <div :class="$style.text">
      <h1 :class="$style.title">
        Incentivize Yourself to Complete Tasks
      </h1>

      <p :class="$style.description">
        Blackmail yourself into achieving goals you can't find the motivation to complete.
      </p>

      <v-row>
        <v-btn
          class="font-weight-medium"
          color="accent"
          :class="$style.action"
          @click="getStarted">
          Get Started
        </v-btn>
      </v-row>
    </div>

    <img
      src="@/assets/landingGirl.svg"
      :class="$style.art">
  </div>
</template>

<script>
export default {
  name: 'Tagline',
  methods: {
    getStarted() {
      if (this.currentUser) {
        this.$router.push('/home');
      } else {
        this.$store.dispatch('updateLoginRegisterDialogue', window);
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style module>
.component {
  display: flex;
  flex-wrap: warp;
  align-items: center;
  padding: 3rem 3rem 4rem 3rem;
  justify-content: center;
  height: calc(100vh - 64px);
}

.text {
  max-width: 550px;
  padding-bottom: 20%;
}

.title {
  text-align: left;
  font-size: 2.7rem;
  line-height: 3rem;
  font-weight: 400;
  margin-bottom: 12px;
}

.description {
  text-align: left;
  font-size: 1.5rem;
  color: var(--accent);
  font-weight: 400;
}

.art {
  --size: 40;
  width: calc(var(--size) * 1vw);
}

.action {
  margin: .5rem 0 0 .75rem;
}

/* Adjusting for Medium Screen Sizes */
@media only screen and (max-width: 1200px) {
  .text {
    max-width: 440px;
  }

  .title {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  .description {
    text-align: left;
    font-size: 1.2rem;
    color: var(--accent);
    font-weight: 400;
  }

  .art {
    --size: 40;
  }
}

/* Adjusting for Small Screen Sizes */
@media only screen and (max-width: 840px) {
  .component {
    display: block;
    padding: 3rem 3rem 1rem 3rem;
  }

  .text {
    max-width: 100%;
    padding-bottom: 0%;
  }

  .title {
    font-size: 1.75rem;
    line-height: 2.5rem;
  }

  .description {
    text-align: left;
    font-size: 1.2rem;
    color: var(--accent);
    font-weight: 400;
  }

  .art {
    --size: 75;
    transform: translateY(-2.5rem) translateX(1.5rem);
  }
}
</style>
