/*
 * @Author: luciano 
 * 添加客户
 * @Date: 2021-12-17 16:03:15 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-02-22 15:47:56
 */
import aplush from "@/api/A+";
import pinyin from "js-pinyin";
import formattime from "@/utils/format_time";
// pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
export default {
  data() {
    return {
      customerStatus: "", // 客戶狀態
      customerType: "", //客戶類型
      username: "", //姓名
      birthday_show: false, // 生日
      password: "", //密碼
      phone: "", //座機電話1
      phone2: "", //座機電話2
      scustomer_status: false,
      radio: 1,
      message: "",
      CustomColumn: [],
      CustomType: [],
      CustomType_Title: "",
      CustomerList: {
        SysParameter: {
          ParameterName: "",
        },
      },
      transactionType: [], // 交易類型
      Custom: [],
      Custom_type_show: false,
      PageIndex: 1,
      PageSize: 100,
      ContactList: [], //联系人列表
      search_custom: "", //搜索客戶
      gender_title: [], // 稱謂
      gender: "", //性別
      gender_index: "", //下標
      gender_show: false,
      gender_radio: "", // 性別
      birthday: "", // 生日
      wechat: "", //微信
      QQ: "", //QQ
      remark: "", // 備註
      mind_buy_price_start: "", // 心裡購價開始
      mind_buy_price_end: "", // 心裡購價結束
      mind_rent_price_start: "", //心裡租價開始
      mind_rent_price_end: "", // 心裡租價結束
      room_type: "", // 房型
      area_start: "", // 面積開始
      area_end: "", // 面積結束
      direction: "", // 朝向
      floor: "", //樓層
      decoration: "", // 裝修情況
      buy_reason: "", // 購房原因
      buy_reasonList: [],
      buyReasonKeyId: "", // 購房原因keyId
      source_type: "", // 來源
      referrer_name: "", // 轉介人
      currentDate: new Date(),
      prefix_phone: "", //手機前綴
      prefix_phone2: "", // 座機前綴
      phone2: "", // 座機
      roomTypeKeyId: "", // 房型keyId
      area_code: [], // 區號
      area_show: false,
      username: "", //姓名
      gender: "",
      attribute: "",
      attributeCode: "",
      phone: "",
      phone2: "",
      birthday: "",
      wechat: "",
      QQ: "",
      customerSource: [], // 客戶來源
      customerKeyId: "", // 客戶keyId
      source_show: false,
      source_typeKeyId: "", // 來源keyId
      //direction: [], // 朝向
      orientation_show: false,
      orientation_radio: "", // 朝向
      Orientation: [], // 朝向
      orientation_text: "", //朝向label
      HouseType: [], // 房型
      showRoomType: false,
      room_type: "",
      floor_show: false, // 樓層顯隱
      floor_list: [], // 樓層
      floorKeyId: "", // 樓層keyId
      decoration_show: false, // 裝修情況顯隱
      decoration_list: [], // 裝修情況
      subjectKeyId: "", // 主體類型keyId
      customerStatusId: "", //客戶狀態keyId
      decorationKeyId: "", // 裝修情況keyId
      buy_show: false, // 購房原因顯隱
      CustomerContacts: [], // 客戶聯繫人
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
    // 交易類型
    aplush.apis.SystemType({
      Type: "45",
    }).then(res => {
      this.transactionType = res.Result.Items;
    })
    //選擇客戶列表
    // aplush.apis
    //   .CustomList({
    //     PageIndex: this.PageIndex,
    //     PageSize: this.PageSize,
    //     NavigationCategory: "8",
    //     InquiryCategory: "2",
    //     PrivateInquiryRange: "4",
    //     CustomerName: "",
    //     InquiryTradeTypeKeyId: "",
    //     HouseTypeKeyIds: "",
    //     SalePriceFrom: "",
    //     SalePriceTo: "",
    //     RentPriceFrom: "",
    //     RentPriceTo: "",
    //   })
    //   .then((res) => {
    //     let CityName = {};
    //     CityName = res.Inquirys;
    //     let firstName = {};
    //     //let Contacts = "請求得到的數據";
    //     // 循環26個字母的數組
    //     this.FirstPin.forEach((item) => {
    //       firstName[item] = [];
    //       CityName.forEach((el) => {
    //         let first = pinyin.getFullChars(el.CustomerName).substring(0, 1);
    //         if (first == item) {
    //           firstName[item].push(el.CustomerName);
    //         }
    //       });

    //       this.ContactList = firstName;
    //       // end 對比開頭字母是否對應
    //     });
    //     // end 循環26個字母的數組
    //   });
    // 客戶性別
    aplush.apis.SystemType({
      Type: "23",
    }).then(res => {
      this.gender_title = res.Result.Items;
    })
    //客戶來源
    aplush.apis.SystemType({
        Type: "22"
      }).then(res => {

        this.customerSource
        let _temp = res.Result.Items;
        _temp.forEach(item => {
          this.customerSource.push({
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
          })
        })
      }),
      // 朝向
      aplush.apis.SystemType({
        Type: "8",
      }).then(res => {
        console.log('朝向');
        console.log(res);
        this.Orientation = res.Result.Items;
      })
    // 房型
    aplush.apis.SystemType({
      Type: "4",
    }).then(res => {
      let _temp = res.Result.Items;
      _temp.forEach(item => {
        this.HouseType.push({
          text: item.ItemName,
          ItemNo: item.ItemNo,
          ItemValue: item.ItemValue,
          KeyId: item.KeyId
        })
      })
    })
    // 樓層
    aplush.apis.SystemType({
      Type: "26",
    }).then(res => {
      let _temp = res.Result.Items;
      _temp.forEach(item => {
        this.floor_list.push({
          text: item.ItemName,
          ItemNo: item.ItemNo,
          ItemValue: item.ItemValue,
          KeyId: item.KeyId
        })
      })
    })
    // 裝修情況
    aplush.apis.SystemType({
      Type: "38",
    }).then(res => {
      let _temp = res.Result.Items;
      _temp.forEach(item => {
        this.decoration_list.push({
          text: item.ItemName,
          ItemNo: item.ItemNo,
          ItemValue: item.ItemValue,
          KeyId: item.KeyId
        })
      })
    })
    // 手機歸屬地
    aplush.apis.SystemType({
      Type: "125",
    }).then(res => {
      let _temp = res.Result.Items;
      _temp.forEach(item => {
        this.area_code.push({
          text: item.ItemName,
          ItemNo: item.ItemNo,
          ItemValue: item.ItemValue,
          KeyId: item.KeyId
        })
      })
    })
    // 購房原因
    aplush.apis.SystemType({
      Type: "46",
    }).then(res => {
      let _temp = res.Result.Items;
      _temp.forEach(item => {
        this.buy_reasonList.push({
          text: item.ItemName,
          ItemNo: item.ItemNo,
          ItemValue: item.ItemValue,
          KeyId: item.KeyId
        })
      })
    })
  },
  methods: {
    // 顯示輸入內容只能為整數
    UpNumber(e) {
      // 開頭不為零、且不包含小數點
      e.target.value = e.target.value.replace(/^0+/g, '').replace(/\./g, '');
    },
    // 性別切換
    gender_change(e) {
      this.subjectKeyId = e;
    },
    toogle_gender(index) {
      this.gender = this.gender_title[index].ItemName;
    },
    // 來源確認
    source_confirm() {
      this.source_show = false;
    },
    // 取消選擇來源
    source_cancel() {
      this.source_show = false;
    },
    // 來源改變選擇事件
    source_change(picker, value, index) {
      this.source_type = value.text;
      this.source_typeKeyId = value.KeyId;
    },
    // 區號
    area_confirm(e) {
      this.area_show = false;
      this.prefix_phone = e.value;
    },
    // 改變區號
    area_change(picker, value, index) {
      this.attribute = value.text;
      this.attributeCode = value.value;
    },
    area_cancel() {
      this.area_show = false;
    },
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
        });
    },
    onConfirm(value, index) {
      this.scustomer_status = false; // 關閉
      this.customerStatus = value.text;
      // this.username = value;
    },
    onChange(picker, value, index) {
      this.customerStatusId = value.KeyId;
      //   Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.scustomer_status = false;
      //   Toast("取消");
    },
    type_cancel() {
      this.Custom_type_show = false;
    },
    type_confirm(value, index) {
      this.customerType = value.text;
      this.Custom_type_show = false;
    },
    Custom_TypeChange(picker, value, index) {
      this.customerType = value.text;
      this.customerKeyId = value.KeyId;
    },
    // 添加客戶
    AddCustomer() {
      this.CustomerContacts.push({
        Mobile:this.phone,
        InquiryTradeTypeCode:this.source_typeKeyId,
        ContactTypeKeyId: "e7e4f668-dedd-411b-8d4c-7b9ea6a8c4a4",
        ContactName:this.username,
        GenderKeyId:this.subjectKeyId,
        MobileAttribution:this.attributeCode,
        Mobile:this.phone,
        QQ:this.QQ,
        Wechat:this.Wechat,
        DoB:this.birthday,
        Remark:this.remark,
        HouseTypeKeyId:this.HouseTypeKeyId,
        AreaFrom:this.area_start,
        AreaTo:this.area_end,
        InquiryStatusKeyId:this.customerStatusId,
        MobileAttribution:this.attributeCode,
        HouseDirectionKeyId:this.orientation_radio,
        HouseFloorKeyId:this.floorKeyId,
        DecorationSituationKeyId:this.decorationKeyId,
        BuyReasonKeyId:this.buyReasonKeyId,
        InquirySourceKeyId:this.source_typeKeyId, // 來源keyId //客户来源
        ContactTypeKeyId:this.customerKeyId,
        Tel:this.phone2

        
      })
      aplush.apis.AddCustom({
        InquiryTradeTypeCode:this.radio, //客户类型
        RentPriceFrom:this.mind_rent_price_start,
        RentPriceFrom:this.mind_rent_price_start,
        SalePriceFrom:this.mind_buy_price_start,
        SalePriceTo:this.mind_buy_price_end,

        InquirySourceKeyId:this.source_typeKeyId,
        CustomerContacts:this.CustomerContacts

        // ContactName:this.username,
        // GenderKeyId:this.subjectKeyId,
        // Mobile:this.phone,
        // InquiryTradeTypeCode:this.radio, //客户类型
        // SalePriceFrom:this.mind_buy_price_start,
        // SalePriceTo:this.mind_buy_price_end,
        // RentPriceFrom:this.mind_rent_price_start,
        // RentPriceTo:this.mind_rent_price_end,
        // InquiryStatusKeyId:this.customerStatusId,
        // MobileAttribution:this.attributeCode,
        // QQ:this.QQ,
        // Wechat:this.Wechat,
        // DoB:this.birthday,
        // Remark:this.remark,
        // HouseTypeKeyId:this.HouseTypeKeyId,
        // AreaFrom:this.area_start,
        // AreaTo:this.area_end,
        // HouseDirectionKeyId:this.orientation_radio,
        // HouseFloorKeyId:this.floorKeyId,
        // DecorationSituationKeyId:this.decorationKeyId,
        // BuyReasonKeyId:this.buyReasonKeyId,
        // InquirySourceKeyId:this.source_typeKeyId, // 來源keyId //客户来源
        // ContactTypeKeyId:this.customerKeyId,
        // Tel:this.phone2
      }).then(res => {
        console.log(res);
        if (res.ErrorMsg == "" || (res.ErrorMsg == null)) {
          this.$toast("添加成功");

        } else {
          this.$toast(res.ErroMsg);
        }
      });
    },
    // 確認選擇日期
    birthday_confirm(val) {
      this.birthday_show = false;
      this.birthday = formattime.format_time(val);
    },
    // 取消選擇客戶生日
    birthday_cancel() {
      this.birthday_show = false;
      this.birthday = "";
    },
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
    // 選中聯繫人
    click_customer(item) {
      this.username2 = item;
      console.log(item);
    },
    customerLeft() {
      this.contact_show = false;
    },
    // 获取选中的朝向
    toogle_orientation(e) {
      this.orientation_text = this.Orientation[e].ItemName;
    },
    orientation_change(e) {
      console.log('orientation change')
      console.log(e);

    },
    // 获取选中的房型
    roomType_confirm() {
      this.showRoomType = false;
    },
    // 放棄選擇房型
    roomType_cancel() {
      this.showRoomType = false;
    },
    //房型選擇改變事件
    roomType_change(picker, value, index) {
      this.room_type = value.text;
      this.roomTypeKeyId = value.KeyId;
    },
    // 確認選擇樓層
    floor_confirm() {
      this.floor_show = false;
    },
    // 取消選擇樓層
    floor_cancel() {
      this.floor_show = false;
    },
    //改變選擇樓層
    floor_change(picker, value, index) {
      this.floor = value.text;
      this.floorKeyId = value.KeyId;
    },
    // 裝修情況確認選擇
    decoration_confirm() {
      this.decoration_show = false;
    },
    // 裝修情況取消選擇
    decoration_cancel() {
      this.decoration_show = false;
    },
    // 改變選擇裝修情況
    decoration_change(picker, value, index) {
      this.decoration = value.text;
      this.decorationKeyId = value.KeyId;
    },
    // 確認選擇購房原因
    buy_confirm() {
      this.buy_show = false;
    },
    // 購房原因取消選擇
    buy_cancel() {
      this.buy_show = false;
    },
    // 改變選擇購房原因
    buy_change(picker, value, index) {
      this.buy_reason = value.text;
      this.buyReasonKeyId = value.KeyId;
    }

  }

};
