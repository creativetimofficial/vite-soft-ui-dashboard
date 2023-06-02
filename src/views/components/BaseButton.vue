<template>
  <div class="button-cinema">
    <button :class="classButton" @click="bindEvent">{{ titleButton }}</button>
  </div>
</template>

<script>
export default {
  emits: ["bindEvent"],
  components: {},
  props: {
    titleButton: String,
    classButton: {
      type: [String,Array]},
  },
  data() {
    return {};
  },
  methods: {
    bindEvent(){
      this.$emit('bindEvent');
    }
  },
};
</script>

<style lang="scss">
.button-cinema {
  min-width: 30px;
  .button-blue {
    background: #1a72ff;
    height: 36px;
    padding: 0px 12px 0px;
    text-align: center;
    color: #fff;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 13px;
  }

  .button-red {
    background: #CC3333;
    height: 36px;
    padding: 0px 12px 0px;
    text-align: center;
    color: #fff;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 13px;
  }

  .button-white{
    background: #fff;
    height: 36px;
    padding: 0px 12px 0px;
    text-align: center;
    color: #111;
    font-weight: 600;
    outline: none;
    border: 1px solid #111;
    border-radius: 4px;
    font-size: 13px;

  }

  &:hover{
    opacity: 0.8;
  }

  &:active{
    opacity: 1;
  }
}
</style>