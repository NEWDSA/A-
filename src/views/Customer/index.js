/*
 * @Author: luciano
  客戶管理 操作
 * @Date: 2021-12-17 11:38:35
 * @Last Modified by: luciano
 * @Last Modified time: 2022-02-09 11:20:26
 */
import axios from "axios";
import {
  Toast
} from "vant";
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
      search_content: "", // 搜索內容
      PeopleInfo: [], // 人員信息
      SearchPerson: '',
      suggest: [],
      lc_type: "" //智能查詢建議
    };
  },
  watch: {
    show_filter(newd, old) {},
  },
  async mounted() {
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
      Toast("点击了" + index);
      // this.$router.push("/Custom_d");
      this.$router.push('CustomerDetail');
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
      let result = this.Custom_selected.join(",");
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
          console.log('CustomList',this.CustomList)
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
          console.log('CustomList',this.CustomList)
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
    Get_KeyReceiver(val, type) {
      this.get_suggest(val, type);
    },
    Cancel_Search() {
      Toast('放弃搜索')
    },
    //獲取智能提示
    get_suggest(val, type) {
      aplush.apis
        .SelectPerson({
          KeyWords: val,
          AutoCompleteType: type,
        })
        .then((res) => {
          this.suggest = res;
        });
    },
    // 部門提示
    e_depart_name(val, type) {
      this.show_tips = true;
      this.search_content = val;
      this.lc_type = type;
      this.get_suggest(val, type);
    },
    KeyReceiver_Select(index) {
      this.KeyReceiver_keyId = this.suggest.UserDepartmentDatas[index].ResultKeyId; //收匙人keyId
      // this.KeyReceiver_Department_keyId = this.suggest.UserDepartmentDatas[index].DepartmentKeyId, //收匙人部門keyId
      this.$refs.radiochecks[index].toggle();
    },
    // 收匙人選中事件
    KeyReceiver_change(e) {

      this.suggest.UserDepartmentDatas.forEach((item, index) => {
        if (index === e) {
          this.lc_type === 2 ? this.depart_name = this.search_content = item.ResultName : this.lc_type === 1 ? this.sales_man = this.search_content = item.ResultName:''
        }
      });
    },
    // 关闭显示
    close_item(){
        this.show_tips=false;
        this.SearchPerson='';

    },
    // 設置VIP
    setVIP(IsVip,keyId) {
      if(IsVip){
        this.cancel_Vip(keyId)
      }else{
      this.Settings_VIP(keyId)
      }

    },
    Settings_VIP(keyId){
      let keyId_arr=[]
      keyId_arr.push(keyId)
      aplush.apis.AddVip(
        keyId_arr
      ).then(res=>{
        console.log('打印最終結果');
        console.log(res);
        res.flag===1?Toast('設置成功'):Toast(res.ErrorMsg);
      })
    },
    // 取消VIP
    cancel_Vip(keyId){
      let keyId_arr=[]
      keyId_arr.push(keyId)
      aplush.apis.cancelVip(keyId_arr).then((res)=>{
        res.flag===1?Toast('已取消'):Toast(res.ErrorMsg);
      })
    },
    // 重置查詢條件
    reset_filter(){
      this.TransIndex='';
      this.start_mindRent='';
      this.end_mindRent='';
      this.start_mindBuy='';
      this.end_mindBuy='';
      this.RoomIndex='';
      this.depart_name='';
      this.sales_man='';
      this.FloorIndex='';
      // this.get_suggest('');

    },
    // 客戶詳情
    Customer_Details(val) {
      this.$router.push({
        path: "/CustomerDetail",
        query: {
          id: val,
        },
      });
    }

  },
};
