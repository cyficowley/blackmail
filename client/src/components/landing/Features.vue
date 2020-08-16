<template>
  <div :class="$style.component">
    <v-card
      color="blue1"
      elevation="0"
      :class="[$style.step, $style.left]">
      <div :class="$style.text">
        <h1 :class="$style.title">
          Choose a Goal
        </h1>

        <p :class="$style.description">
          Determine a goal you need help finding motivation to complete.
          This can be related to anything: work, school, health, etc.
        </p>

        <p :class="$style.description">
          Your goal needs to be proveable upon completion.
        </p>
      </div>

      <choose-goal />
    </v-card>

    <v-card
      color="blue1"
      elevation="0"
      :class="[$style.step, $style.right]">
      <prepare-blackmail />

      <div :class="$style.text">
        <h1 :class="$style.title">
          Prepare your Blackmail
        </h1>

        <p :class="$style.description">
          Find an embarassing image, dark secret or confidential file.
        </p>

        <p :class="$style.description">
          Upload it to Blackmailer and provide the email address
          of the worst person it could be sent to.
        </p>
      </div>
    </v-card>

    <v-card
      color="blue1"
      elevation="0"
      :class="[$style.step, $style.left]">
      <div :class="$style.text">
        <h1 :class="$style.title">
          Upload Proof before Deadline
        </h1>

        <p :class="$style.description">
          Submit proof of the completion of your goal for review, before your self set deadline.
          Or your blackmail will be sent.
        </p>
      </div>

      <upload-proof />
    </v-card>
  </div>
</template>

<script>
import ChooseGoal from '@/components/landing/examples/ChooseGoal.vue';
import PrepareBlackmail from '@/components/landing/examples/PrepareBlackmail.vue';
import UploadProof from '@/components/landing/examples/UploadProof.vue';

export default {
  name: 'Features',
  components: {
    ChooseGoal,
    PrepareBlackmail,
    UploadProof,
  },
};
</script>

<style module>
.component {
  background-color: var(--dark);
  padding: 40px 0 3rem;
}

.step {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 4rem;
}

.step.right {
  flex-wrap: wrap-reverse;
}

.step.left {
  flex-wrap: wrap;
}

.step .text {
  max-width: 600px;
  padding: 12px;
  margin: 0 5% 2rem 5%;
}

.step .text .title {
  font-size: 2.2rem;
  color: var(--accent);
  text-align: left;
  margin: 0 0 1rem 0;
}

.step .text .description {
  color: rgba(255, 255, 255, 0.884);
  font-size: 1.25rem;
  line-height: 2rem;
  text-align: left;
  font-weight: lighter !important;
}

/* Adjusting for Medium Screen Sizes */
@media only screen and (max-width: 1200px) {
  .step {
    padding: 5rem 1rem;
  }

  .step .text .title {
    font-size: 2rem;
  }

  .step .text .description {
    font-size: 1.1rem;
    line-height: 1.7rem;
  }
}

/* Adjusting for Small Screen Sizes */
@media only screen and (max-width: 840px) {
  .step {
    display: flex;
    padding: 5rem 1rem;
  }

  .step .text .title {
    font-size: 1.6rem;
  }

  .step .text .description {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>
