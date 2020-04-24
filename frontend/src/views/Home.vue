/* eslint-disable no-plusplus */

<template >
<body>

  <v-app id="home" class="darkOne">


    <div class = "svgImage">
    <div id="nav" class="transparent">
       <v-btn class = "logoutButton"  @click="signOut">
      Sign Out
    </v-btn>
    </div>
    <h1  class="transparent">Home</h1>
    <v-row class = "topRow transparent">
    <v-dialog id="dialogBox" v-model="dialog" persistent max-width="600px">
        <template  v-slot:activator="{ on }">
          <v-btn color="primary" dark
          style="text-align: center;"
           v-on="on">Create a New Deadline</v-btn>
        </template>
        <v-form ref="newDeadline"
          v-model="valid"
          lazy-validation
        >
          <v-card>
            <v-card-title>
              <span class="headline">Create a new Deadline</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newDeadline.name" :rules="[rules.required]"
                     label="Goal name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <Datetime placeholder = "Select Deadline Date and Time" use12-hour
                    class = "dateBox" type="datetime" v-model="newDeadlineDate"
                    :min-datetime="currentTime" input-style="width:100%;"
                    :phrases="{ok: 'Continue', cancel: 'Exit'}" auto/>
                    <p v-if="(!validDate.validity && newDeadlineDatex=='')"
                    class = "dateError">Please select a date.</p>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Email of recipient" v-model="newDeadline.recipient"
                    :rules="rules.emailText" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <FileUpload :key="fileComponentKey" message="Upload File"
                    :uploadCallback="getBlackmailFile"/>

                    <p v-if="fileError" class = "fileMessage">Upload a file to continue.</p>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="newDeadline.proofDescription" :rules="[rules.required]"
                    label="Description of proof of completion" rows="3" auto-grow></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-checkbox class="dialogConfirm" v-model="confirmed" label="I understand that this
              image will be sent to the recepient if I do not provide proof of
              completing the task by the deadline." :rules="[rules.required]">
              </v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="submit"
              :disabled="!valid">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <v-row class = "secondRow transparent">

      <h2 class = "filterText">Filter Deadlines: </h2>
      <v-btn-toggle class = "filterMenu"
            v-model="filterList"
            multiple
          >
            <v-btn>
              <p>Incomplete</p>
            </v-btn>
            <v-btn>
              <p>Pending</p>
            </v-btn>
            <v-btn>
              <p>Completed</p>
            </v-btn>
            <v-btn>
              <p>Sent</p>
            </v-btn>
          </v-btn-toggle>

          <v-menu offset-y>
        <template class = "sortBy" v-slot:activator="{ on }">
          <v-btn
            class = "sortBy"
            color="primary"
            dark
            v-on="on"
            >Sort by ▼</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in sortMethods"
            :key="index"
            @click="currentSort=item.id;"
          >
            <v-list-item-title>{{item.method}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


    </v-row>

    <v-snackbar
        v-model="goodSnackbar"
        :timeout="timeout"
        color="green"
        top
      > Deadline Submitted Succesfully!
      </v-snackbar>
       <v-snackbar
        v-model="badSnackbar"
        :timeout="timeout"
        color="red"
        top
      >Deadline Submission failed :(
      </v-snackbar>
       <div class = "transparent">
    <v-container v-if="loading">
      <h1>Loading</h1>
    </v-container>

     <v-container  class = "deadlines" v-else>
      <v-row v-for="deadline in sortedDeadlines" :key="deadline.id" style="margin-bottom:30px;">
        <Deadline v-bind="deadline"/>
      </v-row>
    </v-container>
    </div>
    </div>

  </v-app>
  </body>
</template>


<script>
import { Datetime } from 'vue-datetime';
import Deadline from '@/components/Deadline.vue';
import FileUpload from '@/components/FileUpload.vue';
import { mapState } from 'vuex';

document.body.style.backgroundColor = '#303C6C';

export default {
  name: 'Landing',

  data: () => ({
    filterList: [],
    currentSort: 0,
    newDeadline: {
      name: '',
      proofDescription: '',
      recipient: '',
      dueStamp: undefined,
      status: 'Incomplete',
      file: undefined,
    },
    valid: true,
    validDate: {
      validity: true,
    },

    newDeadlineDate: '',
    confirmed: '',
    fileError: false,
    dialog: false,
    fileComponentKey: 0,

  }),


  created() {
    if (this.$store.state.deadlines.length === 0) {
      this.$store.dispatch('getAllDeadlines');
    }
    this.timeout = 3000;

    this.sortMethods = [{ method: 'Date', id: 0 }, { method: 'Alphabetical', id: 1 }];

    this.rules = {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    };
  },

  computed: {
    currentTime: () => new Date(Date.now() + 0 * 60000).toISOString(),
    ...mapState({
      loading: 'loadingDeadlines',
    }),
    uploadStatus() {
      return this.$store.state.uploadStatus;
    },
    goodSnackbar() {
      if (this.uploadStatus === 1) {
        const payload = {
          val: 0,
          delay: true,
        };
        this.$store.dispatch('updateUploadStatus', payload);
        return true;
      }
      return false;
    },

    badSnackbar() {
      if (this.uploadStatus === -1) {
        const payload = {
          val: 0,
          delay: true,
        };
        this.$store.dispatch('updateUploadStatus', payload);
        return true;
      }
      return false;
    },

    sortedDeadlines() {
      let sortedDeadlines = [...this.$store.state.deadlines];
      sortedDeadlines = this.filter(sortedDeadlines);
      if (this.currentSort === 0) {
        sortedDeadlines.sort(this.compareDate);
      } else if (this.currentSort === 1) {
        sortedDeadlines.sort(this.compareAlphabet);
      }
      return sortedDeadlines;
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch('signOut');
    },

    filter(sortedDeadlines) {
      const filteredDeadlines = [];

      const statuses = {
        0: 'Incomplete',
        1: 'Pending',
        2: 'Completed',
        3: 'Sent',
      };

      if (this.filterList.length === 0) {
        return sortedDeadlines;
      }

      const currentStatuses = new Set(this.filterList.map((x) => statuses[x]));

      sortedDeadlines.forEach((deadline) => {
        if (currentStatuses.has(deadline.status)) {
          filteredDeadlines.push(deadline);
        }
      });

      return filteredDeadlines;
    },

    compareDate(a, b) {
      if (a.dueStamp.seconds < b.dueStamp.seconds) { return -1; }
      if (a.dueStamp.seconds > b.dueStamp.seconds) { return 1; }
      return 0;
    },
    compareAlphabet(a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    },

    fileUploaded() { this.fileError = false; },

    getBlackmailFile(file) {
      this.newDeadline.file = file;
      this.fileError = false;
    },

    validateDate() {
      return !(!this.newDeadlineDate);
    },
    resetForm() {
      this.$refs.newDeadline.reset();
      this.newDeadlineDate = '';
      this.fileComponentKey += 1;
    },

    submit() {
      this.validDate = this.validateDate();
      const valid = this.$refs.newDeadline.validate()
        && this.newDeadline.file && this.validDate;
      if (valid) {
        this.newDeadline.dueStamp = new Date(this.newDeadlineDate);
        this.$store.dispatch('createDeadline', this.newDeadline);
        this.dialog = false;
        this.resetForm();
      } else {
        if (!this.newDeadline.file) {
          this.fileError = true;
        }
        console.log('something is invalid');
      }
    },
  },

  components: {
    Deadline,
    Datetime,
    FileUpload,
  },
};

</script>

<style lang="css" scoped>
  @import '/node_modules/vue-datetime/dist/vue-datetime.css';
  .dateBox{
    margin-top: 26px;

    border-bottom: solid;
    border-width: 1px;
    border-color: rgba(0,0,0,.4);
    text-align: left;

  }
  .logoutButton{
    width: "8%";
    position:fixed;
   right:20px;
   top:20px;

  }
  .deadlines{
    vertical-align: top;
  }
  .secondRow{
    width: 100%;
    max-height: 50px;
  }
  .topRow{
   display: flex;
  justify-content: center;
  max-height: 50px;
  }
  .svgImage{
    background-image: url(../assets/landingGirl.svg);
    background-attachment: fixed;
  }

  .sortBy{
    position: absolute;
    right: 20px;
  }
  .filterText{
    color: black;
    padding-left: 30px;
    padding-right: 20px;
  }
  .dateBox input{
    width: 50%;
  }
  .vdatetime-input input{
    width: 100% !important;
  }
  .dialogConfirm{
    font-size: 12px;
  }
  .dateError{
    text-align: left;
    color: #ff5252;
  }
  .fileMessage{
    text-align: left;
    color: #ff5252;
    margin-left: 12px;
  }
  .filterMenu{
    align-content: right;
  }
  .transparent{
    background-color: rgba(0,0,0,1);
  }

  .darkOne{
  background:#303C6C !important;

  }
  html{
    background-color:#303C6C!important;
  }
</style>
