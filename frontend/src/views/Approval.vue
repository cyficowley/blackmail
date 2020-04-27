<template >
  <v-app>
        <v-container class="approvals">
          <v-row
            v-for="approval in approvals"
            :key="approval.id"
          >
            <ApprovalObject v-bind="approval" />
          </v-row>
        </v-container>
  </v-app>
</template>


<script>
import ApprovalObject from '@/components/ApprovalObject.vue';
import { mapState } from 'vuex';

export default {
  name: 'Approval',

  data: () => ({
  }),

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

  methods: {
  },

  components: {
    ApprovalObject,
  },
};
</script>

<style lang="css" scoped>
</style>
