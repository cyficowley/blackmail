<template>
  <v-dialog
    :value="open"
    max-width="980px"
    class="CreateDeadline"
    @click:outside="close(true)">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step
          :complete="step > 1"
          :editable="step > 1"
          step="1"
          color="accent">
          Describe Your Goal
        </v-stepper-step>

        <v-stepper-step
          :complete="step > 2"
          :editable="step > 2"
          step="2"
          color="accent">
          Upload Blackmail
        </v-stepper-step>

        <v-stepper-step
          :complete="step > 3"
          step="3"
          color="accent">
          Select a Recipient
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items dark="false">
        <v-stepper-content step="1">
          <v-form
            v-model="validOne"
            ref="CreateDeadline1"
            lazy-validation>
            <h3
              id="goal-header"
              style="margin: 0 0 1rem;">
              Describe Your Goal
            </h3>

            <v-text-field
              v-model="deadline.title"
              required
              :rules="[rules.required]"
              label="Title of your Goal?"
              color="accent"
              placeholder="Exercise Daily for a Month"
            ></v-text-field>

            <v-textarea
              v-model="deadline.description"
              required
              color="accent"
              :rules="[rules.required]"
              label="How will you Prove Completion?"
              placeholder="31 images of me exercising with that day's newspaper."
            ></v-textarea>

            <h3
              id="time-selection-header"
              style="margin: 0 0 1rem">
              Select a Deadline
            </h3>

            <div id="time-selection-wrapper">
              <v-dialog
                ref="dateDialog"
                v-model="dateMenu"
                :return-value.sync="date"
                persistent
                width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formatedDate"
                    label="Select a Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="[rules.required]"
                    required
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :min="currentDate"
                  color="accent">

                  <v-spacer></v-spacer>

                  <div class="button-spacer">
                    <v-btn
                      color="accent"
                      text
                      @click="dateMenu = false">
                      Cancel
                    </v-btn>

                    <v-btn
                      color="accent"
                      text
                      @click="$refs.dateDialog.save(date)">
                      OK
                    </v-btn>
                  </div>
                </v-date-picker>
              </v-dialog>

              <v-dialog
                ref="timeDialog"
                v-model="timeMenu"
                :return-value.sync="time"
                persistent
                width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Select a Time"
                    prepend-icon="mdi-clock"
                    readonly
                    required
                    :rules="[rules.required]"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-time-picker
                  v-if="timeMenu"
                  v-model="time"
                  color="accent"
                  full-width>
                  <v-spacer></v-spacer>

                  <div class="button-spacer">
                    <v-btn
                      color="accent"
                      @click="timeMenu = false">
                      Cancel
                    </v-btn>

                    <v-btn
                      color="accent"
                      @click="$refs.timeDialog.save(time)">
                      OK
                    </v-btn>
                  </div>
                </v-time-picker>
              </v-dialog>
            </div>

            <div class="button-end">
              <v-btn
                style="margin: 0 1rem 0 0;"
                @click="close(true)">
                Abandon
              </v-btn>

              <v-btn
                color="accent"
                @click="finishStepOne">
                Achieve
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <h3
            id="goal-header"
            style="margin: 0 0 0rem;">
            Write Your Darkest Secrets
          </h3>

          <v-form
            v-model="validTwo"
            ref="CreateDeadline2"
            lazy-validation>
            <v-textarea
              v-model="textBlackmail"
              required
              color="accent"
              :disabled="file !== null"
              placeholder="I cheated my way through my classes this year."/>

            <h3
              id="goal-header"
              style="margin: 1rem 0 1rem;">
              Or Upload a Confidential File
            </h3>

            <v-file-input
              label="Select File"
              dense
              filled
              color="accent"
              chips
              :disabled="textBlackmail.length !== 0"
              v-model="file"
              prepend-icon="mdi-upload"
              @change="handlFile">
            </v-file-input>

            <div class="button-end">
              <v-btn
                style="margin: 0 1rem 0 0;"
                @click="close(true)">
                Bail Out
              </v-btn>

              <v-btn
                color="accent"
                @click="finishStepTwo">
                Upload
              </v-btn>
            </div>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="3">
          <h3
            id="goal-header"
            style="margin: 0 0 1rem;">
            Who is the Worst Person to See This?
          </h3>

          <v-form
            v-model="validThree"
            ref="CreateDeadline3"
            lazy-validation>
            <v-text-field
              v-model="deadline.recipient"
              :rules="rules.emailText"
              color="accent"
              required
              label="Email of Recipient"
            ></v-text-field>

            <v-checkbox
              color="accent"
              v-model="approve"
              style="margin: 2rem 1rem 1rem 1rem;"
              required
              label="I understand that my uploaded message or file will be sent to this recipient
              if I do not provide proof of completing my task by the deadline.">
            </v-checkbox>
          </v-form>

          <div class="button-end">
            <v-btn
              style="margin: 0 1rem 0 0;"
              @click="close(true)">
              Hide
            </v-btn>

            <v-btn
              color="accent"
              @click="finishStepThree">
              Blackmail Yourself
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CreateDeadline',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data: () => ({
    approve: false,
    step: 1,
    validOne: true,
    validTwo: true,
    validThree: true,

    file: null,
    textBlackmail: '',

    rules: {
      emailText: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      required: (value) => !!value || 'Required',
    },

    deadline: {
      title: '',
      description: '',
      recipient: '',
      dueStamp: null,
    },

    time: null,
    timeMenu: false,

    date: null,
    dateMenu: false,

    currentDate: '2020-06-09',
  }),
  methods: {
    close(reset) {
      if (reset) {
        this.step = 1;
      }
      this.$emit('close');
    },
    finishStepOne() {
      if (this.validOne) {
        this.step = 2;
      }
    },
    handlFile(e) {
      console.log(e);
      console.log(this.file);
    },
    finishStepTwo() {
      if (this.textBlackmail.length || this.file !== null) {
        this.step = 3;
      }
    },
    finishStepThree() {
      if (this.validThree) {
        if (this.deadline.title.length
          && this.deadline.description.length
          && this.deadline.recipient.length
          && (this.textBlackmail.length
            || this.file !== null)) {
          this.submit();
          this.close();
        }
      }
    },
    submit() {
      const deadlineData = {
        dueStamp: this.dueDate,
        name: this.deadline.title,
        proofDescription: this.deadline.description,
        recipient: this.deadline.recipient,
        sender: this.$store.state.currentUser.email,
        blackmail: {
          files: this.file,
          text: this.textBlackmail,
        },
      };

      if (this.textBlackmail) {
        deadlineData.blackmail.files = new File(
          [this.textBlackmail],
          'blackmail.txt',
          {
            type: 'text/plain',
            lastModified: Date.now(),
          },
        );
      }
      this.$store.dispatch('createDeadline', deadlineData);
    },
  },
  computed: {
    formatedDate() {
      if (!this.date) return '';
      const [year, month, day] = this.date.split('-');
      return `${month}/${day}/${year}`;
    },
    dueDate() {
      const [year, month, day] = this.date.split('-');
      const [hour, minute] = this.time.split(':');
      const due = new Date();
      due.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      due.setHours(parseInt(hour, 10), parseInt(minute, 10));
      return due;
    },
  },
  created() {
    this.currentDate = moment().add(1, 'days').format('YYYY-MM-DD');
  },
};
</script>

<style scoped>
h3 {
  color: var(--accent);
  font-weight: normal;
}

.button-spacer {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.button-end {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}
</style>
