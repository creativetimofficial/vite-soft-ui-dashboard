<template>
  <div class="upload-container">
    <label class="upload-main" :for="idUpload">
      <div class="icon-add" v-if="!srcLink">
        <i class="fas fa-plus fa-lg"></i>
      </div>
      <img :src="srcLink" alt="Ảnh" class="upload-image" v-if="srcLink" />
    </label>
    <input
      type="file"
      :id="idUpload"
      :accept="typeImage"
      @change="onFileChange"
      style="display: none"
    />
  </div>
</template>
<script>

export default {
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
    };
  },
  methods: {
    /**
     * Hàm thực hiện phát hiện ra sự kiện change file
     * @param {} e 
     */
    onFileChange(e) {
      console.log(e.target.files);
      this.fileUploader(e);
    },

    /**
     * Hàm thực hiện hiển thị file ra popup
    * @param {*} e 
     */
    fileUploader(e) {
      let me = this;
      let files = e.target.files;
      this.file = files[0];
      console.log(this.file);
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      reader.addEventListener("load", (event) => {
        me.srcLink = event.target.result;
      });

      this.saveFileUpLoad(e);
    },

    saveFileUpLoad(e){
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        const image = reader.result;
        const url = `${BASE_URL}/DB/movie/` + file.name;

        await fetch(url, {
          method: 'POST',
          body: image
        });

        console.log('Image saved to public folder.');
      };

      reader.readAsArrayBuffer(file);
    }
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
    border-radius: 10px;
    object-fit: cover;
  }
}
</style>
