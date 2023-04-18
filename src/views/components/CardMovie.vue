<template>
  <div class="card-movie">
    <div>
      <base-image-download :linkImg="posterLink"></base-image-download>
    </div>
  </div>
</template>

<script>
import BaseImageDownload from "./BaseImageDownload.vue";

export default {
  name: "MovieManager",
  components: {
    BaseImageDownload,
  },
  props: {
    urlImg: {
      type: String,
      required: true,
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.movie-manage {
  padding: 30px 28px 0;
  .movie-manage-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
  }

  #search_movie {
    height: 36px;
  }
}

.posterLink {
  margin-right: 10px;
  display: inline-block;
  width: 80px;
  height: 80px;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
  padding: 3px;
}

.operation-wrapper {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  i:hover {
    opacity: 0.6;
  }
}
</style>
