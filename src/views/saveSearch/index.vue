<template>
  <div class="container">
    <van-nav-bar
      title="保存记录"
      left-arrow
      @click-left="goPage"
      :fixed="true"
      :placeholder="true"
    ></van-nav-bar>
    <template v-for="index of 3">
      <div class="lc_card">
        <div style="width:100%;position:relative;top:0px;display:flex;flex-wrap:wrap;">
          <div class="lc_items"><span>交易類型:</span>租售</div>
          <div class="lc_items"><span>標籤:</span>經理推薦</div>
          <div class="lc_items"><span>房型:</span>兩居</div>
          <div class="lc_items"><span>排序:</span>默認排序</div>
          <div class="lc_items"><span>用途:</span>住宅</div>
          <div class="lc_items"><span>朝向:</span>西南</div>
        </div>
        <div class="lc_footer">
          <van-divider />
          <div class="lc_main_footer">
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#ee0a24">設置默認</van-radio>
            </van-radio-group>
            <div><span>刪除</span></div>
          </div>
        </div>
        <div style="position: absolute; width: 100%;">
          <div class="lc_cover">
            <div class="lc_word"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //设置保存记录内容
      saveRecord: [
        {
          isdefault: true,
          transType: "3", //1，售 2、租 3、租售
          tag: "经理推荐", //标签
          houseType: "两居", //房型
          sort: "默認排序",
          purpose: "住宅",
          orientation: "西南",
        },
        {
          isdefault: false,
          transType: "2", //1，售 2、租 3、租售
          tag: "经理推荐", //标签
          houseType: "两居", //房型
          sort: "默認排序",
          purpose: "住宅",
          orientation: "西南",
        },
        {
          isdefault: false,
          transType: "1",
          buildType: "有電梯大廈", //建築類型
          houseType: "三居", //房型
          tag: "區經推薦", //用途
          use: "車位",
          orientation: "東南",
        },
      ],
      //end 设置报存记录内容
      radio: "1",
    };
  },
  methods: {
    //返回上一頁
    goPage() {
      this.$router.go(-1);
    },
    //end 返回上一頁
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;

  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
  .lc_card {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 343px;
    // height: 147.5px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px auto;
    .lc_items {
      flex: 1;
      height: fit-content;
      font-size: 14px;
      padding-top: 19.5px;
      padding-left: 20px;
      padding-right: 10px;
      padding-bottom: 10px;
      white-space: nowrap;
      span {
        color: #7e7e7e;
        margin-right: 5px;
      }
    }
    .lc_footer {
      flex: 100%;
       margin-left: 10px;
       margin-right: 20px;
       margin-bottom: 10px;
      .lc_divider {
        width: 95%;
        //   background-color: #e2e2e2;
        height: 1px;
        border: 0.25px solid #e2e2e2;
        margin: 0 auto;
      }
      .lc_main_footer {
        bottom: 9px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 14px;
      }
    }
    .lc_cover {
      position: absolute;
      display: "block";
      left: 0;
      width: 40px;
      height: 40px;
      background: url("/icon/default.png");
      background-size: cover;
      &::after {
        position: relative;
        display: block;
        font-weight: lighter;
        content: "默認";
        font-size: 1px;
        color: #ffffff;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>