<template>
  <div id="cus">
    <div class="fixed">
      <img src="/icon/new-customers_icon.png" @click="AddCustomer()" alt="" />

      <img src="/icon/poll_float_icon.png" alt="" />
      <img src="/icon/look_icon.png" @click="AddLook()" alt="" />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        margin: auto;
        width: 95%;
        justify-content: end;
      "
    >
      <div style="height: auto; flex: 8">
        <van-search
          class="search"
          style="width: 100%"
          placeholder="輸入姓名／手機/目標樓盤"
          v-model="lc_sccustom"
          @search="onSearch"
        />
      </div>
      <div style="flex: 1" @click="lc_filter">
        <img src="/icon/screen_icon.png" alt="" style="width: 20px" />
      </div>
    </div>

    <article class="lc_article" style="margin-top: 18px; font-size: 14px">
      <section>
        <div>30天租房到期</div>
        <div>渠道來電客</div>
        <div>轉介客</div>
        <div>滿二年</div>
        <div>唯一</div>
      </section>
    </article>
    <van-pull-refresh
      v-model="pullLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="沒有更多了"
        @load="onLoad"
      >
        <nav v-for="(item, index) in CustomList" :key="index">
          <div class="fx">
            <div class="avater">
              <template v-if="item.Male && item.IsVip">
                <img src="/icon/man_vip_pictur.png" alt="" />
              </template>

              <template v-else-if="item.Male && item.IsVip != 'true'">
                <img src="/icon/member_man_picture.png" alt="" />
              </template>

              <template v-else-if="item.Male != 'true' && item.IsVip">
                <img src="/icon/woman_vip_pictur.png" />
              </template>
              <template v-else>
                <img src="/icon/nonmember_woman_picture.png" />
              </template>
              <button>{{ item.InquiryStatus }}</button>
            </div>
            <div style="background-color: #f7f7f7; border-radius: 1px">
              <div class="daikan" style="font-size: 13px">
                <span>{{ item.TakeSeeCount }}</span>
                <div>帶看</div>
              </div>
              <div class="chengjiao" style="font-size: 13px">
                <span>{{ item.ReserveCount }}</span>
                <div>成交</div>
              </div>
            </div>
          </div>
          <div class="fx">
            <aside>
              <div style="font-weight: 700; font-size: 16px">
                {{ item.CustomerName }}
              </div>
              <van-button type="primary" class="btn_f" size="mini">
                {{ item.InquiryTradeType }}
              </van-button>
              <van-button
                type="primary"
                class="btn_s"
                size="mini"
                v-if="item.HouseType"
              >
                {{ item.HouseType }}
              </van-button>
            </aside>
            <aside style="font-size: 14px">
              <div>{{ item.InquiryTradeType }}價：</div>
              <template v-if="item.InquiryTradeType == '租购'">
                {{ item.RentPrice }}元
              </template>
              <template v-else>
                <div>{{ item.SalePrice }}萬</div>
              </template>
            </aside>
            <aside style="font-size: 14px">
              <div>所屬人：</div>
              <div>{{ item.RegPerson }}</div>
            </aside>
            <aside style="font-size: 14px">
              <div>最後跟進：</div>
              <div>{{ item.LastFollowDate }}</div>
            </aside>
            <aside style="font-size: 14px">
              <div>{{ item.Remark }}</div>
            </aside>
          </div>
        </nav>
      </van-list>
    </van-pull-refresh>

    <!-- 客户内容 -->
    <van-popup
      v-model="show_filter"
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      round
    >
      <van-sticky>
        <div class="lc_filter">篩選條件</div>
      </van-sticky>

      <van-divider />
      <div class="lc_layout">
        <!-- 交易類型 -->
        <div class="lc_title" v-if="TransType.SysParameter.ParameterName">
          {{ TransType.SysParameter.ParameterName }}
        </div>
        <div style="display: flex; margin-left: 10px">
          <template v-for="(item, index) in TransType.Items">
            <div
              :class="TransIndex === index ? 'lc_type_active' : 'lc_type'"
              :key="index"
              @click="e_tranType(index)"
            >
              {{ item.ItemName }}
            </div>
          </template>
        </div>
        <!-- end 交易類型 -->
        <!-- 租價 -->
        <div class="lc_title">心裡租價</div>
        <div class="lc_container">
          <input class="lc_input" v-model="start_mindRent" type="text" />
          <div class="lc_divider" />
          <input type="text" v-model="end_mindRent" class="lc_input" />
          <div class="lc_unit">元</div>
        </div>
        <!-- end 租價 -->
        <!-- 購價 -->
        <div class="lc_title">心裡購價</div>
        <div class="lc_container">
          <input class="lc_input" v-model="start_mindBuy" type="text" />
          <div class="lc_divider" />
          <input class="lc_input" v-model="end_mindBuy" type="text" />
          <div class="lc_unit">萬</div>
        </div>
        <!-- end 購價 -->
        <!-- 房型 -->
        <div class="lc_title" v-if="RoomType.SysParameter.ParameterName">
          {{ RoomType.SysParameter.ParameterName }}
        </div>
        <div class="lc_h_layout">
          <div
            style="display: flex; justify-content: center"
            v-for="(item, index) in RoomType.Items"
            :key="index"
          >
            <div
              :class="RoomIndex === index ? 'lc_type_active' : 'lc_type'"
              @click="e_RoomType(index)"
            >
              {{ item.ItemName }}
            </div>
          </div>
        </div>
        <!-- end 房型 -->
        <div class="lc_title">房源歸屬</div>
        <div style="display: flex">
          <input
            type="text"
            v-model="depart_name"
            class="lc_department"
            placeholder="請輸入部門名稱"
          />

          <input
            type="text"
            v-model="sales_man"
            class="lc_sales_man"
            placeholder=" 請輸入業務員姓名"
          />
        </div>
        <div class="lc_title" v-if="Floor.SysParameter.ParameterName">
          {{ Floor.SysParameter.ParameterName }}
        </div>
        <div
          style="display: flex; justify-content: space-evenly; flex-wrap: wrap"
        >
          <template v-for="(item, index) in Floor.Items">
            <div
              style="display: flex; justify-content: center"
              :key="index"
              @click="e_Floor(index)"
            >
              <div :class="FloorIndex === index ? 'lc_type_active' : 'lc_type'">
                {{ item.ItemName }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        style="
          position: relative;
          height: 60px;
          width: 100%;
          display: flex;
          justify-content: center;
        "
      >
        <div style="width: 50%; display: flex; justify-content: center">
          <van-button
            style="display: inline-block; justify-content: center; flex: 1"
            >重置</van-button
          >
        </div>
        <div
          style="width: 50%; display: flex; justify-content: center"
          @click="Custom_filter"
        >
          <van-button
            style="display: inline-block; justify-content: center; flex: 1"
            >確定</van-button
          >
        </div>
      </div>
    </van-popup>
    <!-- end 内容筛选弹出层 -->
  </div>
</template>
<script>
import { Toast } from "vant";
import aplush from "@/api/A+";
import api from '@/api';
export default {
  data() {
    return {
      PageIndex: 1,
      PageSize: 20,
      CustomList: [],
      listLoading: false, //上滑列表加載（每一次上滑的時候)
      finishedList: false, //上滑列表加載完了所有數據（沒有更多了)
      pullLoading: false, //下拉刷新加載動畫
      loading: false,
      finished: false,
      refreshing: false,
      lc_sccustom: "",
      show_filter: false, //过滤内容
      depart_name: "", //部門名稱
      sales_man: "", //業務員
      TransType: {}, //交易类型
      TransIndex: "",
      TransKeyId: "",
      RentMind: "", //心裡租價
      BuyMind: "", // 心裡購價
      DepartName: "", // 部門名稱
      SalesName: "", // 業務員
      Floor: {}, //楼层
      FloorIndex: "", //選中的房型
      FloorKeyId: "",
      RoomType: {}, //房型
      RoomIndex: "",
      RoomKeyId: "",
      start_mindRent: "",
      end_mindRent: "",
      start_mindBuy: "",
      end_mindBuy: "",
      TransKeyId: "", //交易类型的KeyId
      RoomKeyId: "", //房型keyId
    };
  },
  watch: {
    show_filter(newd, old) {},
  },

  async mounted() {
    console.log(this.RoomType);
    aplush.apis
      .SystemType({
        Type: "25",
      })
      .then((res) => {
        console.log("打印交易類型");
        console.log(res.Result);
        this.RoomType = res.Result;
      });
    // end 房型
    // 請求樓層
    aplush.apis
      .SystemType({
        Type: "26",
      })
      .then((res) => {
        console.log("打印交易類型");
        console.log(res.Result);
        this.Floor = res.Result;
        console.log(this.Floor.Items);
      });
    // end 請求樓層

    // 請求交易類型
    aplush.apis
      .SystemType({
        Type: "45",
      })
      .then((res) => {
        console.log("請求交易類型");
        console.log(this.TransType);
        this.TransType = res.Result;
      });
    // end 請求交易類型
  },
  methods: {
    back() {
      this.$router.push("/Mine");
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    tap(index) {
      this.$router.push("/Custom_d");
    },
    // 下拉刷新
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    // end 下拉刷新
    // 上滑加載列表
    onLoad() {
      // if (this.finishedList) return;
      aplush.apis
        .CustomList({
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
          NavigationCategory: 8,
          InquiryCategory: 2,
          PrivateInquiryRange: 4,
          CustomerName: this.lc_sccustom,
          InquiryTradeTypeKeyId: "",
          HouseTypeKeyIds: "",
          SalePriceFrom: "",
          SalePriceTo: "",
          RentPriceFrom: "",
          RentPriceTo: "",
        })
        .then((res) => {
          let lc_temp = res.Inquirys;
          lc_temp.forEach((item) => {
            this.CustomList.push(item);
          });
          this.PageIndex++;

          this.loading = false;
          this.pullLoading= false;
         if(lc_temp.length < this.PageSize){
            this.finished = true;
            
          }
        });
    },
    // end 上滑加載列表
    // 搜索
    onSearch(val) {
      this.PageIndex = 1;
      aplush.apis
        .CustomList({
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
          NavigationCategory: 8,
          InquiryCategory: 2,
          PrivateInquiryRange: 4,
          CustomerName: this.lc_sccustom,
          InquiryTradeTypeKeyId: "",
          HouseTypeKeyIds: "",
          SalePriceFrom: "",
          SalePriceTo: "",
          RentPriceFrom: "",
          RentPriceTo: "",
        })
        .then((res) => {
          this.CustomList = res.Inquirys;
        });
    },
    //end 搜索
    // 过滤
    lc_filter() {
      // 請求房型
      this.show_filter = true;
    },

    // end 过滤
    // 客戶過濾查詢
    Custom_filter() {
      aplush.apis
        .CustomList({
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
          NavigationCategory: 8,
          InquiryCategory: 2,
          PrivateInquiryRange: 4,
          CustomerName: this.lc_sccustom,
          InquiryTradeTypeKeyId: this.TransKeyId, //交易类型
          HouseTypeKeyIds: this.RoomKeyId, //房型
          SalePriceFrom: this.start_mindBuy,
          SalePriceTo: this.end_mindBuy,
          RentPriceFrom: this.start_mindRent,
          RentPriceTo: this.end_mindRent,
        })
        .then((res) => {
          console.log("打印最终结果");
          console.log(res);
          // 查看是否有结果
          this.CustomList = res.Inquirys;
          this.show_filter = false;
          // end 查看是否有结果
        });
    },
    // end 客戶過濾查詢
    // 獲取選中的交易類型
    e_tranType(index) {
      let lc_index = index;
      this.TransType.Items.forEach((item, index) => {
        if (lc_index === index) {
          this.TransIndex = index;
          this.TransKeyId = item.KeyId;
        }
      });
    },
    // end 獲取選中的交易類型
    // 房型點擊事件
    e_RoomType(index) {
      let lc_Roomindex = index;
      this.RoomType.Items.forEach((item, index) => {
        if (lc_Roomindex === index) {
          this.RoomIndex = index;
          this.RoomKeyId = item.KeyId;
        }
      });
    },
    // end 房型點擊事件
    // 获取选中的楼层
    e_Floor(index) {
      let lc_FloorIndex = index;
      this.Floor.Items.forEach((item, index) => {
        if (lc_FloorIndex === index) {
          this.FloorIndex = index;
          this.FloorKeyId = item.KeyId;
        }
      });
    },
    // end 获取选中的楼层
    // 新增客户
    AddCustomer() {
      console.log("lc go page");
      this.$router.push("AddCustomer");
    },
    // end 新增客户
    // 添加帶看
    AddLook() {
      console.log("lc go page");
      // 跳轉到帶看頁面
      this.$router.push("LookRecord");

    },
    // end 添加帶看
  },
};
</script>

<style scoped lang="scss">
.fixed img:nth-child(1) {
  right: 0;
  position: fixed;
  width: 60px;
  bottom: 250px;
  z-index: 3333;
}
.fixed img:nth-child(2) {
  bottom: 120px;
  right: 0;
  position: fixed;
  width: 60px;
  z-index: 3333;
}
.fixed img:nth-child(3) {
  bottom: 185px;
  right: 0;
  position: fixed;
  width: 60px;
  z-index: 3333;
}
.van-icon-search::before {
  content: "\F0AF";
  color: #ccc !important;
}
#cus {
  background-color: #fff;
}
.avater {
  img {
    width: 65px;
  }
  button {
    border-radius: 8px;
    width: 42px;
    height: 18px;
    font-size: 9px;
    position: relative;
    top: -35px;
    border: 0;
    background-color: #fff;
    box-shadow: 0px 0px 3px 1px rgba(110, 26, 26, 0.28);
  }
}
article {
  width: 343px;
  margin: auto;
  section {
    width: 263px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    div {
      margin: 2px 0 2px 5px;
      padding: 8px;
      background-color: #fdf1db;
      font-size: 14px;
    }
  }
}
nav {
  margin: 18px auto;
  width: 343px;
  padding: 9px;
  border-radius: 5px;
  display: flex;
  box-shadow: 0px 0px 12px 0.5px rgba(110, 26, 26, 0.18);

  .daikan {
    padding: 15px;
  }

  span {
    color: #de4135;
    font-weight: 700;
  }

  .fx:nth-child(1) {
    text-align: center;
    flex: 1;
  }

  .fx:nth-child(2) {
    flex: 3.5;
  }
  .fx aside:nth-child(2) {
    font-size: 15px;
    color: #f12945;
    font-weight: 700;
  }
  .fx aside:nth-child(3) div:nth-child(1) {
    color: #999;
  }
  .fx aside:nth-child(4) div:nth-child(1) {
    color: #999;
  }

  .fx aside {
    align-items: center;
    padding: 8px;
    display: flex;

    .btn_f {
      // width: 46px;
      width: auto;
      background-color: #f12945;
      margin: 0 5px;
      border: 0;
      span {
        color: #fff !important;
      }
    }

    .btn_s {
      width: auto;
      // width: 46px;
      background-color: #fff;
      border: solid 1px #313e60;
      margin: 0 5px;
      span {
        color: #333 !important;
      }
    }
  }

  .fx aside:last-child {
    padding-top: 22px;
  }
}

.van-search {
  height: 46px;
}
.lc_filter {
  font-size: 14px;
  position: relative;
  text-align: center;
  font-size: 14px;
  margin-top: 17.5px;
  margin-bottom: 17.5px;
}
.lc_title {
  font-size: 14px;
  margin-left: 17.5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.lc_container {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.lc_divider {
  width: 15.5px;
  height: 2px;
  background: #cccccc;
  margin: 0 2px;
}
.lc_type_active {
  width: fit-content;
  background-color: #f5dbd9;
  border-radius: 17.9px;
  font-size: 12px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 10px;
  color: #de4135;
}
.lc_type {
  background-color: #f4f4f4;
  border-radius: 17.9px;
  font-size: 12px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 10px;
  color: #666666;
}
.lc_input {
  width: 100px;
  // margin-left: 10px;
  height: 29px;
  border: none;
  outline: none;
  background: #dddddd;
  border-radius: 17.9px;
  color: #666666;
  padding: 5px;
  font-size: 16px;
  text-align: center;
}
.lc_department {
  display: inline-block;
  width: 50%;
  height: 29px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-size: 14px;
  margin: 10px 10px;
  background-color: #f4f4f4;
  padding: 10px;
  color: #666666;
}
.lc_sales_man {
  display: inline-block;
  width: 50%;
  height: 29px;
  border-radius: 20px;
  outline: none;
  border: none;
  font-size: 14px;
  margin: 10px 10px;
  background-color: #f4f4f4;
  padding: 10px;
  color: #666666;
}
.lc_h_layout {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
}
.lc_layout {
  position: relative;
  height: calc(100% - 120px);
  overflow-y: scroll;
}
input::-webkit-input-placeholder {
  // font-family: "\5FAE\8F6F\96C5\9ED1";
  // font-weight: 400;
  // font-style: normal;
  // font-size: 12px;
  // color: #000000;
  // text-align: left;
  margin-left: 20px;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */

  margin-left: 20px;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */

  margin-left: 20px;
}
input:-ms-input-placeholder {
  margin-left: 20px;
}
.lc_unit {
  width: 70px;
  font-size: 14px;
}
.lc_article {
  margin-top: 18px;
  font-size: 14px;
  color: #666666;
}
</style>
