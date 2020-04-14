<template>
  <v-card class="outer-card">
    <h2>{{name}}</h2>
    <v-row>
      <v-col cols="12" lg="4">
        <v-row style="margin:-12px;">
          <v-col cols="12">
            <v-card>
              <p><strong>Due Date:</strong></p>
              <p>{{dateString}},<br/>
              {{timeRemaining}}
              </p>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" lg="8">
            <v-card>
              <p style="width:100%;"><strong>Recipient:</strong> {{recipient}}</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" lg="4">
            <v-card :class="statusColor" style="text-align:center;">
              <p style="width:100%;">{{status}}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card style="display:flex;">
          <div style="flex-grow:1;">
            <p><strong>Proof Description:</strong></p>
            <p>{{proofDescription}}</p>
          </div>
          <div v-if="this.status=='incomplete'">
            <FileUpload message="Upload proof" :uploadCallback="uploadedProof"/>
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

  props: ['name', 'dueStamp', 'proofDescription', 'recipient', 'status', 'id'],

  methods: {
    uploadedProof(file) {
      const payload = {
        id: this.id,
        file,
      };
      this.$store.dispatch('uploadDeadlineProof', payload);
    },
  },


  computed: {
    timeRemaining() {
      return moment.unix(this.dueStamp.seconds).fromNow();
    },
    dateString() {
      return moment.unix(this.dueStamp.seconds).format('[Midnight] MMMM Do YYYY');
    },
    statusColor() {
      if (this.status === 'finished') {
        return 'green';
      } if (this.status === 'incomplete') {
        return 'red';
      } if (this.status === 'approving') {
        return 'blue';
      }
      return 'orange';
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
    margin-bottom: 0px;
    /* width: 100%; */
  }

  .v-card{
    text-align: left;
    overflow: auto;
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
    background-color:#eee;
    overflow:hidden;
    padding:10px 20px 10px 20px;
  }
</style>
