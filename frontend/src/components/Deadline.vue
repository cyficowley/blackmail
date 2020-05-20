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
             <v-tooltip content-class="pog" max-width="500" class="hoverer"
              top>
               <template v-slot:activator="{ on }">
                 <v-card :class="statusColor" v-on="on" style="text-align:center;">
                   <p style="width:100%;">{{status}}</p>
                 </v-card>
                </template>
               <span class = "hoverText">{{this.statusText()}}</span>
          </v-tooltip>

          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card class = "whiteBack" style="display:flex; overflow:hidden;">
          <div style="flex-grow:1;">
            <p class = "blackText"><strong>Proof Description:</strong></p>
            <p class = "blackText">{{proofDescription}}</p>
          </div>
          <div v-if="status=='Pending' || status=='Rejected'"
            style="max-width:300px; overflow-x:auto; padding: 0 5px 0 5px">
            <p class = "blackText" style="text-align:center; padding:0;">
              <strong>Uploaded Proof:</strong>
            </p>
            <table style="max-height:200px;">
              <tr>
              <td v-for="{name, url} in proofItems" :key="name" style="height:100%;padding:5px;">
                <div v-if="isImage(name)" style="height:100%;">
                  <a v-bind:href="url.i" target="_blank">
                    <img style="max-height:180px; max-width:180px; display: block"
                    v-bind:src="url.i" v-bind:alt="name"/>
                  </a>
                </div>
                <div v-else>
                  <a v-bind:href="url.i" target="_blank">{{name}}</a>
                </div>
              </td>
              </tr>
            </table>
          </div>
          <div v-if="status=='Incomplete' || status=='Rejected' || status=='Pending'">
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

  props: ['name', 'dueStamp', 'proofDescription', 'recipient', 'status', 'id', 'disabled', 'proofItems'],

  methods: {
    uploadedProof(file) {
      const payload = {
        id: this.id,
        file,
        date: this.dueStamp,
        proofItems: this.proofItems,
      };
      this.$store.dispatch('uploadDeadlineProof', payload);
    },
    isImage(name) {
      return name.endsWith('png')
      || name.endsWith('jpg')
      || name.endsWith('jpeg')
      || name.endsWith('img')
      || name.endsWith('tiff');
    },

    statusText() {
      if (this.status === 'Approved') {
        return this.approvedText;
      } if (this.status === 'Pending') {
        return this.pendingText;
      } if (this.status === 'Blackmailed') {
        return this.blackmailedText;
      } if (this.status === 'Rejected') {
        return this.rejectedText;
      } if (this.status === 'Incomplete') {
        return this.incompleteText;
      }
      return 'something went wrong';
    },
  },


  created() {
    this.incompleteText = 'Incomplete means edit text later';
    this.pendingText = 'You have submitted but we havent done anything yet';
    this.rejectedText = 'Your proof was rejected ';
    this.blackmailedText = 'hey Dumbass ur shit got sent ';
    this.approvedText = 'Your proof submission has been approved! Your blackmail file has been deleted. Congratulations on completing your goal!';
  },


  computed: {
    timeRemaining() {
      return moment(this.dueStamp).fromNow();
    },
    dateString() {
      return moment(this.dueStamp).format('LT MMMM Do YYYY');
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
  .pog{
    background-color:white;
    opacity: 1 !important;

    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 5px 10px grey;
    border-width: 1px;
    border-color: black;
    border-style: solid;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(50, 50, 50, 0.46);
    -moz-box-shadow:    5px 5px 5px 0px rgba(50, 50, 50, 0.46);
    box-shadow:         5px 5px 5px 0px rgba(50, 50, 50, 0.46);

  }

  .hoverText{
    color:black;
    font-size:22px;


  }
  .outer-card{
    width:100%;

    background-color: rgba(22, 72, 105, 1);
    overflow:hidden;
    padding:10px 20px 10px 20px;
  }
</style>
