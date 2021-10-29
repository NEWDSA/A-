<template>
  <div>
    <van-nav-bar title="" cross>
      <template #left>
        <van-icon class="cross" name="cross" size="18" @click="back" />
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="main_title">首頁應用</span>
        <span class="main_sub">按住拖動調整順序</span>
      </template>
      <template #right>
        <div class="btn_eidt" @click="EditApplication">{{ AppStatus }}</div>
      </template>
    </van-nav-bar>

    <div class="lc_title">
      <van-grid>
        <draggable v-model="HomeApp" :disabled="disabled" class="van-grid van-hairline--top" @change="dragChange">
          <template v-for="(item, index) in HomeApp">
            <van-grid-item
              class="lc_grid_item"
              id="lc_grid_item"
              :icon="item.icon"
              :key="index"
              :text="item.title"
              :badge="item.bage"
              @click="RemoveApp(item)"
            ></van-grid-item>
          </template>
        </draggable>
      </van-grid>
      

      <van-nav-bar title="" left-text="推薦應用" @click-right="onClickRight">
        <template #left>
          <!-- <h3>推薦應用</h3> -->
          <span class="main_title">推薦應用</span>
          <span
            class="sub_title"
            style="font-size: 9px; padding-top: 4px; color: #999999"
            >點擊添加到首頁應用</span
          >
        </template>
      </van-nav-bar>
      <van-grid>
        <template v-for="(item, index) in RecoApplication">
          <van-grid-item
            class="lc_bage"
            badge="+"
            :icon="item.icon"
            :key="index"
            :text="item.title"
            @click="AddAplicaton(item)"
          />
        </template>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Draggable from "vuedraggable"; //使用自由拖拽組件
export default {
  name: "Home",
  data() {
    return {
      HomeApp: [
        {
          title: "樓盤管理",
          icon: "icon/building_icon.png",
          bage: "",
          sort: 1,
        },
        {
          title: "客戶管理",
          icon: "icon/custome_icon.png",
          bage: "",
          sort: 2,
        },
        {
          title: "公客池",
          icon: "icon/poll_icon.png",
          bage: "",
          sort: 3,
        },
        {
          title: "我的收藏",
          icon: "icon/collection_icon.png",
          bage: "",
          sort: "4",
        },
        {
          title: "工作量化",
          icon: "icon/work-icon.png",
          bage: "",
          sort: "5",
        },
        {
          title: "成交報告",
          icon: "icon/deal_icon.png",
          bage: "",
          sort: "6",
        },
      ],
      RecoApplication: [
        {
          title: "集團資訊",
          icon: "icon/group_icon.png",
          sort: "1",
        },
        {
          title: "每日推薦",
          icon: "icon/group_icon.png",
          sort: "2",
        },
        {
          title: "粵港澳資訊",
          icon: "icon/group_icon.png",
          sort: "3",
        },
        {
          title: "蘋果日報",
          icon: "icon/group_icon.png",
          sort: "4",
        },
      ],
      AppStatus: "編輯",
      index: 0,
      disabled:true
    };
  },
  components: {
    Draggable,
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    more() {
      this.$router.push("More");
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    // 編輯應用
    EditApplication(item) {
      if (this.index === 0) {
        this.AppStatus = "編輯";
      }
      ++this.index;
      if (this.AppStatus == "編輯") {
        this.HomeApp.forEach((item) => {
          item.bage = "-";
        });
        this.disabled=false;
      }
      // 給應用添加移除標籤
      if (this.index === 2) {
        this.AppStatus = "完成";
        this.HomeApp.forEach((item) => {
          item.bage = "";
        });
        this.index = 0;
      }
      // end 給應用添加移除標籤
    },
    // end 編輯應用
    //拖拽應用
    dragChange(e) {
      console.log("觸發事件");
      console.log(e);
    },
    // end 拖拽應用
    // 添加應用
    AddAplicaton(item) {
      //待添加應用
      let obj = item;
      // end 待添加應用
      if (this.AppStatus == "編輯" && this.index == 1) {
        this.HomeApp.push(obj);
        // 通過下標尋找對應的對象
        let lc_index = this.HomeApp.findIndex((item) => item == obj);
        // end 通過下標尋找對應的對象
        this.HomeApp.forEach((item, index) => {
          console.log(item[index]);
          if (index == lc_index) {
            item.bage = "-";
          }
        });
      }
    },
    // end 添加應用
    // 移除應用
    RemoveApp(item) {
      let _temp = item;
      //移除數組單個項目
      if (this.index == 1) {
        this.HomeApp.splice(
          this.HomeApp.findIndex((item) => item === _temp),
          1
        );
      }

      //end 移除數組單個項目
    },
    // end 移除應用
  },
};
</script>

<style lang="scss" scoped>
.sub_title {
  margin-left: 10px;
  color: #999999;
}
.van-grid-item__icon {
  ::v-deep .van-info {
    background-color: #f12945;
  }
}
.main_title {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #333333;
}
.main_sub {
  margin-left: 5.25px;
  font-size: 12px;
  line-height: 16px;
  color: #999999;
}
.btn_eidt {
  width: 66px;
  height: 26px;
  background-color: #f12945;
  border-radius: 4px;
  font-size: 14px;
  line-height: 26px;
  color: #ffffff;
}
/* end 設置bage圖標 */
.lc_title {
  background-color: #fff;
  border-radius: 15px;
  position: relative;
}
body {
  background-color: white;
}

.lc_bage ::v-deep .van-info {
  background-color: #4c89e2;
}

.van-nav-bar__left .van-nav-bar__text {
  font-size: 16px;
  color: #333333;
  font-weight: 700;
}
.van-nav-bar__right .van-nav-bar__text {
  width: 66px;
  height: 26px;
  line-height: 26px;
  background-color: #f12945;
  color: white;
  border-radius: 5px;
}
.van-icon.cross {
  font-size: 28px !important;
  color: #666666 !important;
}
.decrease article {
  position: relative;
  line-height: 22px;
  text-align: center;
  width: 120px;
  font-size: 15px;
  background-color: #fae8da;
  margin: auto;
}
.decrease article img {
  width: 16px;
  position: absolute;
  top: 7px;
  right: 15px;
}
.decrease {
  height: 184px;
  background: url(/icon/card_bg_pic.png) bottom center;
  border: 1px solid #f9e3c5;
}
body {
  overflow: auto !important;
}
.dv {
  flex-direction: column;
}
.van-grid-item__content {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 12px 8px;
  background-color: #fff;
}
.van-grid-item__icon {
  font-size: 43px;
}

.van-swipe__indicators {
  position: absolute;
  bottom: 45px;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
body {
  background: #ebeced;
  overflow: hidden;
}
.my-swipe {
  height: 212px;
}
.my-swipe .van-swipe-item {
  height: 212px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  /* background-color: #39a9ed; */
}
/* 滚动条无法滚动问题修复 */
.van-tabs__content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 999;
  overflow: scroll;
}
[class*="van-hairline"]::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: none;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
</style>