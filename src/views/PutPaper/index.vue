<template>
  <div class="lc_paper">
    <!-- 返回 -->
    <div class="lc_fixe_header">
      <van-nav-bar
        fixed
        left-arrow
        title="放盤紙"
        @click-left="handleClickLeft"
        right-text="新增"
        @click-right="handleClickRight"
      />
    </div>

    <van-swipe-cell
      :before-close="beforeClose"
      v-if="PaperList.length > 0"
      v-for="(item, index) in PaperList"
    >
      <template #left>
        <van-button square type="primary" text="编辑" />
      </template>

      <div class="collapse">
        <div class="other_collapse" v-if="item.DepartmentName">
          <span class="first">部門:</span>
          <span>{{ item.DepartmentName }}</span>
        </div>
        <div class="other_collapse" v-if="item.OnlyTrustPerson">
          <span class="first">簽署人:</span>
          <span>{{ item.OnlyTrustPerson }}</span>
        </div>
        <div class="other_collapse" v-if="item.papertype">
          <span class="first">放盤類型:</span>
          <span>{{ item.papertype }}</span>
        </div>
        <div class="other_collapse" v-if="item.EffectiveDate">
          <span class="first">放盤日期起:</span>
          <span>{{ item.EffectiveDate }}</span>
        </div>
        <div class="other_collapse" v-if="item.EffectiveDate">
          <span class="first">放盤日期止:</span>
          <span>{{ item.EffectiveDate }}</span>
        </div>
        <div class="other_collapse" v-if="item.TrustBookNo">
          <span class="first">放盤紙編號:</span>
          <span>{{ item.TrustBookNo }}</span>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
    <!-- 顯示沒有數據樣式 -->
    
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
export default {
  data() {
    return {
      //放盤紙數據
      PaperList: [],
    };
  },
  mounted() {
    this.Get_Paper(); // 掛載時加載放盤紙數據
  },
  methods: {
    handleClickLeft() {
      this.$router.go(-1);
    },
    handleClickRight() {
      this.$router.push("AddPutPaper");
    },
    // 獲取放盤紙
    Get_Paper() {
      let keyId = this.$route.query.keyId;
      console.log("keyId");
      console.log(keyId);
      aplush.apis
        .ListingPaper({
          keyId: keyId,
        })
        .then((res) => {
          this.PaperList = res.PropOnlyTrusts;
          console.log("打印放盤紙");
          console.log(res);
        });
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
.lc_paper {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  position: relative;
  .lc_fixe_header {
    position: relative;
    height: 50px;
  }
  ::v-deep .van-swipe-cell {
    .collapse {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      width: 90%;
      margin: 15px auto 10px auto;
      border-radius: 10px;

      .title {
        font-size: 16px;
      }

      .pic_footer {
        position: absolute;
        top: 10px;
        border: 1px solid #c7e1ff;
      }

      select {
        margin: 0 6px;
      }

      input {
        margin: 0 6px;
        font-size: 14px;
      }

      .other_collapse {
       display:flex;
       justify-content:center;
       align-items:center;
       position:relative;
       margin-bottom:10px;

        .first {
          // font-size: 14px;
          color: #333;
        //   padding: 8px;
        padding: 10px 0 0 20px;
        }

        span {
          font-size: 14px;
          font-weight: 700;
        //   margin: 5px;
          padding: 10px 0 0 5px;
          // width: 40%;
          // display: inline-block;
        }
      }

      .no_data {
        text-align: center;
        font-size: 14px;
        color: #333;
        padding: 8px;
      }
    }
  }
}
</style>