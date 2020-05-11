<template>
  <v-card class="outer-card">
    <h2 class = "whiteText">{{name}}</h2>
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
            <v-card :class="statusColor" style="text-align:center;">
              <p style="width:100%;">{{status}}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card class = "whiteBack" style="display:flex;">
          <div style="flex-grow:1;">
            <p class = "blackText"><strong>Proof Description:</strong></p>
            <p class = "blackText">{{proofDescription}}</p>
          </div>
          <div v-if="this.status=='Incomplete' || this.status=='Rejected'">
            <FileUpload class = "blackText" :disabled="disabled"
             message="Upload proof" :uploadCallback="uploadedProof"/>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import moment from 'moment';
import FileUpload from '@/components/FileUpload.vue';

export default {
  name: 'Deadline',

  props: ['name', 'dueStamp', 'proofDescription', 'recipient', 'status', 'id', 'disabled'],

  methods: {
    uploadedProof(file) {
      const payload = {
        id: this.id,
        file,
        date: this.dueStamp,
      };
      this.$store.dispatch('uploadDeadlineProof', payload);
    },
  },


  computed: {
    timeRemaining() {
      return moment(this.dueStamp).fromNow();
    },
    dateString() {
      return moment(this.dueStamp).format('[Midnight] MMMM Do YYYY');
    },
    statusColor() {
      if (this.status === 'Approved') {
        return 'green';
      } if (this.status === 'Incomplete' || this.status === 'Rejected') {
        return 'red';
      } if (this.status === 'Pending') {
        return 'blue';
      } if (this.status === 'Blackmailed') {
        return 'orange';
      }
      return 'purple';
    },
  },

  components: {
    FileUpload,
  },
};
</script>

<style scoped>
  h2{
    text-align:left;
  }

  p{
    font-size: 1.2em;
    padding:5px;
    float:left;
    margin-bottom: 0px !important;
    /* width: 100%; */
  }

  .v-card{
    text-align: left;
    overflow: auto;
  }
  .blackText{
    color: black;
  }
  .whiteText{
    color: white;
  }
  .whiteBack{
    background-color: rgb(255,255,255);
  }
  .green{
    background-color: green;
  }
  .red{
    background-color: red;
  }
  .blue{
    background-color: blue;
  }
  .orange{
    background-color: orange;
  }
  .outer-card{
    width:100%;

    background-color: rgba(22, 72, 105, 1);
    overflow:hidden;
    padding:10px 20px 10px 20px;
  }
</style>
