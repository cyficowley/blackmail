
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
        <Deadline v-bind="deadline" />
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model='vdialog' persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Create a new Deadline</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="36" sm="18" md="12">
                  <v-text-field label="Goal to complete" required></v-text-field>
                </v-col>
                 <v-col cols="6">
                   <datetime placeholder = " Select Deadline Date and Time" style ="width: 99%"
                   class = "dateBox" type="datetime"  v-model="datetime12"
                   use12-hour></datetime>
                </v-col>
                 <v-col cols="6">
                  <v-text-field label="Email of recipient" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="File upload placeholder for when i pull"
                    required
                  ></v-select>
                </v-col>
                 <v-col cols="6">
                  <v-text-field label="Name of Blackmail" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
             <v-checkbox class="dialogConfirm" v-model="checkbox1" :label="`I understand that this
             image will be sent to the recepient if I do not provide proof of
             completing the task by the deadline.${checkbox1.toString()}`">
             </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import { Datetime } from 'vue-datetime';
import Deadline from '@/components/Deadline.vue';

const fb = require('../plugins/firebase');

export default {
  name: 'Landing',

  data: () => ({
    loading: true,

    deadlines: [],
    vdialog: '',
    datetime12: '',
    checkbox1: '',
  }),

  created() {
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },

  methods: {
    async fetchData() {
      const { uid } = this.$store.state.currentUser;

      const deadlines = [];
      const getDeadlines = fb.users.doc(uid).collection('deadlines');
      try {
        const snapshot = await getDeadlines.get();
        snapshot.forEach((doc) => {
          deadlines.push(doc.data());
        });
        this.loading = false;
        this.deadlines = deadlines;
      } catch (err) {
        console.log(err);
      }
    },

    async signOut() {
      try {
        await fb.auth.signOut();
        this.$store.commit('setCurrentUser', undefined);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
  },

  components: {
    Deadline,
    Datetime,
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
