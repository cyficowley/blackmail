<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files);
            fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
          <div>
            <img src="../assets/upload.png" style="width:30px;">
            <p v-if="isInitial">
              Upload proof
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
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

  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
    };
  },
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
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      console.log(formData);
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map((x) => formData.append(fieldName, fileList[x], fileList[x].name));

      // save it
      this.save(formData);
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
</style>
