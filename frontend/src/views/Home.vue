
<template>
  <v-app id="home">
    <div id="nav">
      <router-link to="/">Landing</router-link> |
      <router-link to="/home">Home</router-link>
    </div>
    <datetime type="datetime" v-model="datetime12" use12-hour></datetime>
    <h1>This is an dab page</h1>
    <v-btn color="black" class="mr-4" @click="signOut">
      Sign Out
    </v-btn>

    <v-container v-if="loading">
      <h1>Loading</h1>
    </v-container>
    <v-container v-else>
      <v-row v-for="deadline in deadlines" :key="deadline.id" style="margin-bottom:12px;">
        <Deadline v-bind="deadline"/>
      </v-row>
    </v-container>
    <v-row justify="center">
       <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-form ref="deadlineForm"
           v-model="valid"
            lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">Create a new Deadline</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="36" sm="18" md="12">
                    <v-text-field v-model="newDeadline.proofDescription"
                     label="Goal to complete"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <datetime placeholder = " Select Deadline Date and Time" style ="width: 99%"
                    class = "dateBox" type="datetime"  v-model="datetime12"
                    use12-hour></datetime>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Email of recipient" v-model="newDeadline.recipient"
                    :rules="rules.emailText" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <fileUpload :message="formMessage" :width="formWidth" :height="formHeight"/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="newDeadline.name"
                    label="Name of Blackmail" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-checkbox class="dialogConfirm" v-model="checkbox1" :label="`I understand that this
              image will be sent to the recepient if I do not provide proof of
              completing the task by the deadline .${checkbox1.toString()}`">
              </v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="submit">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </v-app>
</template>


<script>
import { Datetime } from 'vue-datetime';
import Deadline from '@/components/Deadline.vue';
import FileUpload from '@/components/FileUpload.vue';
import { mapState } from 'vuex';

export default {
  name: 'Landing',

  data: () => ({
    formMessage: 'Upload Blackmail File',
    newDeadline: {
      name: '',
      proofDescription: '',
      recipient: '',
      dueStamp: {
        seconds: null,
      },
      status: 'incomplete',
    },
    // 'name', 'dueStamp', 'proofDescription', 'recipient', 'status'
    deadlines: [],
    // vdialog: '',
    datetime12: '',
    checkbox1: '',
    fileWidth: -1,
    fileHeight: -1,
    dialog: false,
    // values passed in to fileUpload component.
    // Set to -1 if default val is wanted
    formWidth: -1,
    formHeight: -1,
    rules: {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
  }),

  created() {
    this.$store.dispatch('getAllDeadlines');
  },

  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },

  computed: mapState({
    deadlines: 'deadlines',
    loading: 'loadingDeadlines',
  }),

  methods: {
    signOut() {
      this.$store.dispatch('signout');
    },

    ValidateEmail(mail) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    },

    validate() {
      if (this.newDeadline.proofDescription === '') {
        alert('Valid goal required');
        return false;
      }
      if (this.datetime12 === '') {
        alert('Valid Date required');
        return false;
      }
      // convert inputted deadline to timestamp
      const deadlineDate = new Date(this.datetime12);
      // get time stamp 5 min in the future
      const currentDate = new Date();
      const fiveMin = new Date(currentDate.getTime() + 5 * 60000);
      if (deadlineDate < fiveMin) {
        alert('Please select a deadline more than 5 min in the future');
        return false;
      }
      const secondsVal = Number(deadlineDate.getTime());
      const secondsVal2 = secondsVal / 1000;
      console.log(secondsVal2);
      this.newDeadline.dueStamp.seconds = secondsVal2;

      if (this.newDeadline.recipient === '') {
        alert('Valid email required');
        return false;
      }
      if (this.ValidateEmail(this.newDeadline.recipient) === false) {
        alert('Valid email required');
        return false;
      }

      if (this.newDeadline.name === '') {
        alert('Valid Title required');
        return false;
      }
      if (this.checkbox1 !== true) {
        alert('Please check the box marking you understand this is permanent.');
        return false;
      }
      return true;
    },

    uploadLocal() {
      this.deadlines.push(this.newDeadline);
      this.dialog = false;
    },

    uploadCloud() {

    },

    submit() {
      if (this.validate() === true) {
        this.uploadLocal();
        this.uploadCloud();
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
  .dateBox input{
    width: 50%;
  }
  .vdatetime-input input{
    width: 100% !important;
  }
  .dialogConfirm{
    font-size: 12px;
  }
</style>
