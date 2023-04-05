<template>
  <div class="upload-container">
    <label
      class="upload-main"
      :for="idUpload"
      @click="open({ accept: 'image/*', multiple: false })"
    >
      <div class="icon-add" v-if="!url">
        <i class="fas fa-plus fa-lg"></i>
      </div>
      <img :src="url" alt="Ảnh" class="upload-image" v-if="url" />
    </label>
  </div>
</template>
<script>
import { uuidv4 } from "../../common/uuid";
import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile } from "vuefire";
import { watch } from "vue";
export default {
  setup() {
    const storage = useFirebaseStorage();
    const mountainFileRef = storageRef(storage, "images/" + uuidv4());
    const {
      url,
      uploadProgress,
      uploadError,
      uploadTask,
      upload,
    } = useStorageFile(mountainFileRef);

    const { files, open, reset } = useFileDialog();

    watch(files, (newFiles) => {
      const file = newFiles[0];
      if (file) {
        upload(file);
      }
    });

    function uploadPicture() {
      const data = files.value?.item(0);
      if (data) {
        upload(data);
      }
    }

    return {
      storage,
      url,
      uploadProgress,
      uploadError,
      uploadTask,
      uploadPicture,
      open,
      reset,
      files,
    };
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
