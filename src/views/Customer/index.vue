<template>
  <div id="cus">
    <div class="fixed">
      <img src="/icon/new-customers_icon.png" alt="" />
      <img src="/icon/poll_float_icon.png" alt="" />
      <img src="/icon/look_icon.png" alt="" />
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
        />
      </div>
      <div style="flex: 1">
        <img src="/icon/screen_icon.png" alt="" style="width: 20px" />
      </div>
    </div>

    <article style="margin-top: 18px; font-size: 14px">
      <section>
        <div>30天租房到期</div>
        <div>渠道來電客</div>
        <div>轉介客</div>
        <div>滿二年</div>
        <div>唯一</div>
      </section>
    </article>
    <!-- 客户内容 -->
    <!-- <nav v-for="(item, index) in 13" @click="tap(index)" :key="index">
      <div class="fx">
        <div class="avater">
          <img src="/icon/man_vip_pictur.png" alt="" />
          <button>有效</button>
        </div>

        <div class="daikan" style="font-size: 13px">
          <span>2</span>
          <div>帶看</div>
        </div>

        <div class="chengjiao" style="font-size: 13px">
          <span>0</span>
          <div>成交</div>
        </div>
      </div>

      <div class="fx">
        <aside>
          <div style="font-weight: 700; font-size: 16px">洪先生</div>
          <van-button type="primary" class="btn_f" size="mini">
            求購</van-button
          >
          <van-button type="primary" class="btn_s" size="mini">
            三居</van-button
          >
        </aside>

        <aside style="font-size: 14px">
          <div>求購價：</div>
          <div>100-300萬</div>
        </aside>

        <aside style="font-size: 14px">
          <div>所屬人：</div>
          <div>庄耀璟 Ken Chong HM5</div>
        </aside>

        <aside style="font-size: 14px">
          <div>最後跟進：</div>
          <div>2021-08-20</div>
        </aside>

        <aside style="font-size: 14px">
          <div>意向泰和中央，想投160萬左右</div>
        </aside>
      </div>
    </nav> -->
    <van-pull-refresh
      v-model="pullLoading"
      @refresh="onPullRefresh"
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
            <div class="daikan" style="font-size: 13px">
              <span>{{ item.TakeSeeCount }}</span>
              <div>帶看</div>
            </div>
            <div class="chengjiao" style="font-size: 13px">
              <span>{{ item.ReserveCount }}</span>
              <div>成交</div>
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
    <div style="height: 50px"></div>
  </div>
</template>
<script>
import { Toast } from "vant";
import aplush from "@/api/A+";
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
    };
  },
  mounted() {
    let params = {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      NavigationCategory: 8,
      InquiryCategory: 2,
      PrivateInquiryRange: 4,
      CustomerName: "",
      InquiryTradeTypeKeyId: "",
      HouseTypeKeyIds: "",
      SalePriceFrom: "",
      SalePriceTo: "",
      RentPriceFrom: "",
      RentPriceTo: "",
    };
    aplush.apis.CustomList(params).then((res) => {
      this.CustomList = res.Inquirys;
      console.log("打印客户列表");
      console.log(this.CustomList);
    });
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
    onPullRefresh() {
      ++this.pageIndex;
      aplush.apis
        .CustomList({
          PageIndex: this.pageIndex,
          PageSize: this.PageSize,
          NavigationCategory: 8,
          InquiryCategory: 2,
          PrivateInquiryRange: 4,
          CustomerName: "",
          InquiryTradeTypeKeyId: "",
          HouseTypeKeyIds: "",
          SalePriceFrom: "",
          SalePriceTo: "",
          RentPriceFrom: "",
          RentPriceTo: "",
        })
        .then((res) => {
          this.pullLoading = false;
          let lc_temp = res.PropertysModel;
          console.log(lc_temp);
          // lc_temp.forEach((item) => {
          //   this.HouseList.push(item);
          // });
          // if (res.res.PropertysModel.length == 0) {
          //   this.finishedList = 0;
          //   this.pullLoading = false;
          // }
        });
    },
    // end 下拉刷新
    // 上滑加載列表
    onLoad() {
      if (this.finishedList) return;
      ++this.pageIndex;
      aplush.apis
        .CustomList({
          PageIndex: this.pageIndex,
          PageSize: this.PageSize,
          NavigationCategory: 8,
          InquiryCategory: 2,
          PrivateInquiryRange: 4,
          CustomerName: "",
          InquiryTradeTypeKeyId: "",
          HouseTypeKeyIds: "",
          SalePriceFrom: "",
          SalePriceTo: "",
          RentPriceFrom: "",
          RentPriceTo: "",
        })
        .then((res) => {
          let lc_temp = res.PropertysModel;
          lc_temp.forEach((item) => {
            this.HouseList.push(item);
          });

          this.loading = false;
          if (lc_temp == null || lc_temp == "" || lc_temp == 0) {
            this.finished = true;
          }
        });
    },
    // end 上滑加載列表
  },
};
</script>

<style scoped lang="scss">
.fixed img:nth-child(1) {
  right: 0;
  position: fixed;
  width: 60px;
  bottom: 250px;
}
.fixed img:nth-child(2) {
  bottom: 120px;
  right: 0;
  position: fixed;
  width: 60px;
}
.fixed img:nth-child(3) {
  bottom: 185px;
  right: 0;
  position: fixed;
  width: 60px;
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
      width: 46px;
      background-color: #f12945;
      margin: 0 5px;
      border: 0;
      span {
        color: #fff !important;
      }
    }

    .btn_s {
      width: 46px;
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
</style>
