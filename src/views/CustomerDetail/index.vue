<template>
  <div class="customer-detail">
    <van-sticky>
      <van-nav-bar
        title="客戶詳情"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </van-sticky>
    <van-card>
      <template #title>
        <div
          v-for="(item, index) in customer.Contacts"
          :key="index"
          style="
            display: flex;
            align-items: center;
            background-color: #ffffff;
            padding-left: 30px;
          "
        >
          <div style="width: 50%">
            <div
              style="width: fit-content; margin-left: 10px; margin-top: 10px"
            >
              <template
                v-if="
                  item.Gender == '女士' ||
                  item.Gender == '小姐' ||
                  (item.Gender == '太太' && customer.IsVip)
                "
              >
                <img style="width: 70px" src="/icon/woman_vip_pictur.png" />
              </template>
              <template
                v-else-if="
                  item.Gender == '女士' ||
                  item.Gender == '小姐' ||
                  (item.Gender == '太太' && customer.IsVip == false)
                "
              >
                <img
                  style="width: 40px"
                  src="/icon/nonmember_woman_picture.png"
                />
              </template>
              <template v-else-if="item.Gender == '先生' && customer.IsVip">
                <img style="width: 40px" src="/icon/man_vip_pictur.png" />
              </template>
              <template v-else>
                <img style="width: 40px" src="/icon/member_man_picture.png" />
              </template>
              <div
                style="
                  width: fit-content;
                  box-sizing: border-box;
                  border-radius: 8px;
                  box-shadow: 0px 0px 3px 1px rgba(110, 26, 26, 0.28);
                  background-color: #ffffff;
                  margin: 0px 0px 0px 10px;
                  padding: 0 10px 0 10px;
                  position: relative;
                  top: -13px;
                  left: 3px;
                  color: #de4135;
                  font-size: 12px;
                "
              >
                {{ item.Gender }}
              </div>
            </div>
            <div style="width: 100%" v-if="customer.Flag">
              <span>有效</span>
            </div>
          </div>

          <div style="margin-left: 5px; width: 50%">
            <div v-if="item.Mobile">手機:{{ item.Mobile }}</div>
            <div v-if="item.Tel">座機:{{ item.Tel }}</div>
            <div v-if="item.QQ">QQ:{{ item.QQ }}</div>
            <div v-if="item.Wechat">微信:{{ item.Wechat }}</div>
            <div v-if="item.DoB">生日:{{ item.DoB }}</div>
            <div v-if="item.Address">地址:{{ item.Address }}</div>
            <div v-if="item.Remark">備註:{{ item.Remark }}</div>
          </div>
        </div>
      </template>
    </van-card>
    <div class="lc_title">客戶需求</div>
    <van-divider />

    <div class="lc_house_container">
      <div class="lc_content">
        <span class="lc_trans">交易類型: </span>
        {{ customer.Parameter.InquiryTradeType }}
      </div>
      <div class="lc_content">
        <span class="lc_trans">心裡租價</span>
        {{ customer.Parameter.RentPrice }}
      </div>
      <div class="lc_content">
        <span class="lc_trans"> 房型 </span>

        {{ customer.Parameter.HouseType }}
      </div>
      <div class="lc_content">
        <span class="lc_trans"> 面積 </span>

        {{ customer.Parameter.Area }}
        <!-- <span v-if="item.HouseAreaUnit == '平方米'">平方米</span>
          <span v-if="item.HouseAreaUnit == '坪'">坪</span> -->
      </div>

      <div class="lc_content">
        <span class="lc_trans"> 朝向 </span>
        {{ customer.Parameter.HouseDirection }}
      </div>
      <!-- 樓層 -->
      <div class="lc_content">
        <span class="lc_trans"> 樓層 </span>
        {{ customer.Parameter.HouseFloor }}
      </div>
      <!-- 裝修情況 -->
      <div class="lc_content">
        <span class="lc_trans"> 裝修 </span>
        {{ customer.Parameter.DecorationSituation }}
      </div>
      <!-- 購房原因 -->
      <div class="lc_content">
        <span class="lc_trans"> 購房原因 </span>
        {{ customer.Parameter.BuyReason || "" }}
      </div>
      <!-- 來源 -->
      <div class="lc_content" v-if="customer.ParameterInquirySource">
        <span class="lc_trans">來源</span>
        {{ customer.ParameterInquirySource }}
      </div>
    </div>
    <!-- 跟進記錄 、帶看記錄 -->
    <van-tabs title-inactive-color="#333333" title-active-color="#de4135">
      <van-tab title="跟進記錄">
        <div class="lc_table_container">
          <table class="lc_table">
            <tr>
              <th>跟進內容</th>
              <th>業務員</th>
              <th>跟進時間</th>
            </tr>
            <tr v-for="(item, index) in CustomFollowUp.InqFollows" :key="index">
              <td>{{ item.FollowContent }}</td>
              <td>{{ item.FollowPerson }}</td>
              <td>{{ item.FollowDate }}</td>
            </tr>
          </table>
        </div>
      </van-tab>
      <van-tab title="帶看記錄">
        <div class="lc_table_container">
          <table class="lc_table">
            <tr>
              <th>房源樓盤</th>
              <th>帶看時間</th>
              <th>帶看人員</th>
              <th>帶看內容</th>
            </tr>
            <tr
              v-for="(item, index) in CustomTakeLook.TakeSeeLists"
              :key="index"
            >
              <td>{{ item.EstateName }}</td>
              <td>{{ item.TakeSeeTime | formatDate }}</td>
              <td>{{ item.LookWithUserName }}</td>
              <td>{{ item.Content }}</td>
            </tr>
          </table>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 新增跟進、錄入帶看 -->
    <div class="lc_follow">
      <img src="/icon/float_follow-up_icon.png" />
      <img src="/icon/float_seeing-look_icon.png" @click="onClickLookRecord" />
    </div>
  </div>
