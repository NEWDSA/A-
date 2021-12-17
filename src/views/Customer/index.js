/*
 * @Author: luciano 
  客戶管理 操作
 * @Date: 2021-12-17 11:38:35 
 * @Last Modified by: luciano
 * @Last Modified time: 2021-12-17 11:57:01
 */
  import axios from "axios";
  import { Toast } from "vant";
  import aplush from "@/api/A+";
  import api from "@/api";
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
        Custom_Status: [], // 客源狀態
        Custom_selected: [], // 客源列表
        show_tips: false, // 顯示智能提示
        search_content: "",// 搜索內容
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
          this.RoomType = res.Result;
        });
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
      aplush.apis
        .SystemType({
          Type: "58",
        })
        .then((res) => {
          this.Custom_Status = res.Result;
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
      onRefresh() {
        this.finished = false;
        this.loading = true;
        this.onLoad();
      },
      // 選擇標籤
      Customer_status(item) {
        let lc_keyId = item;
        this.Custom_Status.Items.forEach((item, index) => {
          if (item.KeyId === lc_keyId)
            if (item.isSelected === true) {
              //判斷是否為選中
              this.$set(this.Custom_Status.Items[index], "isSelected", false);
              this.Custom_selected.splice(item.index, 1);
            } else {
              this.$set(this.Custom_Status.Items[index], "isSelected", true);
              this.Custom_selected.push(lc_keyId);
            }
        });
        console.log(this.Custom_Status.Items);
        let result = this.Custom_selected.join(",");
        console.log(result);
        aplush.apis
          .CustomList({
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
            NavigationCategory: 8,
            InquiryCategory: 2,
            PrivateInquiryRange: 4,
            CustomerName: this.lc_sccustom,
            InquiryTradeTypeKeyId: result, //交易类型
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
      // 上滑加載列表
      onLoad() {
        aplush.apis
          .CustomList({
            PageIndex: this.PageIndex,
            PageSize: this.PageSize,
            NavigationCategory: 8,
            InquiryCategory: 2,
            PrivateInquiryRange: 4,
            CustomerName: this.lc_sccustom,
            InquiryTradeTypeKeyId: "", //交易类型
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
            this.pullLoading = false;
            if (lc_temp.length < this.PageSize) {
              this.finished = true;
            }
          });
      },
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
      // 过滤
      lc_filter() {
        // 請求房型
        this.show_filter = true;
      },
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
      // 新增客户
      AddCustomer() {
        console.log("lc go page");
        this.$router.push("AddCustomer");
      },
      // 添加帶看
      AddLook() {
        console.log("lc go page");
        // 跳轉到帶看頁面
        this.$router.push("LookRecord");
      },
      //獲取智能提示
      get_suggest(val,type) {
        aplush.apis
          .SelectPerson({
            Keyword: val,
            Type: type,
          })
          .then((res) => {
            this.suggest = res.Suggestions;
          });
      },
      // 部門提示
      e_depart_name(val) {
          this.show_tips=true;
        // this.lc_sccustom = val;
        // this.suggest = [];
      },
  
    },
  };