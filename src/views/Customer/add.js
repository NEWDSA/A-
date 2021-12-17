/*
 * @Author: luciano 
 * 添加客户
 * @Date: 2021-12-17 16:03:15 
 * @Last Modified by: luciano
 * @Last Modified time: 2021-12-17 18:14:22
 */
import aplush from "@/api/A+";
import pinyin from "js-pinyin";
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
export default {
  data() {
    return {
      username: "",
      username2: "",
      password: "",
      scustomer_status: false,
      radio: 1,
      message: "222",
      CustomColumn: [],
      CustomType: [],
      CustomType_Title: "",
      CustomerList: {
        SysParameter: {
          ParameterName: "",
        },
      },
      Custom: [],
      Custom_type_show: false,
      PageIndex: 1,
      PageSize: 100,
      ContactList: [], //联系人列表
      FirstPin: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      search_custom: "", //搜索客戶
      contact_show: false, //是否顯示聯繫人
    };
  },
  mounted() {
    //   客戶狀態
    aplush.apis
      .SystemType({
        Type: "52",
      })
      .then((res) => {
        this.CustomerList = res.Result;
        this.CustomerList.Items.forEach((item) => {
          this.CustomColumn.push({
            text: item.ItemName,
            ItemNo: item.ItemNo,
            ItemValue: item.ItemValue,
            FlagDefault: item.FlagDefault,
            ItemStatus: item.ItemStatus,
            AssociatedItemKeyIds: item.AssociatedItemKeyIds,
            Seq: item.Seq,
            CanDelete: item.CanDelete,
            Style: item.Style,
            KeyId: item.KeyId,
          });
        });
      });
    // end 客戶狀態
    // 客户类型
    aplush.apis
      .SystemType({
        Type: "41",
      })
      .then((res) => {
        var CustomType_temp = res.Result;
        CustomType_temp.Items.forEach((item) => {
          this.CustomType.push({
            text: item.ItemName,
            ItemNo: item.ItemNo,
            ItemValue: item.ItemValue,
            FlagDefault: item.FlagDefault,
            ItemStatus: item.ItemStatus,
            AssociatedItemKeyIds: item.AssociatedItemKeyIds,
            Seq: item.Seq,
            CanDelete: item.CanDelete,
            Style: item.Style,
            KeyId: item.KeyId,
          });
        });
      });
    // end 客户类型
    //選擇客戶列表
    aplush.apis
      .CustomList({
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        NavigationCategory: "8",
        InquiryCategory: "2",
        PrivateInquiryRange: "4",
        CustomerName: "",
        InquiryTradeTypeKeyId: "",
        HouseTypeKeyIds: "",
        SalePriceFrom: "",
        SalePriceTo: "",
        RentPriceFrom: "",
        RentPriceTo: "",
      })
      .then((res) => {
        let CityName = {};
        CityName = res.Inquirys;
        let firstName = {};
        //let Contacts = "請求得到的數據";
        // 循環26個字母的數組
        this.FirstPin.forEach((item) => {
          firstName[item] = [];
          CityName.forEach((el) => {
            let first = pinyin.getFullChars(el.CustomerName).substring(0, 1);
            if (first == item) {
              firstName[item].push(el.CustomerName);
            }
          });

          this.ContactList = firstName;
          // end 對比開頭字母是否對應
        });
        // end 循環26個字母的數組
      });
    // end 選擇客戶列表
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    // 提交表單信息
    onSubmit(values) {
      console.log("submit", values);
    },
    // end 提交表單信息
    lc_Type() {
      aplush.apis
        .SystemType({
          Type: "52",
        })
        .then((res) => {
          this.CustomerList = res.Result;

          console.log(this.CustomColumn);
          //   Vue.set(this.CustomerList.SysParameter,ParameterName,res.Result.SysParameter.ParameterName)
        });
    },
    onConfirm(value, index) {
      console.log(value.text);
      this.scustomer_status = false;// 關閉
      // this.username = value;
    },
    onChange(picker, value, index) {
      //   Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.scustomer_status = false;
      //   Toast("取消");
    },
    type_cancel() {
      this.Custom_type_show = false;
    },
    type_confirm() {},
    AddCustomer() {},
    // 搜索客戶
    lc_search_custom() {
      aplush.apis
        .CustomList({
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
          NavigationCategory: "8",
          InquiryCategory: "2",
          PrivateInquiryRange: "4",
          CustomerName: this.search_custom,
          InquiryTradeTypeKeyId: "",
          HouseTypeKeyIds: "",
          SalePriceFrom: "",
          SalePriceTo: "",
          RentPriceFrom: "",
          RentPriceTo: "",
        })
        .then((res) => {
          let CityName = {};
          CityName = res.Inquirys;
          let firstName = {};
          this.FirstPin.forEach((item) => {
            firstName[item] = [];
            CityName.forEach((el) => {
              let first = pinyin.getFullChars(el.CustomerName).substring(0, 1);
              if (first == item) {
                firstName[item].push(el.CustomerName);
              }
            });

            this.ContactList = firstName;
            // end 對比開頭字母是否對應
          });
        });
    },
    // end 搜索客戶
    // 選中聯繫人
    click_customer(item) {
      console.log("選中的聯繫人");
      this.username2 = item;
      console.log(item);
    },
    // end 選中聯繫人
    customerLeft() {
      this.contact_show = false;
    },
    onInput(){
      
    }
  },
};