/*
 * @Author: luciano 
 * 客戶詳情
 * @Date: 2021-12-17 16:06:16 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-02-23 17:19:49
 */

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
          console.log('this.customer')
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
        path: "/AddFollow",
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