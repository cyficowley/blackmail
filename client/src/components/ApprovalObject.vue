<template>
  <v-card style="width:100%; textAlign:left;">
    <ul>
      <li>date: {{dateString}}</li>
      <li>timeRemaining: {{timeRemaining}}</li>
      <li v-if="name">name: {{name}}</li>
      <li v-if="proofDescription">proofDescription: <strong>{{proofDescription}}</strong></li>
      <ul v-if="fileDetails">
        <li v-for="fileDetail in fileDetails" :key="fileDetail.name">
          <a target="_blank" v-bind:href="fileDetail.url.i">{{fileDetail.name}}</a>
        </li>
      </ul>
    </ul>
    <div style="overflow:auto; width:100%;">
      <v-btn v-if="!name" @click="getDetails">get details</v-btn>
      <v-btn style="float:right" v-if="name" @click="approve">approve</v-btn>
      <v-btn style="float:right" v-if="name" @click="deny">deny</v-btn>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ApprovalObject',

  props: ['name', 'date', 'did', 'uid', 'proofDescription', 'id', 'fileDetails'],

  methods: {
    getDetails() {
      const payload = {
        id: this.id,
        did: this.did,
        uid: this.uid,
      };
      this.$store.dispatch('getApprovalDetails', payload);
    },

    approve() {
      const payload = {
        id: this.id,
        did: this.did,
        uid: this.uid,
      };
      this.$store.dispatch('approveApproval', payload);
    },

    deny() {
      const payload = {
        id: this.id,
        did: this.did,
        uid: this.uid,
        date: this.date,
      };
      this.$store.dispatch('denyApproval', payload);
    },
  },


  computed: {
    timeRemaining() {
      return moment(this.date).fromNow();
    },
    dateString() {
      return moment(this.date).format('LT MMMM Do YYYY');
    },
  },
};
</script>

<style scoped>
</style>
