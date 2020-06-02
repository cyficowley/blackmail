<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" xl="10">
        <v-row>
          <h1 class="bigTitle">HOW IT WORKS</h1>
        </v-row>
        <v-carousel id="slides" hide-delimiters :show-arrows="false" v-model="slide" height="auto"
        light>
          <v-carousel-item>
            <v-card class="workflow white">
              <v-row>
                <v-col md="6" cols="12">
                  <h1>Choose your goal</h1>
                  <p style="font-size: 22px;">
                    Come up with a task that you want to complete.
                    This can be related to anything: Work, school, or personal life.
                    <br/>
                    <br/>
                    Once you have a goal in mind,
                    describe how you would upload proof of its completion.
                    Then choose the image you want to blackmail yourself with,
                    and the potential recipient.

                  </p>
                  <p style="font-size: 22px;">

                  </p>

                </v-col>
                <v-col md="6" cols="12">
                  <h1>Example</h1>
                  <v-card outlined class="gray">
                    <v-card-text>
                      <h2 style="padding-bottom:10px">
                        You need to finish your math homework by next Tuesday.
                      </h2>
                      <table>
                        <tr>
                          <td class="table-cell">
                            Goal:
                          </td>
                          <td>Finish Math Homework</td>
                        </tr>
                        <tr>
                          <td class="table-cell">
                            Blackmail Material:
                          </td>
                          <td>An embarassing selfie you took last weekend</td>
                        </tr>
                        <tr>
                          <td class="table-cell">
                            Recipient:
                          </td>
                          <td>Your ex that you haven't spoken to in 2 and a half months</td>
                        </tr>
                        <tr>
                          <td class="table-cell">
                            Proof description:
                          </td>
                          <td>A picture of your fully completed math homework</td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn class="float-right" @click="slide++"><h2>Next Step</h2></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-carousel-item>
          <v-carousel-item>
            <v-card class="workflow white">
              <v-row>
                <v-col>
                  <h1>Complete your goal</h1>

                  <Deadline class="dark-1"
                    name="Finish Math Homework"
                    :dueStamp="this.exampleDate"
                    proofDescription="A picture of your fully completed math homework"
                    recipient="WhyDidYouLeaveMe@aol.com"
                    status="Incomplete"
                    disabled
                    />
                  <p style="padding-top: 20px; font-size: 22px;">
                    Once you have an uploaded deadline, it will have a status of 'Incomplete'.
                    To change this, upload proof of completion that matches your proof description.
                    This will change the status to 'Pending'.
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn class="float-left" @click="slide--"><h2>Previous Step</h2></v-btn>
                  <v-btn class="float-right" @click="slide++"><h2>Next Step</h2></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-carousel-item>
          <v-carousel-item>
            <v-card class="workflow white">
              <v-row>
                <v-col>
                  <h1 class="mobile-padded">Validate your goal</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" class="d-none d-md-inline">
                  <img src="../assets/email.png" id="email-pic"
                  @click="show" style="width:100%; cursor: pointer;">
                </v-col>
                <v-col cols="12" class="d-inline d-md-none">
                  <img src="../assets/email.png" style="width:100%" id="email-pic">
                </v-col>
                <v-col cols="12" md="9">
                  <p style="font-size: 22px;">
                    We will validate your proof within 24 hours. You will get an
                    email from us letting you know if it was 'Approved' or 'Rejected'
                    once we process it.
                    <br/>
                    <br/>
                    If your proof is rejected, you will have 24 hours to resubmit proof.
                    If you fail to resubmit proof, or miss your deadline altogether,
                    your deadline will receive the 'Blackmailed' status,
                    and your blackmail material
                    will be sent to your recipient.
                    <br/>
                    <br/>

                    We will be lenient in our validation, we are trying to motivate you,
                    not ruin your life. We are willing to work with you to ensure that
                    we accurately assess whether or not you have successfully completed
                    your goal. However, if it is clear the goal has not ben completed,
                    your recipient will recieve an email like this.

                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn class="float-left" @click="slide--"><h2>Previous Step</h2></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <modal name="email-example" :width="600" :height="800">
      <img src="../assets/email.png" style="width:100%;max-height:100vh;">
    </modal>
  </v-container>
</template>

<script>

import Deadline from '@/components/Deadline.vue';

export default {
  name: 'HowItWorks',

  components: {
    Deadline,
  },

  data: () => ({
    slide: 0,
  }),


  created() {
    this.exampleDate = new Date();
    this.exampleDate.setDate(this.exampleDate.getDate() + 3);
  },

  methods: {
    show() {
      this.$modal.show('email-example');
    },
    hide() {
      this.$modal.hide('email-example');
    },
  },

};
</script>

<style scoped>
  .forward{
    z-index:2;
  }
  .workflow{
    padding: 20px;
    text-align: left;
  }
  .bigTitle{
    font-size: 100px;
    padding-left: 20px;
  }

  .table-cell{
    padding-right:10px;
    color:rgba(0,0,0,.7)
  }
  @media only screen and (max-width: 1281px) {
    .mobile-padded{
      padding-bottom:10px;
    }
    .bigTitle{
      font-size: 60px;
    }
  }

</style>
