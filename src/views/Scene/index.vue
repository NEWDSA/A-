
<template>
  <!-- navback -->
  <div class="lc_scene">
    <van-nav-bar
      left-arrow
      :left-text="navbar_left_text"
      :title="navbar_title"
      :right-text="navbar_right_text"
      @click-left="navbar_left_click"
      @click-right="navbar_right_click"
    />
    <van-swipe-cell
      style="display: flex; justify-content: center"
      :before-close="beforeClose"
    >
      <template #left>
        <van-button square type="primary" text="编辑" />
      </template>
      <div class="collapse">
        <div class="lc_collapse_items">
          <div style="display: flex; justify-content: center">
            <span class="first"> 部門: </span>
            <span>MB</span>
          </div>
          <div style="display: flex; justify-content: center">
            <span class="first"> 業務員: </span>
            <span>Sandy HO</span>
          </div>
          <div style="display: flex; justify-content: center">
            <span class="first"> 錄入日期: </span>
            <span>2021-12-07</span>
          </div>
          <div style="display: flex; justify-content: center">
            <span class="first"> 照片數量: </span>
            <span>6</span>
          </div>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbar_left_text: "",
      navbar_right_text: "上傳",
      navbar_title: "現場相記錄",
    };
  },
  methods: {
    navbar_left_click() {
      this.$router.go(-1);
    },
    navbar_right_click() {
      this.$router.go(-1);
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          // 跳轉到編輯頁面
          this.$router.push({
            path: "/EditScene",
          });
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          }).then(() => {
            instance.close();
            // 刪除對應頁面
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lc_scene {
  background-color: #f3f3f3;
  ::v-deep .van-swipe-cell__wrapper {
    display: flex;
    justify-content: center;
  }
  .collapse {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 10px auto;
    // background-color: #C0C0C0;
    //   background-color: rgba($color: #C0C0C0, $alpha: 0.25);
    background-color: #ffffff;
    //   border-radius: 6px;
    border-radius: 10px;
    margin-bottom: 10px;
    .lc_collapse_items {
      position: relative;
      width: 100%;
      margin: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .first {
        // font-size: 14px;
        color: #333;
        // padding: 8px;
      }
      span {
        font-size: 14px;
        font-weight: 700;
        margin: 5px;
        // width: 40%;
        // display: inline-block;
      }
    }
  }
}
</style>