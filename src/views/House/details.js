/*
 * @Author: luciano 
 * @Date: 2021-12-10 15:22:09 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-01-04 17:28:14
 * 楼盘管理详情
 */
import Cookies from 'js-cookie'
import aplush from "@/api/A+"; // 獲取樓詳情
import {
  title
} from "@/settings";
import formattime from "@/utils/format_time";
import {
  Toast
} from "vant";
export default {
  mounted() {
    let keyId = this.$route.query.KeyId;
    // 房源详情接口
    this.Get_House_Detail(keyId);
    this.House_detail;
    // 房源跟进接口
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "0EEF0532-7AAD-4B52-8BCB-AB1B67987AAF",
      IsDetails: "true",
      PropertyKeyId: keyId,
    };
    aplush.apis.ListiongFollow(params).then((res) => {
      this.FollowUp = res.PropFollows;
    });
    // end 房源跟进接口
    this.M_live_Pohto();
    //獲取系統類型
    this.base_system();
    let userinfo = JSON.parse(Cookies.get('userInfo'));
    console.log(userinfo);
    this.signature = userinfo.StaffNo;

    //  TODO:缺少通过员工工号查询员工姓名接口

  },
  data() {
    return {
      show: false,
      showPopover: false,
      Picdefault: 0,
      PicType: [{
          text: "室內圖",
          value: "室內圖",
          index: 0,
        },
        {
          text: "小區圖",
          value: "小區圖",
          index: 1,
        },
        {
          text: "戶型圖",
          value: "戶型圖",
          index: 2,
        },
        {
          text: "景觀圖",
          value: "景觀圖",
          index: 3,
        },
      ],
      // 通过 actions 属性来定义菜单选项
      actions: [{
          text: "新增現場相"
        },
        {
          text: "新增查冊"
        },
        {
          text: "新增放盤紙"
        },
        {
          text: "新增鑰匙"
        },
        {
          text: "編輯房源"
        },
        {
          text: "中原成交"
        },
        {
          text: "發佈房源"
        },
      ],
      //
      bool_collect: true,
      bool_good: true,
      list: [],
      loading: false,
      finished: false,
      House_detail: {},
      current: 0,
      title: "", //title 標題
      FollowUp: [], //房源跟进
      pageIndex: 1, //起始页
      pageSize: 3, //显示页数
      Live_Photo_Show: false, // 顯示現場相
      Live_Photo: "", // 現場相圖片
      soucrce_keyId: "bb649e23-fcdf-44a1-9420-52769a129de1", //現場相圖片類型
      House_Owner: [], // 業主
      activeName: ["1"], // 業主信息
      active: "现场相",
      // 业绩申明
      PaperName: ["1"], //放盤紙
      PaperList: [], // 放盤紙
      Scene_keyId: "全部", // 現場相圖片類型keyId
      Type: "",
      House_Type: [], //戶型圖
      IndoorMap: [], // 室內圖
      lc_IndoorMap: [],
      Polt: [], //小區圖
      Landscape: [], //景觀圖
      selected: "",
      selectType: [], //右側選項
      start_time: "", // 上傳開始時間
      end_time: "", // 上傳結束時間
      other_select: "", // 其他選項
      AddPaperShow: false,
      PaperTime: "", // 放盤開始時間
      PaperEndTime: "", // 放盤結束時間
      //  銷售類型
      PaperStatus: "1",
      // exclusive: "1",
      exclusive: "", //是否獨家
      ads: "", //是否廣告
      // 放盤紙編號
      PaperNo: "",
      // 售價開始
      Saeles_Start: "",
      // 售價結束
      Saeles_End: "",
      lc_paper: [],
      remark: "", //備註
      signature: "", // 簽署人
      KeyList: [], // 鑰匙
      AddKeyShow: false, //添加鑰匙
      KeyBoxName: "", //鑰匙箱
      KeyCount: "", //鑰匙數量
      KeyStatus: "", //鑰匙狀態
      KeyType: "", //鑰匙類型
      KeyBoxType: "", //鑰匙箱類型
      KeyBoxStatus: "", //鑰匙箱狀態
      KeyBoxRemark: "", //鑰匙箱備註
      KeyBoxDepartment: "", //鑰匙箱部門
      KeyBoxReceiver: "", //鑰匙箱接收人
      lc_KeyBoxReceivedTime: "", //鑰匙箱接收時間
      KeyBoxReceivedTime: "", //鑰匙箱接收時間
      KeyBoxKeyCount: "", //鑰匙箱鑰匙數量
      KeyBoxKeyStatus: "", //鑰匙箱鑰匙狀態
      KeyBoxKeyType: "", //鑰匙箱鑰匙類型
      KeyBoxKeyBoxName: "", //鑰匙箱鑰匙箱名稱
      KeyBoxSelectKeyId: "", // 鑰匙箱選中KeyId
      KeyBoxNo: "", //鑰匙箱編號
      KeyBoxTrue: "", //是否密碼鑰匙
      KeyRecepitNo: "", //匙收據編號
      KeyLocation: "", //鑰匙位置
      KeyReceiver: "", // 收匙人
      KeyBoxShow: false, //鑰匙箱
      Phone: "", //聯繫電話
      KeyBoxList: [], //鑰匙箱,
      KeyBoxKeyCountList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], //鑰匙箱鑰匙數量
      KeyBoxReceivedTimeShow: false, //鑰匙箱接收時間
      KeyBoxKeyCountShow: false, //鑰匙箱鑰匙數量
      KeyBoxLocation: "", //存放地
      KeyReceiverShow: false, //收鑰人
      SearchType: "1", //搜索類型
      SearchPerson: '0', //搜索人是否選中
      SearchPersonList: [], //添加联系人
      PeopleInfo: [], //搜索人
      KeyBoxKeyCount: "", //鑰匙箱鑰匙數量
      KeyLocation_radio: "", //鑰匙位置
      KeyBoxLocationShow: false, //鑰匙箱位置顯示
      KeyReceiver_keyId: "", //收匙人keyId
      KeyReceiver_Department_keyId: "", //收匙人部門keyId
      exclusive_start: "", //獨家日期起
      exclusive_end: "", //獨家日期訖
      contact_Type: true, //搜索類型
      lc_recevier: true, //收匙人
      // 新增联系人多选
      ContactList: [],
      exclusive_type: "", //獨家類型
      Rent_Start: "", // 租金開始
      Rent_End: "",// 租金結束
      lc_AttachmentPath: "", // 附件路徑
      imgSize:Number, // 图片高度
      
    };
  },
  filters: {
    formatt: function (value) {},
  },
  methods: {
    // 加载图片
    loadingImg(){
      // this.imgSize=this.$refs['']
      console.log('加载图片高度');
      console.log(this.imgSize= this.$refs.img.$el.clientHeight)
    },
    back() {
      this.$router.push("/House");
    },
    // 查看現場相
    look_Scene() {
      this.$router.push("/Scene");
    },
    dujia(e) {
      console.log(e);
    },
    // 系統類型
    base_system() {
      this.Type = 56; //戶型圖
      aplush.apis.SystemType({
        Type: this.Type
      }).then((res) => {
        this.House_Type.push(res.Result);
        console.log("打印戶型圖");
        console.log(this.House_Type);
        this.Type = 2; //室內圖
        aplush.apis.SystemType({
          Type: this.Type
        }).then((res) => {
          this.lc_IndoorMap.push(res.Result);
          this.Type = 1; //小區圖
          aplush.apis.SystemType({
            Type: this.Type
          }).then((res) => {
            this.Polt.push(res.Result);
            this.Type = 133; //景觀圖
            aplush.apis.SystemType({
              Type: this.Type
            }).then((res) => {
              this.Landscape.push(res.Result);
            });
          });
        });
      });
    },
    onChange(index) {
      this.current = index;
    },
    collect_i() {
      this.bool_collect = !this.bool_collect;
      if (this.bool_collect) {
      
      aplush.apis
        .AddCollection({
          KeyId: this.$route.query.KeyId,
        })
        .then((res) => {
          if (res.Flag) {

            this.$toast("添加收藏成功");
          } else {
            this.$toast("添加收藏失败");
          }
        });}
      else {
        aplush.apis.CancelCollection({
          KeyId: this.$route.query.KeyId,
        }).then((res) => {
          if (res.Flag) {
            this.$toast("取消收藏成功");
          } else {
            this.$toast("取消收藏失败");
          }
        });
      }
    },
    good_i() {
      this.bool_good = !this.bool_good;
      console.log("as");
    },
    // 撥打電話
    call() {
      this.show = true;
    },
    // 收藏
    more_i() {
      this.showPopover = !this.showPopover;
      this.$nextTick(() => {
        this.showPopover = !this.showPopover;
      });
      console.log(this.showPopover);
    },
    onSelect(action) {
      switch (action.text) {

        case "新增現場相":
          this.Add_Scene();
          break;
        case "新增查冊":
          this.Add_Register();
          break;
        case "新增放盤紙":
          this.AddPaperShow = true;
          break;
        case "新增鑰匙":
          this.AddKeyShow = true;
          break;
        case "編輯房源":
          this.Edit_House();
          break;
        case "中原成交":
          this.Add_Deal();
          break;
        case "發佈房源":
          this.Publish_House();
          break;
        default:
          break;
      }
    },
    // 新增跟進
    addFollow() {
      this.$router.push("AddFollow");
    },
    // 跟进详情
    FollowDetail(index) {},
    // 房源跟进
    full_Follow() {
      let lc_keyId = this.$route.query.KeyId;
      this.$router.push({
        path: "/MoreFollow",
        query: {
          KeyId: lc_keyId
        }
      });
    },
    // 現場相
    M_live_Pohto() {
      this.Pic_base();
    },
    Pic_base() {
      let that = this;
      aplush.apis
        .ListingPhoto({
          propertyKeyId: this.$route.query.KeyId,
          PhotoTypeKeyId: this.Scene_keyId,
        })
        .then((res) => {
          this.IndoorMap = res._Photos;
          console.log("現場相44444");
          console.log(this.IndoorMap);
        });
    },
    // 切換圖片
    Chage_Pic(item) {
      // 切換默認選中
      this.Picdefault = item.index;
      item.value == "室內圖" ?
        this.soucrce_keyId :
        (this.soucrce_keyId = "8457527f-9269-4d8e-9c06-714f7c276421");
      // ? (this.Live_Photo_Show = true)
      // : (this.Live_Photo_Show = false);
      // console.log(item);
    },
    // 獲取房源詳情
    Get_House_Detail(keyId) {
      aplush.apis.ListingDetail(keyId).then((res) => {
        this.House_detail = res;
        this.bool_collect=this.House_detail.IsFavorite
        console.log("打印房源详情");
        console.log(this.House_detail);
      });
    },
    getOwner() {

      this.Get_Owner_Detail();
    },
    // 獲取業主信息
    Get_Owner_Detail() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingOwner({
          keyId: keyId,
        })
        .then((res) => {
          this.Owner_Info_Show = true;
          this.House_Owner = res.Trustors;
          console.log("打印業主信息");
          console.log(this.House_Owner);
        });
    },
    // 獲取放盤紙
    Get_Paper() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingPaper({
          keyId: keyId,
        })
        .then((res) => {
          this.PaperList = res.PropOnlyTrusts;
          console.log("打印放盤紙");
          console.log(res);
        });
    },
    //獲取鑰匙
    Get_Key() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingKey({
          keyId: keyId,
        })
        .then((res) => {
          this.KeyList = res.PropKeys;
        });
    },
    lc_vant_click(name, title) {
      console.log("現場相復合內容");
      // console.log(name);
      console.log(title);
      title == "現場相" ?
        this.M_live_Pohto() :
        title == "放盤紙" ?
        this.Get_Paper() :
        title == "鑰匙" ?
        this.Get_Key() :
        "";
    },
    beforeClose({
      position,
      instance
    }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          // 跳轉到編輯頁面
          this.$router.push({
            path: "/EditScene",
          });
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          }).then(() => {
            instance.close();
            // 刪除對應頁面
          });
          break;
      }
    },
    getTypeSelected() {
      switch (this.selected) {
        case 56:
          this.House_Type.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 2:
          this.lc_IndoorMap.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 1:
          this.Polt.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 133:
          this.Landscape.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        default: {
          this.selectType = [];
        }
      }
    },
    select_change() {
      // 獲取房源現場相
      this.Pic_base();
    },
    other_change() {
      console.log("其他選項改變");
      // console.log(this.other_select);
      this.Scene_keyId = this.other_select;
      this.Pic_base();
    },
    //添加聯繫人
    add_contact() {
      this.SearchType = 1;
      this.lc_Type = "添加聯繫人";
      this.contact_Type = true;
      this.lc_recevier = false;

      // this.$set(this.lc_Type,)
      // this.$nextTick(()=>{
      //   this.lc_Type="添加聯繫人";
      // })
      // this.$nextTick(()=>{
      //   this.Type="添加聯繫人";
      // })
      this.KeyReceiverShow = true;
      // this.SearchPerson=[];
      this.SearchPersonList = [];
      this.Base_Key_Person(this.lc_Type);
      console.log("this.Type");
      console.log(this.Type);
    },
    // 添加放盤紙
    btn_AAddPaper() {

    },
    AddPaper() {
      aplush.apis.AddPaper({
        PropertyKeyId: this.$route.query.KeyId, // 房源ID
        TrustBookNo: this.PaperNo, //放盤紙編號
        CanAdvertising: this.ads, //是否可廣告
        PersonKeyId: '2010195', //放盤人KeyID
        PersonName: "Luciano", //放盤人姓名
        DepartmentKeyId: "2010195", //放盤人部門KeyID
        DepartmentName: "IT", //放盤人部門名稱
        TrustType: this.PaperStatus, //放盤紙類型 1-售 2-租 3-租售
        EffectiveDate: this.PaperTime, //放盤紙生效日期
        ExpirationDate: this.PaperEndTime, //放盤紙結束日期
        IsOnlyTrust: this.exclusive, //是否獨家
        OnlyTrustEffectiveDate: this.exclusive_start, //獨家生效日期
        OnlyTrustExpirationDate: this.exclusive_end, //獨家結束日期
        SalePriceStart: this.Saeles_Start, //售價起
        SalePriceEnd: this.Saeles_End, //售價止
        RentPriceStart: this.Rent_Start, //租價起  
        RentPriceEnd:this.Rent_End, //租價至
        Attachments:'', //附件集合
        AttachmentName: "", //附件名稱
        AttachmentPath: this.lc_AttachmentPath, //附件路徑
        ContactPersons: this.ContactList, //聯繫人集合
        UserKeyId: "2010195", //操作人KeyID
        DeptKeyId: "2010195", //操作人部門KeyID
      }).then(res => {

      })
      console.log("添加放盤紙");

    },
    // 上傳文件至服務器
    afterRead(file) {
      //改為文件流形式
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      console.log(file.name);
      aplush.apis.UploadFile(fd).then((res) => {
        this.lc_AttachmentPath=res;
      });
    },
    // 鑰匙箱點擊事件
    Key_Box_Click() {
      this.KeyBoxShow = true;
      aplush.apis
        .ListingKeyBox({
          keyId: this.$route.query.KeyId,
        })
        .then((res) => {
          this.KeyBoxList = res.Result;
          //更改 對象的key名稱
          var KeyMap = {
            Value: "text",
          };
          for (var i = 0; i < this.KeyBoxList.length; i++) {
            var obj = this.KeyBoxList[i];
            for (var key in obj) {
              if (KeyMap[key]) {
                obj[KeyMap[key]] = obj[key];
                delete obj[key];
              }
            }
          }
        })
        .catch((err) => {
          console.log("出現錯誤");
          console.log(err);
        });
    },
    // 鑰匙箱選中事件
    Key_Box_Select(item) {
      this.KeyBoxShow = false;
      this.KeyBox_select = item;
      console.log(item);
      this.KeyBoxName = item.text;
      this.KeyBoxSelectKeyId = item.KeyId;
      this.Get_KeyBox_Id();
    },
    // 時間窗選中事件
    Time_Select(val) {
      // 格式化時間
      if (val) {
        this.lc_KeyBoxReceivedTime = formattime.format_time(val);
        switch (this.title) {
          case "放盤時間起":
            this.PaperTime = this.lc_KeyBoxReceivedTime;
            break;
          case "放盤時間止":
            this.PaperEndTime = this.lc_KeyBoxReceivedTime;
            break;
          case "獨家日期起":
            this.exclusive_start = this.lc_KeyBoxReceivedTime;
            break;
          case "獨家日期止":
            this.exclusive_end = this.lc_KeyBoxReceivedTime;
            break;
          default:
            break;
        }

        // this.title === "放盤時間起" ? this.PaperTime = this.lc_KeyBoxReceivedTime : this.title === "放盤時間止" ? this.PaperEndTime = this.lc_KeyBoxReceivedTime : "";
      }
      this.KeyBoxReceivedTimeShow = false;
    },
    // 鑰匙數量選中事件
    Key_Box_Key_Count_Select(item) {
      console.log(item);
      this.KeyBoxKeyCount = item;
      this.KeyBoxKeyCountShow = false;
    },
    // 獲取鑰匙箱編號
    Get_KeyBox_Id() {
      aplush.apis
        .ListingKeyNumber({
          keyId: this.KeyBoxSelectKeyId, //钥匙箱KeyID
          PropertyKeyID: this.$route.query.KeyId //房源KeyID
        })
        .then((res) => {
          console.log("鑰匙箱編號");
          this.KeyBoxNo = res.Result.KeyNumber;
        })
        .catch((err) => {
          console.log("出現錯誤");
          console.log(err);
        });
    },
    // 新增鑰匙
    // todo: 新增鑰匙
    Add_Key() {
      aplush.apis.AddKey({
        PropertyKeyID: this.$route.query.KeyId,
        KeyCount: this.KeyBoxKeyCount,
        IsPswLock: this.KeyBoxTrue,
        KeyDate: formattime.format_time(this.KeyBoxReceivedTime),
        KeyLocation: this.KeyLocation,
        KeyPersonKeyId: this.KeyReceiver_keyId, //收匙人keyId
        KeyPersonName: this.KeyReceiver, //收匙人
        KeyPersonDepartmentKeyId: this.KeyReceiver_Department_keyId, //收匙人部門keyId
        IsCentaline: this.KeyBoxLocation, //存放地点
        PropertyKeyBoxKeyId: this.KeyBoxSelectKeyId, //鑰匙箱
        PropertyKeyNo: this.KeyBoxNo, //鑰匙箱編號
        ReceiptNo: this.KeyRecepitNo, //匙收據編號
        Mobile: this.Phone, //聯繫電話
        Remark: this.remark //備註
      }).then((res) => {
        console.log('AddKey');
        console.log(res);
        res.Flag === true ? Toast("新增鑰匙成功") : Toast(res.ErrorMsg);
      });
    },
    //獲取收匙人
    Base_Key_Person(type) {
      aplush.apis.SelectPerson({
        AutoCompleteType: this.SearchType,
        KeyWords: this.SearchType === 1 ? this.KeyReceiver : this.KeyLocation

      }).then((res) => {
        this.PeopleInfo = res;
        console.log('this.PeopleInfo');
        console.log(this.PeopleInfo);
      }).catch((err) => {

        console.log("出現錯誤");
        console.log(err);
      });
    },
    //獲取收匙人
    Get_KeyReceiver() {
      this.SearchType = 1;
      this.KeyReceiverShow = true;
      this.contact_Type = false;
      this.lc_recevier = true, //收匙人
        // this.SearchType="收匙人";
        this.Base_Key_Person(this.SearchType);

    },
    // 添加聯繫人
    Add_Key_Person() {
      this.SearchType = 1;
      this.KeyReceiverShow = true;
      this.contact_Type = true;
      this.lc_recevier = false;
      // this.SearchType="添加聯繫人";
      this.Base_Key_Person(this.SearchType);
    },
    //放弃搜索
    Cancel_Search() {
      Toast('放弃搜索')
    },
    // 收匙人選中事件
    KeyReceiver_change(e) {
      console.log('打印e')
      console.log(e);

      //改為多選
      this.lc_Type === "添加聯繫人" ? this.KeyReceiver = "" : this.KeyReceiver = e;
      this.PeopleInfo.UserDepartmentDatas.forEach((item, index) => {
        if (this.lc_Type != '添加聯繫人') {
          if (index == e) {
            this.KeyReceiver = item.ResultName;
          }
        } else {
          this.ContactList = e;
          console.log('this.ContactList');
          console.log(this.ContactList);
        }
        // if (index == e) {
        //   this.lc_Type==="添加聯繫人" ? this.ContactList.push(item.ResultName):this.KeyReceiver = item.ResultName;
        //   this.KeyReceiver=item.ResultName;
        // }
        // console.log('打印item')
        // console.log(this.ContactList);
      });
      //移除選中

    },
    // 聯繫人多選
    contact_Select(index) {
      this.$refs.checkboxes[index].toggle();

    },
    //移除聯繫人
    remove_contact(item) {
      let lc_items = item;
      this.ContactList.splice(
        this.ContactList.findIndex((item) => item === lc_items),
        1
      );
    },

    //收匙人
    KeyReceiver_Select(index) {
      this.KeyReceiver_keyId = this.PeopleInfo.UserDepartmentDatas[index].ResultKeyId; //收匙人keyId
      this.KeyReceiver_Department_keyId = this.PeopleInfo.UserDepartmentDatas[index].DepartmentKeyId, //收匙人部門keyId
        this.$refs.radiochecks[index].toggle();
    },
    //選取鑰匙箱位置
    KeyBoxLocation_change() {
      this.KeyBoxLocationShow = true;
      this.SearchType = 2;
      // this.SearchType="鑰匙箱位置";
      this.Base_Key_Person();

    },
    //鑰匙箱位置選中事件
    KeyBoxLocation_change_change(e) {
      this.KeyLocation = e;
      this.PeopleInfo.UserDepartmentDatas.forEach((item, index) => {
        if (index == e) {
          this.KeyLocation = item.ResultName;
        }
      });
      console.log(this.KeyBoxLocation);
      console.log('鑰匙箱選中事件');
      console.log(e);
    },
    // 獲取鑰匙箱位置
    Get_KeyBox_Location() {
      this.SearchType = 2;
      // this.SearchType="鑰匙箱位置";
      this.Base_Key_Person(type);
    },
    // 放棄獲取鑰匙箱位置
    Cancel_Get_KeyBox_Location() {
      this.KeyBoxLocationShow = false;

    },
    // 鑰匙箱位置選中事件
    toogle_keybox(index) {
      this.$refs.radio_keybox[index].toggle();
    },

    // 收匙時間
    Ke_CollectTime() {
      this.title = "收匙時間"
      this.KeyBoxReceivedTimeShow = true;
    },
    //放盤時間起
    listing_start() {
      this.title = "放盤時間起"
      this.KeyBoxReceivedTimeShow = true;
    },
    //放盤時間止
    listing_end() {
      this.title = "放盤時間止"
      this.KeyBoxReceivedTimeShow = true;
    },
    //獨家日期起
    exclusive_start_listing() {
      this.title = "獨家日期起"
      this.KeyBoxReceivedTimeShow = true;
    },
    //獨家日期止
    exclusive_end_listing() {
      this.title = "獨家日期止"
      this.KeyBoxReceivedTimeShow = true;
    },
    //新增現場相
    Add_Scene() {
      // TODO:新增現場相,暫時缺少接口
      Toast('新增現場相');
    },
    // 新增查冊
    Add_Register() {
      //TODO:新增查冊,暫時缺少接口
      Toast('新增查冊')
    },
    //編輯房源
    Edit_House() {
      //TODO:編輯房源接口暫缺
      Toast('編輯房源接口暫缺')
    },
    // 中原成交
    Add_Deal() {
      // todo:中原成交接口暫缺
      Toast('中原成交');
    },
    //發佈房源
    Publish_House() {
      // TODO:發佈房源接口暫缺
      Toast('發佈房源')
    }


  },
};
