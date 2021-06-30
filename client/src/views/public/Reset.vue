<template>
  <div :class="$style.component">
    <v-card :class="$style['forgot-password-container']">
      <reset-password />
    </v-card>

    <!-- <v-snackbar
      v-model="success"
      :timeout="timeout"
      color="green"
      top>
      Deadline Submitted Succesfully!
    </v-snackbar> -->
  </div>
</template>


<script>
import ResetPassword from '@/components/modal/ResetPassword.vue';

export default {
  name: 'Reset',
  components: {
    ResetPassword,
  },
};
</script>

<style module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.forgot-password-container {
  padding: 20px;
  margin-bottom: 24px;
}
</style>
