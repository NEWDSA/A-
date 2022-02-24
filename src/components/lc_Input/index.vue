<template>
  <!-- 組件keep-alive -->
  <keep-alive>
    <div>
      <input
        placeholder="請輸入照片描述"
        ref="lc_preview"
        @input="changeValue"
        class="lc_input"
        type="textarea"
        v-model="value"
      />
    </div>
  </keep-alive>
</template>

<script>
export default {
  props: {
    items: Object,
    index: Number,
  },
  watch: {
    //
    items: {
      handler(newVal, oldVal) {
        this.items.value = newVal.value;
      },
      deep: true,
    },
  },
  data() {
    return {
      value:'',
    };
  },
  methods: {
    changeValue() {
      this.$emit("lc_changes", this.value, this.index);
    },
  },
};

</script>

<style lang="scss" scoped>
.lc_input {
  height: 74px;
}
</style>