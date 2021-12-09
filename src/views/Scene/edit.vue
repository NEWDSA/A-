<template>
  <div class="edit_scene">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "编辑現場相",
    };
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>