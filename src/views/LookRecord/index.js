/*
 * @Author: luciano 
 * 帶看
 * @Date: 2021-12-17 16:14:28 
 * @Last Modified by: luciano
 * @Last Modified time: 2021-12-17 16:15:11
 */
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
