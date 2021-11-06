<template>
  <div class="contianer">
    <van-sticky>
      <van-nav-bar title="带看记录" left-arrow @click-left="onClickLeft" />
    </van-sticky>

    <van-tabs
      title-inactive-color="#333333"
      title-active-color="#de4135"
      sticky
      @click="lc_click"
    >
      <van-tab title="帶看房源記錄">
        <van-search
          v-model="search"
          placeholder="請輸入樓盤名稱/帶看時間"
          @search="onSearch"
        />
        <van-pull-refresh
          v-model="refresh"
          @refresh="onRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="沒有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in lookRecord" :key="index">
              <template slot="default">
                <div class="lc_container">
                  <div class="lc_container2">
                    <div class="lc_box1">
                      <span class="lc_span">客</span>
                      <div class="lc_box2">6</div>
                    </div>
                    <span class="lc_build_name">{{ item.EstateName }}</span>
                  </div>
                </div>
                <div class="lc_number">
                  {{ item.HouseNo }}
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="帶看客源記錄">
        <van-search
          v-model="search_customer"
          placeholder="請輸入客戶名稱/帶看時間"
          @search="onSearchCustomer"
        />
        <van-pull-refresh
          v-model="refresh_customer"
          @refresh="onRefreshCustomer"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading_customer"
            :finished="finished_customer"
            finished-text="沒有更多了"
            @load="onLoadCustomer"
          >
            <van-cell v-for="(item, index) in lookCustomer" :key="index">
              <template slot="default">
                <div class="lc_customer_container" @click="onCustomerDetail(item)">
                  <template
                    v-if="
                      item.CustomerName.includes('女士') ||
                      item.CustomerName.includes('小姐') ||
                      item.CustomerName.includes('太太')
                    "
                  >
                    <img
                      class="lc_customer_img"
                      src="/icon/nonmember_woman_picture.png"
                    />
                  </template>
                  <template v-else>
                    <img
                      class="lc_customer_img"
                      src="/icon/member_man_picture.png"
                    />
                  </template>

                  <div class="lc_customer_container2">
                    <span class="lc_custom_name">{{ item.CustomerName }}</span>
                    <div class="lc_Estatename">{{ item.EstateName }}</div>
                  </div>
                  <div class="lc_seetime">
                    {{ item.TakeSeeTime | formatDate }}
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import aplush from "@/api/A+";

import formattime from "@/utils/format_time";
export default {
  data() {
    return {
      PageIndex: 1,
      PageSize: 20,
      lcPageIndex: 1,
      lcPageSize: 20,
      refresh: false,
      // 是否加载中
      loading: false,
      finished: false,
      search: "",
      //帶客記錄搜索
      search_customer: "",
      // 帶看房源記錄
      lookRecord: [],
      loading_customer: false,
      finished_customer: false,
      refresh_customer: false,
      //   帶看客源記錄
      lookCustomer: [],
      lc_title: "",
    };
  },
  mounted() {},
  filters: {
    // 时间戳转换
    formatDate(time) {
      if (time) {
        return formattime.format_time(time);
      }
    },
  },
  methods: {
    lc_click(name, title) {
      if (title == "帶看客源記錄") {
        this.lc_title = title;
      }
      console.log(name, title);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch(value) {
      console.log(value);
      
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      this.getDataHouse();
    },
    //帶看房源記錄
    getDataHouse() {
      aplush.apis
        .LookRecordFloor({
          FangH: "",
          EstateNames: this.search,
          BuildingNames: "",
          HouseTypes: "",
          HouseNo: "",
          Floor: "",
        })
        .then((res) => {
          let lc_temp = res.Result;
          if (this.search !== "") {
            this.lookRecord = lc_temp;
          }
          lc_temp.forEach((item, index) => {
            this.lookRecord.push(item);
          });
          this.PageIndex++;
          this.loading = false;
          this.refresh = false;
          if (lc_temp == [] || lc_temp.length == 0) {
            this.finished = true;
          }
        });
    },
    // 帶看客源記錄
    getDataCustomer() {
      aplush.apis
        .LookRecord({
          PageIndex: this.lcPageIndex,
          PageSize: this.lcPageSize,
          InquiryKeyid: "",
          CustomerName: this.search,
        })
        .then((res) => {
          let lc_temp = res.TakeSeeLists;
          lc_temp.forEach((item, index) => {
            this.lookCustomer.push(item);
          });
          this.lcPageIndex++;

          this.loading_customer = false;
          this.refresh_customer = false;

          if (lc_temp.length < this.lcPageSize) {
            this.finished_customer = true;
          }
        });
    },
    onSearch() {
      this.getDataHouse();
    },
    // 帶看客源記錄
    onSearchCustomer() {
      this.getDataCustomer();
    },
    onRefreshCustomer() {
      this.finished_customer = false;
      this.loading_customer = true;
      this.onLoadCustomer();
    },
    onLoadCustomer() {
      this.getDataCustomer();
    },
    //客戶詳情
    onCustomerDetail(item) {
      this.$router.push({
        path: "/CustomerDetail",
        query: {
          id: item.InquiryKeyId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contianer {
  width: 100%;
  height: 100%;
  background: #fff;
  .lc_container {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    .lc_container2 {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      .lc_box1 {
        display: flex;
        justify-content: center;
        width: fit-content;
        align-items: center;
        box-sizing: border-box;
        background-color: #de4135;
        border-radius: 15px;
        padding-right: 2px;
        padding-top: 2px;
        padding-bottom: 2px;
        height: 22px;
        .lc_span {
          color: #ffffff;
          padding-left: 5px;
          padding-right: 2px;
          font-size: 12px;
        }
        .lc_box2 {
          display: flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
          box-sizing: border-box;
          background-color: #ffffff;
          border-radius: 10px;
          font-size: 12px;
          line-height: 17px;
          padding-left: 10px;
          padding-right: 10px;
          height: 17px;
        }
      }
      .lc_build_name {
        margin-left: 3.5px;
        font-size: 16px;
        color: #333333;
      }
    }
  }
  .lc_number {
    font-size: 14px;
    color: #9b9b9b;
  }
  .lc_customer_container {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    .lc_customer_img {
      width: 40px;
      height: 40px;
    }
    .lc_seetime {
      margin-left: auto;
    }
    .lc_customer_container2 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .lc_custom_name {
        color: #333333;
        padding-left: 5px;
        padding-right: 2px;
        font-size: 16px;
      }
      .lc_Estatename {
        color: #9b9b9b;
        padding-left: 5px;
        padding-right: 2px;
        font-size: 14px;
      }
    }
  }
}
</style>