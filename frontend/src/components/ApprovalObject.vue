<template>
  <v-card style="width:100%; textAlign:left;">
    <ul>
      <li>date: {{dateString}}</li>
      <li>timeRemaining: {{timeRemaining}}</li>
      <li v-if="name">name: {{name}}</li>
      <li v-if="proofDescription">proofDescription: {{proofDescription}}</li>
      <ul v-if="fileDetails">
        <li v-for="fileDetail in fileDetails" :key="fileDetail.name">
          <a target="_blank" v-bind:href="fileDetail.url.i">{{fileDetail.name}}</a>
        </li>
      </ul>
    </ul>
    <v-btn v-if="!name" @click="getDetails">get details</v-btn>
  </v-card>
</template>

<script>

import moment from 'moment';

export default {
  name: 'ApprovalObject',

  props: ['name', 'dueStamp', 'did', 'uid', 'proofDescription', 'id', 'fileDetails'],

  methods: {
    getDetails() {
      const payload = {
        id: this.id,
        did: this.did,
        uid: this.uid,
      };
      this.$store.dispatch('getApprovalDetails', payload);
    },
  },


  computed: {
    timeRemaining() {
      return moment(this.dueStamp).fromNow();
    },
    dateString() {
      return moment(this.dueStamp).format('[Midnight] MMMM Do YYYY');
    },
  },
};
</script>

<style scoped>
</style>
