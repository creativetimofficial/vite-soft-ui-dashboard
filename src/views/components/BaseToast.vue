<template>
  <div
    class="toast"
    :class="[positionClass, typeClass]"
    v-if="$store.state.isShowToast"
  >
    {{ $store.state.contentToast }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "info",
      validator: function (value) {
        return ["info", "warning", "success", "error"].indexOf(value) !== -1;
      },
    },
    position: {
      type: String,
      default: "top-right",
      validator: function (value) {
        return (
          ["top-right", "top-left", "bottom-right", "bottom-left"].indexOf(
            value
          ) !== -1
        );
      },
    },
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    typeClass() {
      return `toast-${this.type}`;
    },
    positionClass() {
      return `toast-${this.position}`;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.isShowToast = false;
    }, 3000);
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  padding: 12px 16px;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.toast-info {
  background-color: #2196f3;
}

.toast-warning {
  background-color: #ffc107;
}

.toast-success {
  background-color: #4caf50;
}

.toast-error {
  background-color: #f44336;
}

.toast-top-right {
  top: 16px;
  right: 16px;
}

.toast-top-left {
  top: 16px;
}
</style>
