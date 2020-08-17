<template>
  <div
    class="limit-width"
    :class="$style.component">
    <h1 :class="$style.top">
      Privacy
    </h1>

    <v-expansion-panels
      accordion
      multiple
      dark>
      <v-expansion-panel
        v-for="question in privacy"
        class="light-1"
        :key="question.q">
        <v-expansion-panel-header color="accent">
          <span :class="$style.question">
            {{ question.q }}
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content style="text-align:left;">
          <span :class="$style.answer">
            {{ question.a}}
          </span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <h1>
      Usage
    </h1>

    <v-expansion-panels
      accordion
      multiple
      dark>
      <v-expansion-panel
        v-for="question in what"
        class="light-1"
        :key="question.q">
        <v-expansion-panel-header color="accent">
          <span :class="$style.question">
            {{ question.q }}
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content style="text-align:left;">
          <span :class="$style.answer">
            {{ question.a}}
          </span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <h1>
      Details
    </h1>

    <v-expansion-panels
      accordion
      multiple
      dark>
      <v-expansion-panel
        v-for="question in logistics"
        class="light-1"
        :key="question.q">
        <v-expansion-panel-header color="accent">
          <span :class="$style.question">
            {{ question.q }}
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content style="text-align:left;">
          <span :class="$style.answer">
            {{ question.a}}
          </span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  data: () => ({
    privacy: [
      {
        q: 'Do we ever look at your blackmail?',
        a: 'No, the files are not viewable by your approvers. They are encrypted the entire time they are stored. Furthermore, the files are deleted immediatly once your proof has been aproved, or the deadline has passed.',
      },
      {
        q: 'Is the blackmail email anonymous?',
        a: 'No, we explain to the recipient why they are getting the file. They are provided your name and the task you failed to complete.',
      },
      {
        q: 'Who approves the proof?',
        a: 'All proof is reviewed by our internal team.',
      },
    ],
    what: [
      {
        q: 'Is there any way to cancel a deadline?',
        a: 'No, the only way to cancel your deadline is to submit valid proof.',
      },
      {
        q: 'What happens if my proof gets rejected?',
        a: 'If your proof is rejected, you will have at least 24 hours from the time of rejection to re-upload valid proof. You will be notified via email.',
      },
      {
        q: 'Will you send me reminders?',
        a: 'We email you a reminder a day before your goal, and on acceptance or rejection of your provided proof.',
      },
      {
        q: 'Why was my proof rejected?',
        a: 'We reject proof if it doesn\'t clearly show the completion of the goal. You can contact us if you have any question about why your specific proof was rejected.',
      },
    ],
    logistics: [
      {
        q: 'What kind of blackmail can I upload?',
        a: 'You can upload any type of file or write a message.',
      },
      {
        q: 'What kind of proof can I submit?',
        a: 'We accept proof in any format as long as it is under 5mb. The most important thing is that the proof clearly shows completiion of the task.',
      },
      {
        q: 'Does the recipient need to be registered at blackmailer.xyz?',
        a: 'No, you can enter the email of anyone you know.',
      },
    ],
  }),
};
</script>

<style module>
.component{
  margin: 24px auto;
}

.component h1 {
  font-weight: 200;
  font-size: 24px;
  margin-top: 42px;
  margin-bottom: 6px;
}

.component h1.top {
  margin-top: 0;
}

.question {
  margin: 6px 0;
  text-align: left;
}
</style>
