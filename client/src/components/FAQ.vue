<template>
  <v-container id="faq-container">
    <!-- <v-card class="light-1" style="padding:20px;">
      <div v-for="question in questions" :key="question.q" style="margin-bottom:20px;">
        <p style="margin-bottom:5px;"><strong>{{question.q}}</strong></p>
        <p style="padding-left:15px;">{{question.a}}</p>
      </div>
    </v-card> -->
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" xl="10">
        <v-row>
          <h1 class="text-left bigTitle">FAQ</h1>
        </v-row>
        <v-expansion-panels accordion multiple>
          <v-expansion-panel class="light-1"
          v-for="question in questions" :key="question.q">
            <v-expansion-panel-header><strong>{{ question.q }}</strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content style="text-align:left;">
              {{ question.a}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'FAQ',

  created() {
    this.questions = [
      {
        q: 'How much will you email me?',
        a: 'We email you a reminder a day before your goal, and on acceptance or rejection of your proof',
      },
      {
        q: 'Do we ever look at your blackmail?',
        a: 'No, the files are deleted immediatly once your proof has been aproved or the deadline has passed, and are never viewed by our approvers.  They are encrypted the entire time they are stored',
      },
      {
        q: 'What kind of proof can I submit?',
        a: 'We accept proof in any format, as long as it is under 5mb. The most important thing is that the proof clearly shows completiion of the task',
      },
      {
        q: 'Who approves the proof?',
        a: 'All proof is reviewed by our internal team',
      },
      {
        q: 'Is there any way to cancel a deadline?',
        a: 'No, the only way to cancel your deadline is to submit valid proof',
      },
      {
        q: 'Is the blackmail email anonymous?',
        a: 'No, we explain to the recipient why they are getting that file, and that it came from your email account. See the validate your goal step for an example',
      },
      {
        q: 'What kind of blackmail can I upload?',
        a: 'You can upload any type file, keep in mind your recipient must be able to run it though',
      },
      {
        q: 'Does the recipient need to be registered at blackmailer.xyz?',
        a: 'No, you can enter the email of anyone you know',
      },
      {
        q: 'What happens if my proof gets rejected?',
        a: 'If your proof is rejected you will have at least 24 hours from the time of rejection to reupload valid proof.  You will be emailed to notify you if your proof is rejected.',
      },
      {
        q: 'Why was my proof rejected?',
        a: 'We reject proof if it doesn\'t clearly show the completion of the goal.  You can contact us if you have any question about why your specific proof was rejected.',
      },
    ];
  },

};
</script>

<style scoped>
  .bigTitle{
    font-size: 100px;
    padding-left: 20px;
  }


  #faq-container{
    margin:0 auto;
    margin-bottom:20px;
  }
  @media only screen and (max-width: 1281px) {
    .bigTitle{
      font-size: 60px;
    }
    #faq-container{
      padding: 10px;
      margin:0 auto;
    }
  }
</style>
