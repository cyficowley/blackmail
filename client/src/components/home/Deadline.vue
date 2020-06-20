<template>
  <v-expansion-panel class="Deadline">
    <v-expansion-panel-header
      class="deadline-header"
      disable-icon-rotate
      color="light" ripple>

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

      <v-btn>Submit Proof</v-btn>

    </v-expansion-panel-content>
  </v-expansion-panel>
  <!-- <v-card class="outer-card">
    <div style="overflow:auto; margin-right:-10px;">
      <h2 style="float:left" class = "whiteText">{{name}}</h2>

      <v-tooltip content-class="tooltip" top v-if="this.completed">
        <template v-slot:activator="{ on }">
          <v-btn style="float:right" icon v-on="on" class="hoverer" color="white"
            @click="deleteMe">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </template>
        <span class = "hoverText">Delete this deadline</span>
      </v-tooltip>
    </div>
    <v-row>
      <v-col cols="12" lg="4">
        <v-row style="margin:-12px;">
          <v-col cols="12">
            <v-card class = "whiteBack">
              <p class = "blackText"><strong>Due Date:</strong></p>
              <p  class = "blackText">{{dateString}},<br/>
              {{timeRemaining}}
              </p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" lg="12" xl="8">
            <v-card color class = "whiteBack">
              <p class ="blackText" style="width:100%;">
                <strong>Recipient:</strong> {{recipient}}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="12" xl="4">
            <v-tooltip content-class="tooltip" max-width="500" class="hoverer" top>
              <template v-slot:activator="{ on }">
                <v-card :class="statusColor" v-on="on" style="text-align:center;">
                  <p style="width:100%;">{{status}}</p>
                </v-card>
              </template>
              <span class = "hoverText">{{this.statusText()}}</span>
            </v-tooltip>

          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card class = "whiteBack" style="display:flex; overflow:hidden;">
          <div style="flex-grow:1;">
            <p class = "blackText"><strong>Proof Description:</strong></p>
            <p class = "blackText">{{proofDescription}}</p>
          </div>
          <div v-if="status=='Pending' || status=='Rejected'"
            style="max-width:300px; overflow-x:auto; padding: 0 5px 0 5px">
            <p class = "blackText" style="text-align:center; padding:0;">
              <strong>Uploaded Proof:</strong>
            </p>
            <table style="max-height:200px;">
              <tr>
              <td v-for="{name, url} in proofItems" :key="name" style="height:100%;padding:5px;">
                <div v-if="isImage(name)" style="height:100%;">
                  <a v-bind:href="url.i" target="_blank">
                    <img style="max-height:180px; max-width:180px; display: block"
                    v-bind:src="url.i" v-bind:alt="name"/>
                  </a>
                </div>
                <div v-else>
                  <a v-bind:href="url.i" target="_blank">{{name}}</a>
                </div>
              </td>
              </tr>
            </table>
          </div>
          <div v-if="status=='Incomplete' || status=='Rejected' || status=='Pending'">
            <FileUpload class = "blackText" :disabled="disabled" name="Proof"
             :uploadCallback="uploadedProof"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card> -->
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
  methods: {
    uploadedProof(file) {
      const payload = {
        id: this.id,
        file,
        date: this.dueStamp,
        proofItems: this.proofItems,
      };
      this.$store.dispatch('uploadDeadlineProof', payload);
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
