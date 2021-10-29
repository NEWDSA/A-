<template>
  <div class="container">
    <van-nav-bar
      title="更多跟進"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="AddFollow"
    />
    <div class="lc_nav">
      <span>全部(除系統跟進)</span>
      <van-icon name="arrow" />
    </div>
    <van-divider />
    <!-- 房源跟進 -->
    <van-steps
      direction="vertical"
      active-color="#646566"
      inactive-color="#646566"
    >
      <van-step v-for="(item, index) in FollowUp" :key="index" class="lc_step">
        <template #active-icon>
          <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
        </template>
        <template #inactive-icon>
          <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
        </template>
        <span class="lc_main_title">{{ item.FollowContent }}</span>

        <div class="sub_title" style="display: flex; align-items: center">
          <article>{{ item.Follower }}</article>
          <article>{{ item.FollowType }}</article>
          <article>{{ item.FollowTime }}</article>
        </div>
      </van-step>
    </van-steps>
    <!-- end 房源跟進 -->
    <!-- 底部彈出層 -->
    <van-popup position="bottom" v-model="show">
      <van-picker @cancel="show=false" show-toolbar :columns="columns" />
    </van-popup>
    <!-- end 底部彈出層 -->
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情 //引入樓盤跟進
export default {
  data() {
    return {
      PageIndex: 1,
      PageSize: 20,
      FollowUp: [],
      columns: [
        {
          text: "全部（除系統跟進）",
        },
        {
          text: "成交結盤",
        },
        {
          text: "信息補充",
        },
      ],
      show: false,
    };
  },
  mounted() {
    let lc_keyId = this.$route.query.KeyId;
    console.log("打印KeyId");
    console.log(lc_keyId);
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "25",
      IsDetails: "true",
      PropertyKeyId: lc_keyId,
    };

    aplush.apis.ListiongFollow(params).then((res) => {
      this.FollowUp = res.PropFollows;
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // end 返回
    // 新增跟進
    AddFollow() {
      this.show = true;
    },
    // end 新增跟進
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .lc_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 20px;
    font-size: 16px;
  }

  .lc_main_title {
    font-size: 14px;
    box-sizing: border-box;
    color: #333333;
    // border: 1px solid pink;
  }
  .sub_title {
    font-size: 12px;
    color: #9c9fa1;
  }
  ::v-deep .van-step__line {
    background-color: #e5e5e5 !important;
  }
  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
  ::v-deep .van-nav-bar__text {
    font-size: 16px;
    color: #f12945;
  }
  ::v-deep .van-picker__cancel {
    color: #333333;
  }
  ::v-deep .van-picker__confirm {
    color: #3b73e6;
  }
  ::v-deep .van-picker__toolbar {
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>