</template>

<script>
import formattime from "@/utils/format_time";
import aplush from "@/api/A+";
export default {
  data() {
    return {
      customer: {
        Parameter: {
          HouseType: "",
          Area: "",
          HouseDirection: "",
          HouseFloor: "",
          DecorationSituation: "",
          BuyReason: "",
          Source: "",
        },
      },
      //   客戶跟進
      CustomFollowUp: [],
      //   客戶帶看記錄
      CustomTakeLook: [],
    };
  },
  filters: {
    // 时间戳转换
    formatDate(time) {
      if (time) {
        return formattime.format_time(time);
      }
    },
  },
  mounted() {
    this.getCustomer();
    //獲取客戶跟進
    this.getCustomerFollowUp();
    //獲取客戶帶看記錄
    this.getCustomerTakeLook();
  },
  methods: {
    async getCustomer() {
      //獲取客戶詳情

      aplush.apis
        .LookRecordDetail({
          KeyId: this.$route.query.id,
        })
        .then((res) => {
          console.log(res);
          this.customer = res;
          console.log(this.customer);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 獲取客戶跟進
    getCustomerFollowUp() {
      aplush.apis
        .CustomFollow({
          InquiryKeyId: this.$route.query.id,
        })
        .then((res) => {
          console.log(res);
          this.CustomFollowUp = res;
        });
    },
    //獲取客戶帶看記錄
    getCustomerTakeLook() {
      aplush.apis
        .CustomLookRecord({
          InquiryKeyId: this.$route.query.id,
        })
        .then((res) => {
          console.log(res);
          this.CustomTakeLook = res;
        });
    },
    // 新增跟進
    onClickFollowUp() {
      this.$router.push({
        path: "/follow_up",
        query: {
          id: this.$route.query.id,
        },
      });
    },
    // 錄入帶看
    onClickLookRecord() {
      this.$router.push({
        path: "/AddLook",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-detail {
  position: relative;
  width: 100%;
  height: 100%;
  .lc_title {
    font-size: 16px;
    margin-left: 20px;
    position: relative;
    &::before {
      position: relative;
      display: block;
      top: 20px;
      left: -12px;
      content: "";
      width: 4px;
      height: 16px;
      background-color: #de4135;
      border-radius: 2px;
    }
  }
  .lc_house_container {
    .lc_content {
      position: relative;
      font-size: 14px;
      color: #333333;
      margin-left: 20px;
      .lc_trans {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .lc_table_container {
    .lc_table {
      width: 100%;
      font-size: 14px;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
      th {
        font-size: 14px;
        background-color: #f0eeee;
        color: #333333;
        height: 30px;
      }

      td {
        line-height: 30px;
        font-size: 14px;
        padding-left: 20px;
        border-bottom: 1px solid #f0eeee;
      }
      td:nth-child(2) {
        color: #de4135;
      }
    }
  }
  .lc_follow {
    position: fixed;
    right: 20px;
    bottom: 200px;
    display: flex;
    width: 60px;
    flex-direction: column;
    img {
      width: 60px;
    }
  }
  .van-card {
    background-color: #f0eeee;
  }
  .van-card:not(:first-child) {
    margin-top: 0px;
  }
}
</style>