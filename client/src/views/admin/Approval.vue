<template >
  <div v-if="approvals.length != 0">
    <v-row
      v-for="approval in approvals"
      :key="approval.id">
      <approval-object v-bind="approval" />
    </v-row>
  </div>

  <div v-else>
    NO THINGIES TO APPROVE
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ApprovalObject from '@/components/admin/ApprovalObject.vue';

export default {
  name: 'Approval',
  components: {
    ApprovalObject,
  },
  computed: {
    ...mapState({
      approvals: 'approvals',
    }),
  },
  created() {
    if (this.$store.state.approvals.length === 0) {
      this.$store.dispatch('getAllApprovals');
    }
  },
};
</script>
