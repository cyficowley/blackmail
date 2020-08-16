<template >
  <div v-if="approvals.length != 0">
    <v-row
      v-for="approval in approvals"
      :key="approval.id">
      <ApprovalObject v-bind="approval" />
    </v-row>
  </div>

  <div v-else>
    NO THINGIES TO APPROVE
  </div>
</template>

<script>
import ApprovalObject from '@/components/ApprovalObject.vue';
import { mapState } from 'vuex';

export default {
  name: 'Approval',
  created() {
    if (this.$store.state.approvals.length === 0) {
      this.$store.dispatch('getAllApprovals');
    }
  },
  computed: {
    ...mapState({
      approvals: 'approvals',
    }),
  },
  components: {
    ApprovalObject,
  },
};
</script>
