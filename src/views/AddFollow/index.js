/*
 * @Author: luciano 
 * 新增跟進方法
 * @Date: 2021-12-29 16:37:27 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-03-04 15:34:11
 */
// 引入api接口
import aplush from "@/api/A+";
import formattime from "@/utils/format_time";
import {
  Toast
} from "vant";
export default {
  data() {
    return {
      radio: "1",
      //是否顯示房源狀態彈窗
      Show_Listing_Status: false,
      Listing_Text: "",
      exclusive: "2",
      Listing_Stauts: [],
      Follow_Type: [],
      call: "", //稱呼
      price_text: "",
      content: "",
      Follow_Content: "", //跟進內容
      Expertdeal: [], //行家成交
      Expertdeal_Status: "", //行家成交狀態
      lc_DealType: "", //成交方式
      lc_TransactionType: "", //交易類型
      lc_Carport: "", //車位
      Deal_Price: "", //成交價
      //   Deal_Time: "", //成交時間
      Show_Deal_Time: false, //是否顯示成交時間
      Deal_Time: new Date(), //成交時間
      DealTime: "", //成交時間
      Rent_Time: "", //租期至
      Remind_TA: "", //提醒TA
      show_remind: false, //是否顯示提醒TA
      remind_List: [], //提醒TA列表
      Remind_Ta_Text: "", //提醒TA文字
      SearchPerson: [], //搜索人
      SearchType: '1',
      PeopleInfo: [],
      Remind_TA_Date: "", //提醒TA日期
      status_text: "",
      status_keyId: "",
      lc_saler_price: "", //售價
      lc_type: "", //聯繫人類型
      lc_name: "",
      show_call: false, //是否顯示稱呼
      Call_Name: "", //稱呼
      Call_Name_List: [], //稱呼列表
    };
  },
  mounted() {
    aplush.apis
      .SystemType({
        Type: "29",
      })
      .then((res) => {
        let _temp = res.Result.Items;
        _temp.forEach((item) => {
          this.Follow_Type.push({
            text: item.ItemName,
            value: item.KeyId,
            content: item.ItemValue
          });
        });
        //   房源狀態
        aplush.apis.SystemType({
          Type: "83",
        }).then(res => {
          let _temp = res.Result.Items;
          _temp.forEach((item) => {
            this.Listing_Stauts.push({
              text: item.ItemName,
              value: item.KeyId,
              content: item.ItemValue
            });
          });
          //行家成交
          aplush.apis.SystemType({
            Type: "114",
          }).then(res => {
            //   this.Expertdeal=res;
            let _temp = res.Result.Items;
            _temp.forEach((item) => {
              this.Expertdeal.push({
                text: item.ItemName,
                value: item.KeyId,
                content: item.ItemValue
              });
            })
          })
        })
      });
  },
  methods: {
    //移除提醒人
    removeNotice(item) {
      console.log("移除內容");
      console.log(item);
      let lc_items = item;
      this.NoticeList.splice(
        this.NoticeList.findIndex((item) => item === lc_items),
        1
      );
    },
    // 查詢提醒事項
    search_remind_ta() {
      aplush.apis.SelectPerson({
        AutoCompleteType: this.SearchType,
        KeyWords: this.Remind_Ta_Text,
      }).then((res) => {
        this.PeopleInfo = res;
        // console.log('this.PeopleInfo');
        // console.log(this.PeopleInfo);
      }).catch((err) => {

        console.log("出現錯誤");
        console.log(err);
      });
    },
    // 取消提醒
    Cancel_remind_ta() {
      this.show_remind = false;
    },
    e_Remind_Select(index) {
      this.$refs.checkboxes[index].toggle();
    },
    Remind_item_change(e) {
      this.remind_List = e;
    },
    //取消提醒
    cancel_remind() {
      this.show_remind = false;
      this.remind_List = [];
    },
    //確認提醒
    confrim_remind() {
      this.show_remind = true;
    },
    Listing_Change() {},
    // 確認選擇房源狀態
    Listing_Confirm(value) {
      console.log(value);
      this.status_text = value.text;
      this.status_keyId = value.value;
      this.Show_Listing_Status = false;
    },
    // 取消選擇房源狀態
    Listing_Cancel() {
      this.Show_Listing_Status = false;
    },
    remove_remind(index) {
      this.remind_List.splice(index, 1);
    },
    ChangeCheck(e) {
      let _teme = e;
      console.log(this.Follow_Type);
      this.Follow_Type.forEach(item => {
        console.log(item.text == _teme);
        if (item.text == _teme) {
          console.log(item.text == _teme);
          this.content = item.content.split("|");
        };
      });
    },
    //標籤選擇
    ChangeCheck_Tag(e) {
      let _teme = e;
      this.Follow_Content += `【${_teme}】`;
    },
    //確定成交時間
    Deal_Time_Confirm(value) {
      console.log(value);
      this.Deal_Time = value;
      this.Show_Deal_Time = false;
      this.DealTime = formattime.format_time(value);
    },
    //取消確定成交時間
    Deal_Time_Cancel() {
      this.Show_Deal_Time = false;
    },
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    onClickRight() {},
    // 增加提醒
    Remind_TA_Click() {
      this.show_remind = true;

    },
    // 稱謂
    e_show_call() {
      this.show_call = true;
      this.e_call_name();
    },
    //調用稱謂接口
    e_call_name() {
      aplush.apis.SystemType({
        Type: "23",
      }).then(res => {
        let _temp = res.Result.Items;
        _temp.forEach((item) => {
          this.Call_Name_List.push({
            text: item.ItemName,
            value: item.KeyId,
            content: item.ItemValue
          });
        });
      })
    },
    //確認稱謂
    Call_Name_Confirm(e) {
      console.log('e');
      console.log(e);
      this.Call_Name = e.text;
      this.show_call = false;
    },
    // 稱謂放棄選擇事件
    Call_Name_Change(e) {

    },
    //稱謂放棄選擇事件
    Call_Name_Cancel() {
      //等於空
      this.Call_Name = '';

    },
    // 新增跟進
    submit_Click() {
      aplush.apis.ListiongFollowAdd({
        FollowType: this.exclusive == '信息補充' ? '2' : this.exclusive == '申請轉盤' ? '1' 
        : this.exclusive == '洗盤' ? '3' : this.exclusive == '新開盤' ? '4' 
        : this.exclusive == '新增聯繫人' ? '5' : this.exclusive == '叫價' ? '6' : '2', //跟進類型
        PropertyKeyId: "9f910425-b9de-c3bf-4703-08d7faf80b49", //房源ID
        TargetPropertyStatusKeyId: "", //变更房源状态Id
        ExpertTransactionKeyId: "", //行家Id
        DealType: this.lc_DealType, //資料來源
        TransactionType: "", //交易類型
        CarNo: "", //車位號
        TransactionSalePrice: this.lc_saler_price, //成交售價
        TransactionRentPrice: "", //成交租價
        TransactionDate: "", //成交日期
        TransactionRentToDate: "", //最後租期
        FollowContent: "", //跟進內容
        MsgUserKeyIds: "", //提醒人KeyId
        MsgDeptKeyIds: "", //提醒部門KeyId
        MsgTime: "" //提醒時間

      }).then(res => {
        res.Flag == true ? Toast('新增成功') : Toast('新增失敗');
      })
    }
  },
};
