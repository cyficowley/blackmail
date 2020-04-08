<template>
  <div class="about">
    <div id="nav">
      <router-link to="/">Landing</router-link> |
      <router-link to="/home">Home</router-link>
    </div>
    <h1>This is an dab page</h1>
    <v-container>
      <v-row v-for="deadline in deadlines" :key="deadline.id" style="margin-bottom:12px;">
        <Deadline v-bind="deadline" />
      </v-row>
    </v-container>
  </div>
</template>

<script>

import Deadline from '@/components/Deadline.vue';

export default {
  name: 'Landing',

  data: () => ({
    deadlines: [
      {
        id: 1, name: 'get some bussy', dueDate: new Date(2021, 4, 1), proofDescription: 'phone numbers of 3 women and call them and text them and tell then you love them then cry when you get rejected then take up men', recipient: 'youmotherfuckinglongboi@gmail.com', status: 'incomplete',
      },
      {
        id: 2, name: 'love me that man meat', dueDate: new Date(2020, 3, 10), proofDescription: 'phone numbers of 3 men', recipient: 'cyrus', status: 'finished',
      },
    ],
  }),

  components: {
    Deadline,
  },
};

</script>
