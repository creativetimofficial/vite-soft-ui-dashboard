<template>
  <UploadDropzone
    :uploader="uploader"
    :options="options"
    :on-update="onFileUploaded"
    width="600px"
    height="375px"
  />
</template>
  
<script>
import { Uploader } from "uploader";
import { UploadDropzone } from "@upload-io/vue-uploader";

// Create one instance per app.
const uploader = Uploader({ apiKey: "free" });

// Customize the dropzone UI (see "customization"):
const options = {
  multi: true,
};

export default {
  name: "BaseUpload",
  components: {
    UploadDropzone,
  },
  data() {
    return {
      uploader,
      options,
    };
  },
  methods: {
    onFileUploaded: (files) => {
      if (files.length === 0) {
        console.log("No files selected.");
      } else {
        console.log("Files uploaded:");
        console.log(files.map((f) => f.fileUrl));
      }
    },
  },
};
</script>