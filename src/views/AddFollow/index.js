/*
 * @Author: luciano 
 * 新增跟進方法
 * @Date: 2021-12-29 16:37:27 
 * @Last Modified by: luciano
 * @Last Modified time: 2021-12-30 15:57:43
 */
// 引入api接口
import aplush from "@/api/A+";
import formattime from "@/utils/format_time";
export default {
  data() {
    return {
      radio: "1",
      //是否顯示房源狀態彈窗
      Show_Listing_Status: false,
      Listing_Text: "",
      exclusive: "",
      Listing_Stauts: [],
      Follow_Type: [],
      price_text: "",
      content: "",
      Follow_Content: "", //跟進內容
      Expertdeal:[], //行家成交
      Expertdeal_Status:"", //行家成交狀態
      lc_DealType: "", //成交方式
      lc_TransactionType: "", //交易類型
      lc_Carport: "", //車位
      Deal_Price: "", //成交價
    //   Deal_Time: "", //成交時間
      Show_Deal_Time: false, //是否顯示成交時間
      Deal_Time:new Date(),//成交時間
      DealTime: "", //成交時間
      Rent_Time: "", //租期至
      Remind_TA: "", //提醒TA
      NoticeList: [{
          Name: "Lucinao",
          Department: "IT",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Lily",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
      ], //   提醒人
      //   新增提醒人
      AddNoticeList: [{
          Name: "Lucinao",
          Department: "IT",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Lily",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
      ],
      // end 新增提醒人
      status_text: "",
      status_keyId: ""
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
          if (
            item.ItemName == "信息补充" ||
            item.ItemName == "新增联系人" ||
            item.ItemName == "代办手续" ||
            item.ItemName == "新开盘" ||
            item.ItemName == "监察"
          ) {
            this.Follow_Type.push({
              text: item.ItemName,
              value: item.KeyId,
              content: item.ItemValue
            });
          }
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
    // 添加提醒人
    selectPerson() {
      this.$router.push("SelectPerson");
      console.log("gggg");
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
    ChangeCheck(e) {
      console.log("選中的值");
      console.log(e);
      let _teme = e;
      const _filter_result = this.Follow_Type.find((item) => item.value == _teme);
      this.content = _filter_result.content.split("|");
      console.log('打印過濾結果');
      console.log(_filter_result);
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
      this.DealTime=formattime.format_time(value);
    },
    //取消確定成交時間
    Deal_Time_Cancel(){
        this.Show_Deal_Time = false;
    },
    // 返回
    onClickLeft() {
        this.$router.go(-1);
    },
    // 提交
    onClickRight() {
    }
  },
};
