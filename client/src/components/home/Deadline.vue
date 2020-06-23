<template>
  <v-expansion-panel class="Deadline">
    <v-expansion-panel-header
      class="deadline-header"
      disable-icon-rotate
      color="light" ripple>
      <h3 class="deadline-title">{{ deadline.status }}</h3>

      <h3 class="deadline-title">{{ deadline.name }}</h3>

      <v-spacer/>

      <div class="due-wrapper">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <h4
              class="deadline-duedate"
              v-bind="attrs"
              v-on="on">
              {{dueDate}}
            </h4>
          </template>

          <span>{{dueDateFull}}</span>
        </v-tooltip>

        <h4 class="deadline-remaining">{{timeRemaining}}</h4>
      </div>


    </v-expansion-panel-header>

    <v-expansion-panel-content color="white">
      <p>{{deadline.proofDescription}}</p>
      <p>{{deadline.recipient}}</p>


      <v-file-input
        label="Uploads on selection of file"
        dense
        filled
        color="accent"
        @change="uploadedProof"
        v-model="localProofFiles"
        prepend-icon="mdi-upload">
      </v-file-input>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import moment from 'moment';
// import FileUpload from '@/components/FileUpload.vue';

export default {
  name: 'Deadline',
  components: {
    // FileUpload,
  },
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

    statusText() {
      if (this.status === 'Approved') {
        return this.approvedText;
      } if (this.status === 'Pending') {
        return this.pendingText;
      } if (this.status === 'Blackmailed') {
        return this.blackmailedText;
      } if (this.status === 'Rejected') {
        return this.rejectedText;
      } if (this.status === 'Incomplete') {
        return this.incompleteText;
      }
      return 'something went wrong';
    },
  },
  created() {
    this.incompleteText = 'Incomplete means edit text later';
    this.pendingText = 'You have submitted but we havent done anything yet';
    this.rejectedText = 'Your proof was rejected ';
    this.blackmailedText = 'Your blackmail was sent to the recipient';
    this.approvedText = 'Your proof submission has been approved! Your blackmail file has been deleted. Congratulations on completing your goal!';
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
    // dateString() {
    //   return moment(this.dueStamp).format('LT MMMM Do YYYY');
    // },
    // statusColor() {
    //   if (this.status === 'Approved') {
    //     return 'green';
    //   } if (this.status === 'Incomplete' || this.status === 'Rejected') {
    //     return 'red';
    //   } if (this.status === 'Pending') {
    //     return 'blue';
    //   } if (this.status === 'Blackmailed') {
    //     return 'orange';
    //   }
    //   return 'purple';
    // },

    // completed() {
    //   if (this.status === 'Blackmailed' || this.status === 'Approved') {
    //     return true;
    //   }
    //   return false;
    // },

  },
};
</script>

<style scoped>
.Deadline {
}

.deadline-header {
  position: relative;
}

h3.deadline-title {
  font-size: 1.2rem;
  font-weight: normal;
  color: black;
}

h4.deadline-duedate {
  font-size: 1rem;
  display: inline-block;
  margin: .5rem 0 0 auto;
  color: rgba(0, 0, 0, 0.897);
}

h4.deadline-remaining {
  font-weight: normal;
  display: inline-block;
  margin: .5rem 0 0 auto;
  color: rgba(0, 0, 0, 0.87);
}

.due-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0 1rem .5rem 0;
}

.color-bar {
  --completion: 0;
  display: block;
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 4px;
  width: 6px;
  background-color: hsla(calc((-144 * var(--completion)) + 144), 100%, 45%, .8);
}
</style>
