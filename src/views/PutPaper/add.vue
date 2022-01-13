<template>
  <div class="lc_paper">
    <!-- 返回 -->
    <van-nav-bar
      left-arrow
      @click-left="handleClickLeft"
      title="新增放盤紙"
      @click-right="handleClickRight"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClickLeft() {
      this.$router.go(-1);
    },
    handleClickRight() {
      this.$router.push("/PutPaper/PutPaper");
    },
  },
};
</script>

<style>
</style>