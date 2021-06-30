<template>
  <v-card :class="$style.component">
    <ul>
      <li>
        date: {{dateString}}
      </li>

      <li>
        timeRemaining: {{timeRemaining}}
      </li>

      <li v-if="name">
        name: {{name}}
      </li>

      <li v-if="proofDescription">
        proofDescription:
        <strong>
          {{proofDescription}}
        </strong>
      </li>

      <ul v-if="fileDetails">
        <li
          v-for="fileDetail in fileDetails"
          :key="fileDetail.name">
          <a
            v-bind:href="fileDetail.url.i"
            target="_blank">
            {{fileDetail.name}}
          </a>
        </li>
      </ul>
    </ul>

    <div :class="$style.actions">
      <v-btn
        v-if="!name"
        @click="getDetails">
        get details
      </v-btn>

      <v-btn
        v-if="name"
        :class="$style.float"
        @click="approve">
        approve
      </v-btn>

      <v-btn
        v-if="name"
        :class="$style.float"
        @click="deny">
        deny
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ApprovalObject',
  props: [
    'name',
    'date',
    'did',
    'uid',
    'proofDescription',
    'id',
    'fileDetails',
  ],
  methods: {
    getDetails() {
      this.$store.dispatch('getApprovalDetails', {
        id: this.id,
        did: this.did,
        uid: this.uid,
      });
    },
    approve() {
      this.$store.dispatch('approveApproval', {
        id: this.id,
        did: this.did,
        uid: this.uid,
      });
    },
    deny() {
      this.$store.dispatch('denyApproval', {
        id: this.id,
        did: this.did,
        uid: this.uid,
        date: this.date,
      });
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

<style module>
.component {
  width: 100%;
  text-align: left;
}

.actions {
  overflow: auto;
  width: 100%;
}

.float {
  float: right;
}
</style>
