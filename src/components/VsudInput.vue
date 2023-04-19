<template>
  <div class="form-group">
    <div :class="hasIcon(icon)">
      <span v-if="iconDir === 'left'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
      <input
        :id="id"
        :type="type"
        class="form-control"
        :class="[getClasses(size, valid),isEmpty?'required':'']"
        :name="name"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder"
        v-if="!isMultiple"
        :readonly="readonly"
        @blur="checkRequired()"
      />
      <textarea
        :id="id"
        :type="type"
        class="form-control"
        :class="getClasses(size, valid)"
        :name="name"
        :value="modelValue"
        @input="updateInput"
        :placeholder="placeholder"
        v-if="isMultiple"
      ></textarea>
      <span v-if="iconDir === 'right'" class="input-group-text">
        <i :class="getIcon(icon)"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VsudInput",
  emits: ["update:modelValue"],
  props: {
    size: {
      type: String,
      default: "default",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    iconDir: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    /**
     * Biến model
     */
    modelValue: {
      type: [String, Object, Array, Number],
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    isRequired: {type: Boolean, default: false},
    isMultiple: { type: Boolean, default: false },
    readonly: Boolean
  },
  data() {
    return {
      inputValue: this.value,
      isEmpty: false,
    };
  },
  methods: {
    /**
     * Hàm thực hiện binding 2 chiều update lại data trong input và hiển thị icon sau icon
     * Author: Công Đoàn (26/08/2022)
     */
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
      if (!event.target.value.trim()) {
        this.isHasIconAfter = false;
      } else {
        this.isHasIconAfter = true;
      }
    },
    getClasses: (size, valid) => {
      let sizeValue, isValidValue;

      sizeValue = size ? `form-control-${size}` : null;

      isValidValue = valid ? `${valid}` : "invalid";

      return `${sizeValue} ${isValidValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
    hasIcon: (icon) => (icon ? "input-group" : null),
    updateValue() {
      this.$emit("input", this.inputValue);
    },

    checkRequired(){
      if(this.isRequired && !this.modelValue){
        this.isEmpty =  true;
      }else{
        this.isEmpty  = false;
      }

    }
  },
};
</script>
<style scoped>
.required{
  border: 1px solid red !important;
}
</style>