<template>
  <v-expansion-panel :class="$style.component">
    <v-expansion-panel-header
      :class="$style.header"
      color="white"
      disable-icon-rotate
      ripple>
      <div>
        <h3
          :class="[$style.title,
          {
            [$style.complete]: complete,
          }]">
          {{ deadline.name }}
        </h3>

        <h4 :class="$style.status">
          {{ deadline.status }}
        </h4>
      </div>


      <v-spacer/>

      <div :class="$style['due-wrapper']">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <h4
              v-bind="attrs"
              v-on="on"
              :class="[$style['due-date'], {
                [$style.complete]: complete,
              }]">
              {{dueDate}}
            </h4>
          </template>

          <span>
            {{dueDateFull}}
          </span>
        </v-tooltip>

        <h4 :class="$style.remaining">
          {{timeRemaining}}
        </h4>
      </div>
    </v-expansion-panel-header>

    <v-expansion-panel-content color="#F6F6FA">
      <div :class="[$style['text-wrapper'], $style.accent]">
        <h1>
          STATUS: {{ deadline.status }}
        </h1>

        <p>
          {{ statusText }}
        </p>
      </div>

      <div
        v-if="!complete"
        :class="$style['text-wrapper']">
        <p>
          Upload proof that you completed your task before the deadline,
          or your blackmail will be sent to
          <span style="color: var(--accent);">{{deadline.recipient}}</span>.
        </p>
      </div>

      <div
        v-if="!complete"
        :class="$style['text-wrapper']">
        <p>
          There is no way to cancel a deadline, best of luck!.
        </p>
      </div>

      <div :class="[$style['text-wrapper'], $style.dark]">
        <h1>
          {{ proofMessage }}
        </h1>

        <p>
          {{deadline.proofDescription}}
        </p>
      </div>

      <div
        v-if="!complete"
        :class="$style['file-input']">
        <v-file-input
          v-model="localProofFiles"
          label="Upload Proof"
          prepend-icon="mdi-upload"
          color="accent"
          hide-details
          outlined
          @change="uploadedProof">
        </v-file-input>

        <v-btn
          color="black"
          dark>
          Submit
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Deadline',
  props: {
    deadline: {
      type: Object,
      default: () => ({
        name: 'A Deadline',
        dueStamp: (new Date()).toString(),
        proofDescription: 'I will send you photos.',
        proofItems: [],
        recipient: 'trump@usa.gov',
        status: 'Rejected',
        id: 'kj90balskdf',
      }),
    },
  },
  data: () => ({
    localProofFiles: [],
  }),
  methods: {
    uploadedProof() {
      if (this.localProofFiles.length) {
        const payload = {
          id: this.deadline.id,
          file: this.localProofFiles[0],
          date: this.deadline.dueStamp,
          proofItems: this.deadline.proofItems,
        };
        this.$store.dispatch('uploadDeadlineProof', payload);
      }
    },
    deleteMe() {
      this.$store.dispatch('deleteDeadline', { id: this.id });
    },
    isImage(name) {
      return name.endsWith('png')
      || name.endsWith('jpg')
      || name.endsWith('jpeg')
      || name.endsWith('img')
      || name.endsWith('tiff');
    },
  },
  computed: {
    dueDate() {
      const due = new Date(this.deadline.dueStamp);
      return moment(due).format('dddd, MMMM Do');
    },
    dueDateFull() {
      const due = new Date(this.deadline.dueStamp);
      return moment(due).format('MMMM Do YYYY, h:mm:ss a');
    },
    timeRemaining() {
      const due = new Date(this.deadline.dueStamp);
      if (due.getTime() < new Date().getTime()) {
        return 'Deadline Expired';
      }
      return `Due ${moment(due).fromNow()}`;
    },
    statusText() {
      switch (this.deadline.status) {
        case 'Approved':
          return 'Your proof submission has been approved! Your blackmail file has been deleted. Congratulations on completing your goal!';
        case 'Pending':
          return 'You have submitted your proof for review. Nothing will be done until the proof is reviewed.';
        case 'Blackmailed':
          return 'You failed. Your blackmail has been sent to the recipient.';
        case 'Rejected':
          return 'Your proof was rejected. Please upload further proof.';
        case 'Incomplete':
          return 'Your deadline is all set up, complete the task before the deadline to avoid getting blackmailed.';
        default:
          return 'something went wrong';
      }
    },
    complete() {
      switch (this.deadline.status) {
        case 'Approved':
        case 'Blackmailed':
          return true;
        case 'Pending':
        case 'Rejected':
        case 'Incomplete':
        default:
          return false;
      }
    },
    proofMessage() {
      switch (this.deadline.status) {
        case 'Approved':
          return 'YOU UPLOADED:';
        case 'Blackmailed':
          return 'YOU FAILED TO UPLOAD:';
        case 'Pending':
        case 'Rejected':
        case 'Incomplete':
        default:
          return 'WHAT TO UPLOAD:';
      }
    },
  },
};
</script>

<style module>
.component {
  text-align: left;
}

.header {
  position: relative;
}

.title {
  font-size: 1.2rem;
  font-weight: normal;
  color: black;
}

.title.complete {
  font-size: 1.2rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.329);
}

.status {
  color: rgba(0, 0, 0, 0.329);
  margin-top: 4px;
}

.due-date {
  font-size: 1rem;
  display: inline-block;
  margin: .5rem 0 0 auto;
  color: rgba(0, 0, 0, 0.699);
}

.due-date.complete {
  color: rgba(0, 0, 0, 0.473);
}

.remaining {
  font-weight: normal;
  display: inline-block;
  margin: .5rem 0 0 auto;
  color: rgba(0, 0, 0, 0.616);
}

.due-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 1rem .5rem 0;
}

.text-wrapper {
  margin: 16px 16px;
  padding: 0 6px;
}

.text-wrapper.accent {
  background:#df622c2d;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.233);
}

.text-wrapper.dark {
  background:#9291912d;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.233);
}

.text-wrapper h1 {
  margin: 0 0 4px 0;
  color: #1d1d1d;
  font-size: 15px;
  font-weight: light;
  opacity: .8;
  text-transform: uppercase;
}

.text-wrapper.accent h1 {
  color: #DF622C;
}

.text-wrapper p {
  color: #242424;
  margin: 0;
}

.text-wrapper.accent p {
  color: #DF622C;
}

.file-input {
  margin-top: 32px !important;
  background:#9291912d;
  padding: 18px;
  display: block;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.212);
}
</style>
