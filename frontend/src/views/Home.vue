
<template>
  <v-app id="home">
    <div id="nav">
      <router-link to="/">Landing</router-link> |
      <router-link to="/home">Home</router-link>
    </div>
    <h1>This is an dab page</h1>
    <v-btn @click="signOut">
      Sign Out
    </v-btn>

    <v-row justify="center">
       <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
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
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Email of recipient" v-model="newDeadline.recipient"
                    :rules="rules.emailText" ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <FileUpload message="Upload File" :uploadCallback="getBlackmailFile"/>
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
              <v-btn color="blue darken-1" text @click="submit" :disabled="!valid">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>

    <v-container v-if="loading">
      <h1>Loading</h1>
    </v-container>
    <v-container v-else>
      <v-row v-for="deadline in deadlines" :key="deadline.id" style="margin-bottom:12px;">
        <Deadline v-bind="deadline"/>
      </v-row>
    </v-container>
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
    newDeadline: {
      name: '',
      proofDescription: '',
      recipient: '',
      dueStamp: {
        seconds: undefined,
      },
      status: 'incomplete',
      file: undefined,
    },
    valid: true,
    newDeadlineDate: '',
    confirmed: '',
    dialog: false,

    rules: {
      emailText: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: (value) => !!value || 'Required',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },
  }),

  created() {
    if (this.$store.state.deadlines.length === 0) {
      this.$store.dispatch('getAllDeadlines');
    }
  },

  computed: {
    currentTime: () => new Date().toISOString(),
    ...mapState({
      deadlines: 'deadlines',
      loading: 'loadingDeadlines',
    }),
  },

  methods: {
    signOut() {
      this.$store.dispatch('signout');
    },

    getBlackmailFile(file) {
      this.newDeadline.file = file;
    },

    submit() {
      const valid = this.$refs.newDeadline.validate()
        && this.newDeadline.file && this.newDeadlineDate;
      if (valid) {
        this.newDeadline.dueStamp.seconds = new Date(this.newDeadlineDate).getTime() / 1000;
        this.$store.dispatch('createDeadline', this.newDeadline);
        this.dialog = false;
      } else {
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
