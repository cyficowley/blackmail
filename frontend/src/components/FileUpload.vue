<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <form enctype="multipart/form-data">
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving || disabled"
            @change="filesChange($event.target.name, $event.target.files);
            fileCount = $event.target.files.length"
            accept="" class="input-file">
          <div>
            <img src="../assets/upload.png" style="width:30px;">
            <p v-if="isInitial">
              Upload {{name}}
            </p>
            <p v-if="isSaving">
              Reading {{name}}...
            </p>
            <p v-if="isSuccess">
              Uploaded {{name}}
            </p>
            <p v-if="isFailed">
              Upload Failed
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;


export default {
  name: 'FileUpload',
  props: ['uploadPath', 'uploadCallback', 'disabled', 'name'],

  data: () => ({
    currentStatus: null,
    uploadFieldName: 'photos',
    file: undefined,
  }),

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {

    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.file = undefined;
    },
    save(file) {
      // upload data to the server
      this.file = file;
      this.currentStatus = STATUS_SAVING;
      this.uploadCallback(file);
      this.currentStatus = STATUS_SUCCESS;
      this.$emit('fileUploaded');
    },
    filesChange(fieldName, fileList) {
      if (!fileList.length) return;
      this.save(fileList[0]);
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped>
  .dropbox {
    outline: 2px grey; /* the dash box */
    outline-offset: -10px;
    background: #eee;
    padding: 10px 10px;
    height: 100px; /* minimum height */
    width: 100px; /* minimum height */
    position: relative;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0 auto;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    left:0px;
    top:0px;
    width: 100px;
    height: 100px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: #ddd  ; /* when mouse over to the drop zone, change color */
  }
  .dropbox:focus-within {
    background: #ddd  ; /* when mouse over to the drop zone, change color */
  }
</style>
