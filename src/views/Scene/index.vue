
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
        <div class="collapse">
          <div class="title">房源圖片</div>
          <div class="lc_container">
            <select name="build" v-model="selected" @change="getTypeSelected">
              <option value="">全部</option>
              <!-- 戶型圖 -->

              <option
                v-for="(item, index) in House_Type"
                :value="item.SysParameter.ParameterType"
              >
                {{ item.SysParameter.ParameterName }}
              </option>
              <!-- 室內圖 -->
              <option
                v-for="(item, index) in lc_IndoorMap"
                :value="item.SysParameter.ParameterType"
              >
                {{ item.SysParameter.ParameterName }}
              </option>
              <!-- 小區圖 -->

              <option
                v-for="(item, index) in Polt"
                :value="item.SysParameter.ParameterType"
              >
                {{ item.SysParameter.ParameterName }}
              </option>

              <!-- 景觀圖 -->
              <option 
                v-for="(item, index) in Landscape"
                :value="item.SysParameter.ParameterType"
              >
                {{ item.SysParameter.ParameterName }}
              </option>
            </select>

            <select
              @change="other_change"
              v-model="other_select"
              v-show="selectType.length > 0"
              name="built"
            >
              <option value="">全部</option>
              <option v-for="(item, index) in selectType" :value="item.KeyId">
                {{ item.ItemName }}
              </option>
            </select>
            <div class="title">上傳時間</div>
            <div style="display: flex">
              <input v-model="start_time" id="date" type="date" />
              <input
                @change="select_change"
                v-model="end_time"
                id="date"
                type="date"
              />
            </div>
            <template v-if="IndoorMap.length > 0">
              <div
                v-for="(item, indx) in IndoorMap"
                style="width: 100%; display: flex; justify-content: center"
              >
                <van-image
                  width="95%"
                  radius="0.20rem"
                  round
                  :src="item.PhotoPath"
                >
                  <template v-slot:error>加载失败</template>
                </van-image>
              </div>
            </template>

            <div v-if="IndoorMap.length == 0">
              <div style="font-size: 14px">暫無數據</div>
            </div>
          </div>
        </div>
      <!-- </van-tab>
    </van-tabs> -->
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
import {
  title
} from "@/settings";
import formattime from "@/utils/format_time";
export default {
  data() {
    return {
      navbar_left_text: "",
      navbar_right_text: "上傳",
      navbar_title: "現場相記錄",
      House_Type: [],
      lc_IndoorMap: [],
      IndoorMap: [],
      Polt: [],
      Landscape: [],
      active: "现场相",
      selected: "",
      other_select: "", // 其他選項
      selectType: [], //右側選項
      start_time: "", // 上傳開始時間
      end_time: "", // 上傳結束時間

    };
  },
  mounted(){
    this.base_system();
  },
  methods: {
    navbar_left_click() {
      this.$router.go(-1);
    },
    navbar_right_click() {
      // this.$router.go(-1);
      this.$router.push({
        path: "/AddScene"
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
    lc_vant_click(name, title) {
      console.log("現場相復合內容");
      // console.log(name);
      console.log(title);
      title == "現場相" ?
        this.M_live_Pohto() :
        title == "放盤紙" ?
        this.Get_Paper() :
        title == "鑰匙" ?
        this.Get_Key() :
        "";
    },
    other_change() {
      this.Scene_keyId = this.other_select;
      this.Pic_base();
    },
    select_change() {
      // 獲取房源現場相
      this.Pic_base();
    },
    // 現場相
    M_live_Pohto() {
      this.Pic_base();
    },
    Pic_base() {
      let that = this;
      aplush.apis
        .ListingPhoto({
          propertyKeyId: this.$route.query.KeyId,
          PhotoTypeKeyId: this.Scene_keyId,
        })
        .then((res) => {
          this.IndoorMap = res._Photos;
          console.log("現場相44444");
          console.log(this.IndoorMap);
        });
    },
    getTypeSelected() {
      switch (this.selected) {
        case 56:
          this.House_Type.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 2:
          this.lc_IndoorMap.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 1:
          this.Polt.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 133:
          this.Landscape.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        default: {
          this.selectType = [];
        }
      }
    },
    base_system() {
      this.Type = 56; //戶型圖
      aplush.apis.SystemType({
        Type: this.Type
      }).then((res) => {
        this.House_Type.push(res.Result);
        console.log("打印戶型圖");
        console.log(this.House_Type);
        this.Type = 2; //室內圖
        aplush.apis.SystemType({
          Type: this.Type
        }).then((res) => {
          this.lc_IndoorMap.push(res.Result);
          this.Type = 1; //小區圖
          aplush.apis.SystemType({
            Type: this.Type
          }).then((res) => {
            this.Polt.push(res.Result);
            this.Type = 133; //景觀圖
            aplush.apis.SystemType({
              Type: this.Type
            }).then((res) => {
              this.Landscape.push(res.Result);
            });
          });
        });
      });
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
    .title{
      font-size: 16px;
      padding: 10px;
    }
    .lc_container{
      width: 100%;
      padding: 10px;
    }
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
  .lc_btn1 {
    height: 34px;
    background-color: #e0efff;
    border-radius: 17px;
    border: solid 0.5px #c7e1ff;
    color: #2c81e1;
    font-size: 14px;
  }
}
</style>