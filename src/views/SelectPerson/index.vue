<template>
  <div class="container">
    <!-- navbar 導航 -->
    <van-nav-bar
      class="lc_bar"
      title="選擇提醒人"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- end navbar 導航 -->
    <!-- 搜索 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <!-- end 搜索 -->
    <!-- 选择跟进人区域 -->

    <!-- end 选择跟进人区域 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    //   返回上一页
    onClickLeft() {
       this.$router.go(-1);
    },
    //  end 返回上一页
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
}
</style>