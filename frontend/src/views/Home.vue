<template>
  <div class="about">
    <div id="nav">
      <router-link to="/">Landing</router-link> |
      <router-link to="/home">Home</router-link>
    </div>
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
  </div>
</template>

<script>

import Deadline from '@/components/Deadline.vue';

const fb = require('../plugins/firebase');

export default {
  name: 'Landing',

  data: () => ({
    loading: true,

    deadlines: [],
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
  },
};

</script>
