<template>
  <div class="upload-container">
    <label class="upload-main" :for="idUpload" @click="open({ accept: 'image/*', multiple: false })">
      <div class="icon-add" v-if="!url">
        <i class="fas fa-plus fa-lg"></i>
      </div>
      <img :src="url" alt="Ảnh" class="upload-image" v-if="url" />
    </label>
    <button @click="uploadPicture()">upload</button>
  </div>
</template>
<script>
import {watch} from 'vue'
import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile } from "vuefire";
export default {
  setup() {
    const storage = useFirebaseStorage();
    const mountainFileRef = storageRef(storage, "images");
    const {
      url,
      // gives you a percentage between 0 and 1 of the upload progress
      uploadProgress,
      uploadError,
      // firebase upload task
      uploadTask,
      upload,
    } = useStorageFile(mountainFileRef);

    function uploadPicture() {
      //const data = files.value?.item(0);
      console.log(files)
      if (dataImg) {
        upload(dataImg);
      }
    }

    const dataImg = files.value?.item(0);

    const { files, open, reset } = useFileDialog();

    return {
      storage,
      url,
      uploadProgress,
      uploadError,
      uploadTask,
      uploadPicture,
      open,
      reset,
    };
  },
  watch:{

  },
  props: {
    typeImage: {
      type: String,
      default: "*/*",
    },
    idUpload: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      file: "",
      srcLink: "",
      filename: "",
    };
  },
  methods: {

  },
};
</script>
  <style lang="scss">
.upload-container {
  display: flex;
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  .upload-main {
    cursor: pointer;
    display: flex;
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;
    margin: unset;
  }
  .icon-add {
    transform: scale(3);
  }
  .upload-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
</style>
  