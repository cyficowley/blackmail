<template >
  <v-app style="display:flex; flex-direction:column;" class="light-2">
    <div style="flex: 1 0 auto;">
      <div id="nav" class="">
        <v-btn class="logoutButton" @click="signOut"><strong>Sign Out</strong></v-btn>
      </div>
      <v-row>
      <div class = "title">
        <v-card>
          <h1 class="home" style="padding:0 20px 0 20px;"> My Deadlines </h1>
        </v-card>
      </div>
      </v-row>
       <v-row class = "title2">
        <h1 class=" home title2"> My Deadlines </h1>
      </v-row>

      <v-dialog
        id="dialogBox"
        v-model="dialog"
        persistent
        max-width="600px"
        style="float: center;"
      >
        <template style="display: flex; justify-content: center;" v-slot:activator="{ on }">
          <v-btn dark class="accent-1 deadlineCreate" v-on="on">
            <h2 style = "color:white">Create a New Deadline</h2>
          </v-btn>
        </template>
        <v-form ref="newDeadline" v-model="valid" lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">Create a new Deadline</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="newDeadline.name"
                      :rules="[rules.required]"
                      label="Goal name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <Datetime
                      placeholder="Select Deadline Date and Time"
                      use12-hour
                      class="dateBox"
                      type="datetime"
                      v-model="newDeadlineDate"
                      :min-datetime="currentTime"
                      input-style="width:100%;"
                      :phrases="{ok: 'Continue', cancel: 'Exit'}"
                      auto
                    />
                    <p
                      v-if="(!validDate.validity && newDeadlineDate=='')"
                      class="dateError"
                    >Please select a date.</p>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Email of recipient"
                      v-model="newDeadline.recipient"
                      :rules="rules.emailText"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <FileUpload name="Blackmail"
                      :key="fileComponentKey"
                      :uploadCallback="getBlackmailFile"
                    />

                    <p v-if="fileError" class="fileMessage">Upload a file to continue.</p>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      filled
                      v-model="newDeadline.proofDescription"
                      :rules="[rules.required]"
                      label="Description of proof of completion"
                      rows="3"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-checkbox
                class="dialogConfirm"
                v-model="confirmed"
                label="I understand that this
            image will be sent to the recepient if I do not provide proof of
            completing the task by the deadline."
                :rules="[rules.required]"
              ></v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="submit" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <v-dialog
        v-model="dateConfirmation"
        persistent
        max-width="600px"
        style="float: center;"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Duedate is within two hours</span>
          </v-card-title>
          <div style="width:100%; text-align:left; padding:20px;">
            <p>Are you sure you want a deadline due within the next two hours?</p>
          </div>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click.stop="dateConfirmation=false">
              No, go back
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit" >Yes, submit deadline</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container style="margin-top:20px;">
        <v-row class = "d-none d-md-flex">
          <h2 class="filterText">Filter Deadlines</h2>
        </v-row>

        <v-select
          v-model="filterItemList"
          :items="statuses"
          label="Filter Deadlines"
          chips
          multiple
          class="d-inline d-md-none"
        ></v-select>
        <v-row class="topRow">
          <v-btn-toggle class="filterMenu d-none d-md-flex" v-model="filterIndexList" multiple>
            <v-btn v-bind:class="{'filterItem': !Incomplete, 'filterItemClicked': Incomplete}"
                v-on:click ="Incomplete = !Incomplete">
              <p class = "centered">Incomplete</p>
            </v-btn>
            <v-btn  v-bind:class="{'filterItem': !Pending, 'filterItemClicked': Pending}"
                v-on:click ="Pending = !Pending">
              <p  class = "centered" >Pending</p>
            </v-btn>
            <v-btn v-bind:class="{'filterItem': !Rejected, 'filterItemClicked': Rejected}"
                v-on:click ="Rejected = !Rejected">
              <p  class = "centered">Rejected</p>
            </v-btn>
            <v-btn v-bind:class="{'filterItem': !Blackmailed, 'filterItemClicked': Blackmailed}"
                v-on:click ="Blackmailed = !Blackmailed">
              <p  class = "centered">Blackmailed</p>
            </v-btn>
            <v-btn v-bind:class="{'filterItem': !Approved, 'filterItemClicked': Approved}"
                v-on:click ="Approved = !Approved">
              <p  class = "centered">Approved</p>
            </v-btn>
          </v-btn-toggle>

          <v-menu style=""  offset-y>
            <template  v-slot:activator="{ on }">
              <v-btn class = "sortBy"  v-on="on">Sort by ▼</v-btn>
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
      </v-container>

      <v-row class="secondRow "></v-row>

       <v-snackbar
             v-model="emailSnackbar"
            :timeout="timeout"
            color="green"
            top
      >Email Successfully Verified.</v-snackbar>

      <v-snackbar
        v-model="goodSnackbar"
        :timeout="timeout"
        color="green"
        top
      >Deadline Submitted Succesfully!</v-snackbar>
      <v-snackbar
        v-model="badSnackbar"
        :timeout="timeout"
        color="red"
        top
      >Deadline Submission failed :(</v-snackbar>
      <div class="">
        <v-container v-if="loading">
          <h1>Loading</h1>
        </v-container>

        <v-container v-else-if="sortedDeadlines.length===0">
          <h1 style="padding-top:50px;">No deadlines</h1>
        </v-container>

        <v-container class="deadlines" v-else>
          <v-row
            v-for="deadline in sortedDeadlines"
            :key="deadline.id"
            style="margin-bottom:40px; margin-top: 0px;"
          >
            <Deadline v-bind="deadline" class="dark-2"/>
          </v-row>
        </v-container>
      </div>
    </div>
    <Footer v-if="!loading" style="flex-shrink:0;"/>
  </v-app>
</template>


<script>
import { Datetime } from 'vue-datetime';
import Deadline from '@/components/Deadline.vue';
import FileUpload from '@/components/FileUpload.vue';
import Footer from '@/components/Footer.vue';
import { mapState } from 'vuex';

const fb = require('../plugins/firebase');

export default {
  name: 'Landing',

  data: () => ({
    emailSnackbar: false,
    filterIndexList: [],
    filterItemList: [],
    statuses: ['Incomplete', 'Pending', 'Rejected', 'Blackmailed', 'Approved'],
    Incomplete: false,
    Pending: false,
    Rejected: false,
    Blackmailed: false,
    Approved: false,
    dateConfirmation: false,
    currentSort: 0,
    newDeadline: {
      name: '',
      proofDescription: '',
      recipient: '',
      dueStamp: undefined,
      status: 'Incomplete',
      file: undefined,
      sender: null,
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
    this.urlCode = this.getUrlVal('snackbar');
    this.timeout = 3000;

    if (this.urlCode === 'emailVerified') {
      this.emailSnackbar = true;
    }


    this.sortMethods = [
      { method: 'Date', id: 0 },
      { method: 'Alphabetical', id: 1 },
    ];

    this.rules = {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    };
    this.newDeadline.sender = this.$store.state.currentUser.email;
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

    getUrlVal(field, url) {
      const href = url || window.location.href;
      const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
      const string = reg.exec(href);
      return string ? string[1] : null;
    },

    filter(sortedDeadlines) {
      const filteredDeadlines = [];

      const statuses = {
        0: 'Incomplete',
        1: 'Pending',
        2: 'Rejected',
        3: 'Blackmailed',
        4: 'Approved',
      };


      const currentStatuses = new Set(this.filterIndexList.map((x) => statuses[x]));
      this.filterItemList.forEach((item) => {
        currentStatuses.add(item);
      });

      if (currentStatuses.size === 0) {
        return sortedDeadlines;
      }

      sortedDeadlines.forEach((deadline) => {
        if (currentStatuses.has(deadline.status)) {
          filteredDeadlines.push(deadline);
        }
      });

      return filteredDeadlines;
    },

    compareDate(a, b) {
      if (a.dueStamp.getTime() < b.dueStamp.getTime()) {
        return -1;
      }
      if (a.dueStamp.getTime() > b.dueStamp.getTime()) {
        return 1;
      }
      return 0;
    },
    compareAlphabet(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    },

    fileUploaded() {
      this.fileError = false;
    },

    getBlackmailFile(file) {
      this.newDeadline.file = file;
      this.fileError = false;
    },

    validateDate() {
      return !!this.newDeadlineDate;
    },
    resetForm() {
      this.$refs.newDeadline.reset();
      this.newDeadlineDate = '';
      this.fileComponentKey += 1;
    },
    async resend() {
      try {
        await fb.auth.currentUser.sendEmailVerification();
      } catch (err) {
        this.errorMsg = err.message;
        console.log(err);
      }
    },

    submit() {
      this.validDate = this.validateDate();
      const valid = this.$refs.newDeadline.validate()
        && this.newDeadline.file
        && this.validDate;
      if (valid) {
        this.newDeadline.dueStamp = new Date(this.newDeadlineDate);

        // ValidationPopup
        const TWO_HOUR = 2 * 60 * 60 * 1000;
        if (!this.dateConfirmation) {
          if (this.newDeadline.dueStamp - (new Date()) < TWO_HOUR) {
            this.dateConfirmation = true;
            return;
          }
        }

        this.$store.dispatch('createDeadline', this.newDeadline);
        this.dialog = false;
        this.dateConfirmation = false;
        this.resetForm();
      } else if (!this.newDeadline.file) {
        this.fileError = true;
      }
    },
  },

  components: {
    Deadline,
    Datetime,
    Footer,
    FileUpload,
  },
};
</script>

<style lang="css" scoped>
.dateBox {
  margin-top: 26px;

  border-bottom: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.4);
  text-align: left;
}

.logoutButton {
  width: "8%";
  position: fixed;
  right: 20px;
  top: 20px;
  font-size:19px;
  z-index: 99;

}
.deadlines {
  vertical-align: top;
  width: 90%;
}
.secondRow {
  width: 100%;
  max-height: 50px;
}
.topRow {
  display: flex;
  max-height: 50px;
  margin-bottom: 0px;
  margin-top: 0px;

}

.sortBy {
  margin-left:auto;
  margin-right:0;
  margin-top: 10px;
  background-color:var(--dark-1) !important;
  color: white;
}
.filterText {
  color: black;
  padding-right: 20px;
  float: left;
  padding-left: 0px !important;
}
.dateBox input {
  width: 50%;
}
.title{
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}
.vdatetime-input input {
  width: 100% !important;
}
.dialogConfirm {
  font-size: 12px;
}
.dateError {
  text-align: left;
  color: #ff5252;
}
.fileMessage {
  text-align: left;
  color: #ff5252;
  margin-left: 12px;
}
.deadlineCreate{
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;

}
.home {
  font-size: 70px;
  text-align: center;
  line-height: 100px;
}
.filterMenu {
  float: left;
  background-color:white !important;
}
.filterItem{
  background-color:var(--dark-1) !important;
  color: white;
  text-align: center;
  opacity: 1.0 !important;
  font-size: 16px;
  font-weight: bold;
}
.filterItemClicked{
  background-color:var(--dark-1-clear) !important;
  color: white !important;
  text-align: center;
  opacity: 1 !important;
  font-size: 16px;
  font-weight: bold;
}
.centered{
  line-height: 48px;
}
.verify{
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding-left:10px;
  padding-right: 10px;
  width: 60%;
  padding-bottom: 20px;
}
.title2{
  display: none;
}

@media (max-width: 1200px) {
  .title{
    display: none;
  }
  .title2{
    text-align: center;
    margin:auto;
    display: block;
  }
}
@media (max-width: 959px) {
  .sortBy{
    margin-left:20px;
    margin-right:auto;
    margin-top: 10px;
  }
}

@media (max-width: 700px) {
 .home{
   font-size: 30px;
 }
 .logoutButton{
   font-size: 10px;
 }
 .verifyText{
   font-size: 16px;
 }
 .verify{
   width: 90%;
 }

}
</style>
