<template>
<img class="posterLink" :src="url" />
</template>


<script>
import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile,useStorageFileUrl  } from "vuefire";

export default {
  props: {
    linkImg: {
        type: String,
        required: true
    }
  },
  setup(props) {
    let me =this;
    const storage = useFirebaseStorage();
    const mountainFileRef = storageRef(storage, props.linkImg);
    const { url, refresh } = useStorageFileUrl(mountainFileRef);
    console.log(url);
    return {
      url,
    };
  },
};
</script>

<style lang="css">
</style>