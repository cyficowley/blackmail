<template>
  <v-file-input
    v-model="file"
    color="accent"
    prepend-icon="mdi-upload"
    :label="`Upload ${type}`"
    :disabled="disabled"
    :loading="loading"
    show-size
    dense
    filled>
  </v-file-input>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    type: {
      type: String,
      default: 'Blackmail',
    },
    callback: {
      type: Function,
      default: () => null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    file: undefined,
  }),
  watch: {
    file() {
      this.emit('file', this.file);
    },
  },
};
</script>
