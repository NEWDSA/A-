/*
 * @Author: luciano 
 * @Date: 2021-12-10 15:22:09 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-03-07 15:12:07
 * 楼盘管理详情
 */
import Cookies from 'js-cookie'
import {
  checkPermission
} from '@/utils/permission' // 权限判断函数
import aplush from "@/api/A+"; // 獲取樓詳情
//mapgetters
import {
  mapGetters
} from 'vuex';

import {
  title
} from "@/settings";
import formattime from "@/utils/format_time";
import {
  Toast
} from "vant";
export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted() {
    let keyId = this.$route.query.KeyId;
    // 房源详情接口
    this.Get_House_Detail(keyId);

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
    });;
    //獲取系統類型
    this.base_system();
    console.log('this userinfo', this.userInfo.StaffNo);

    this.signature = this.userInfo.StaffNo;
    this.getArea() //手机号地区
    this.callShow() //称呼
    this.identityType() //联系人类型
    this.Get_Owner_Detail(); //获取业主信息
    this.Get_Key();

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
          text: "編輯房源",
          disabled: !checkPermission(['Property.BasicInformation.Modify-All', 'Property.BasicInformation.Modify-MySelf', 'Property.BasicInformation.Modify-MyDepartment'])
        },
        {
          text: "新增現場相",
          disabled: !checkPermission(['Property.RealSurvey.Add-All'])
        },
        {
          text: "查冊",
          disabled: !checkPermission(['Property.RealSurvey.Add-All'])
        },
        {
          text: "放盤紙",
          disabled: !checkPermission(['Property.OnlyTrust.Add-All'])
        },
        {
          text: "鑰匙",
          disabled: !checkPermission(['Property.Key.Add-All'])
        },
        {
          text: "中原成交"
        }
        // ,
        // {
        //   text: "發佈房源"
        // },
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
      activeKey: ["1"], // 鑰匙信息
      active: "",
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
      ZYVolShow: false, //中原成交
      ZYVol: {
        active: '1', //默认选中售成交
        Volume: "1", //一手二手
        truckSpace: false, //連車位
        Space: '', //车位
        VOLPeople: "", //成交人
        dialogVOLPeople: false, //成交人彈窗
        KeyWords: "",
        date: '', //成交日期
        showCalendar: false, //成交日期彈窗
        price: "", //成交價格
        identityType: "", //聯係人類型
        showTypePicker: false, //联系人类型彈窗
        name: "", //聯係人姓名
        call: "", //稱呼
        showCallPicker: false, //稱呼彈窗
        phoneAddress: "", //手機號碼地區
        showPhonePicker: false, //手機號碼地址彈窗
        phoneNumber: "", //電話號碼
        telephone: "", //座機
        weiXin: "", //微信
        VOLrentPeople: "", //租成交人
        rentdate: "", //租成交日期
        showCalendarRent: false, //租成交日期彈窗
        rentprice: "", //租成交價
        rent_Date: "", //租期至
        showRentDate: false //租期彈窗
      },
      loading: false,
      finish: true,
      showcell: false, //成交人輸入提示
      typeList: [], //聯係人類型數組
      callList: [], //称呼
      PhoneList: [], //手机号码地区
      celllist: [], //搜索智能提示
      nameID: "", //称呼Id
      identityTypeId: "", //联系人类型id
      phoneNo: "", //电话号码前缀
      ResultKeyId: "", //成交人id
      DepartmentKeyId: "", //成交人部门id
      // TrustType: "", //房源详情租售类型
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
      Rent_End: "", // 租金結束
      lc_AttachmentPath: "", // 附件路徑
      imgSize: Number, // 图片高度
      //图片总数
      imgCount: 0,
      imgWidth: 0,
      active_key: false,
      House_Owner_Loading:false,//加載業主信息
      KeyList_Loading:false,//加載鑰匙信息
      preview_show: false,//圖片預覽
      images: [],//預覽圖片地址數組
      preview_index: 0,//預覽圖片開始索引
    };
  },
  watch: {
    'ZYVol.VOLPeople': {
      handler: function (newval, oldVal) {
        this.ZYVol.VOLPeople = newval
      },
      deep: true
    }
  },
  filters: {
    formatt: function (value) {},
  },
  //获取 clientwidth
  beforeMount() {
    this.$nextTick(() => {
      this.imgWidth = document.documentElement.clientWidth;
    });

  },

  methods: {
    back() {
      this.$router.push("/House");
    },
    // 查看現場相
    look_Scene() {
      this.$router.push({ path: "Scene", query: { KeyId: this.$route.query.KeyId } });
    },
    e_key() {
      this.AddKeyShow = true;
    },
    // 放盤紙
    putPaper() {
      // 路由傳參
      this.$router.push({
        path: "PutPaper",
        query: {
          keyId: this.$route.query.KeyId
        }
      });
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
      console.log('index');
      console.log(index);
      this.current = index + 1;
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
          });
      } else {
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
    },
    // 撥打電話
    call() {
      this.show = true;
      //Cookies
      let usereinfo = JSON.parse(localStorage.getItem('AplusUserInfo'))
      if (usereinfo) {
        // 調用接口
        aplush.apis.ListingOwnerPhone({

          KeyId: this.$route.query.KeyId, //房源ID
          TrustorKeyID: House_Owner.KeyId, //業主ID
          EmployeeNo: usereinfo.StaffNo, //工號
          PhoneType:1,//手機,座機
          IsAdd0:true//是否加撥0


        }).then((res) => {
          if (res.Flag) {
            this.$toast("撥打成功");
          } else {
            this.$toast("撥打失败");
          }
        });
      }

    },
    // 收藏
    more_i() {
      this.showPopover = !this.showPopover;
      this.$nextTick(() => {
        this.showPopover = !this.showPopover;
      });
    },
    onSelect(action) {
      switch (action.text) {
        case "新增現場相":
          this.Add_Scene();
          break;
        case "查冊":
          this.Add_Register();
          break;
        case "放盤紙":
          this.AddPaperShow = true;
          break;
        case "鑰匙":
          // this.AddKeyShow = true;
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
      this.$router.push({
        path: '/AddFollow',
        query: {
          KeyId: this.$route.query.KeyId
        }
      });
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
    // 切換圖片
    Chage_Pic(item) {
      // 切換默認選中
      this.Picdefault = item.index;
      item.value == "室內圖" ?
        this.soucrce_keyId :
        (this.soucrce_keyId = "8457527f-9269-4d8e-9c06-714f7c276421");
    },
    // 獲取房源詳情
    Get_House_Detail(keyId) {
      aplush.apis.ListingDetail(keyId).then((res) => {
        this.House_detail = res;
        this.images=res.Photos.map(v=>v.ImgPath);
        this.imgCount = res.Photos.length;
        this.current = this.imgCount;
        this.bool_collect = this.House_detail.IsFavorite
      });
    },
    PreviewImagesChange(index) {
      this.preview_index = index;
    },
    getOwner() {

    },
    // 獲取鑰匙信息
    getKeys() {
      if(!this.activeKey.includes(0)){
        this.Get_Key();
      }
    },
    //獲取鑰匙信息
    // 獲取業主信息
    Get_Owner_Detail() {
      let keyId = this.$route.query.KeyId;
      this.House_Owner_Loading = true;
      aplush.apis
        .ListingOwner({
          keyId: keyId,
        })
        .then((res) => {
          this.House_Owner_Loading = false;
          this.House_Owner = res.Trustors;
        });
    },
    //獲取鑰匙
    Get_Key() {
      let keyId = this.$route.query.KeyId;
      this.KeyList_Loading=true;
      aplush.apis
        .ListingKey({
          keyId: keyId,
        })
        .then((res) => {
          this.KeyList = res.PropKeys;
          console.log('打印鑰匙信息');
          this.KeyList_Loading=false;
        });
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
      this.Scene_keyId = this.other_select;
      this.Pic_base();
    },
    //添加聯繫人
    add_contact() {
      this.SearchType = 1;
      this.lc_Type = "添加聯繫人";
      // this.contact_Type = true;
      this.lc_recevier = false;
      this.KeyReceiverShow = true;
      this.SearchPersonList = [];
      this.Base_Key_Person(this.lc_Type);
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
        RentPriceEnd: this.Rent_End, //租價至
        Attachments: '', //附件集合
        AttachmentName: "", //附件名稱
        AttachmentPath: this.lc_AttachmentPath, //附件路徑
        ContactPersons: this.ContactList, //聯繫人集合
        UserKeyId: "2010195", //操作人KeyID
        DeptKeyId: "2010195", //操作人部門KeyID
      }).then(res => {

      })

    },
    // 上傳文件至服務器
    afterRead(file) {
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      console.log(file.name);
      aplush.apis.UploadFile(fd).then((res) => {
        this.lc_AttachmentPath = window.location.host + res;
        console.log(document.querySelector('.van-uploader__preview-image').classList.remove('van-image'))
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

      }
      this.KeyBoxReceivedTimeShow = false;
    },
    // 鑰匙數量選中事件
    Key_Box_Key_Count_Select(item) {
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
          this.KeyBoxNo = res.Result.KeyNumber;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增鑰匙
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
      //改為多選
      this.lc_Type === "添加聯繫人" ? this.KeyReceiver = "" : this.KeyReceiver = e;
      this.PeopleInfo.UserDepartmentDatas.forEach((item, index) => {
        if (this.lc_Type != '添加聯繫人') {
          if (index == e) {
            this.KeyReceiver = item.ResultName;
          }
        } else {
          this.ContactList = e;
        }
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
      // Toast('新增現場相');
      this.$router.push({
        path: '/AddScene',
        query: {
          keyId: this.$route.query.KeyId,
        }
      });
    },
    // 新增查冊
    Add_Register() {
      // Toast('新增查冊')
      this.$router.push({
        path: '/SeeBook',
        query: {
          HouseKeyId: this.$route.query.KeyId
        }
      });

    },
    //編輯房源
    Edit_House() {
      this.$router.push({
        path: '/EditHouse',
        query: {
          HouseKeyId: this.$route.query.KeyId,
        }
      })
    },
    // 中原成交
    Add_Deal() {
      this.ZYVolShow = true
    },
    //發佈房源
    Publish_House() {
      // TODO:發佈房源接口暫缺
      Toast('發佈房源')
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    // 售成交日期
    confirmDate(date) {
      this.ZYVol.showCalendar = false;
      this.ZYVol.date = this.formatDate(date);
    },
    // 请求联系人类型
    identityType() {
      aplush.apis.SystemType({
        Type: "21"
      }).then((res) => {
        console.log('res2', res)
        res.Result.Items.forEach((item) => {
          if (item.ItemName) {
            this.typeList.push({
              'text': item.ItemName,
              keyId: item.KeyId
            })
          }
        })
      })
    },
    // 联系人类型
    ConfirmType(value) {
      console.log('value', value)
      this.ZYVol.identityType = value.text;
      this.identityTypeId = value.keyId;
      this.ZYVol.showTypePicker = false;
    },
    callShow() {
      aplush.apis.SystemType({
        Type: "23"
      }).then((res) => {
        console.log('res1', res)
        res.Result.Items.forEach((item) => {
          if (item.ItemName) {
            this.callList.push({
              'text': item.ItemName,
              keyId: item.KeyId
            })

          }
        })
      })
    },
    // 聯係人名字後綴
    ConfirmCall(value) {
      this.ZYVol.call = value.text;
      this.nameID = value.keyId
      this.ZYVol.showCallPicker = false;
    },
    // 手機號碼地區
    ConfirmPhone(value) {
      this.ZYVol.phoneAddress = value.text;
      this.phoneNo = value.phoneNo;
      this.ZYVol.showPhonePicker = false;
    },
    // 租成交日期
    confirmrentDate(date) {
      this.ZYVol.showCalendarRent = false;
      this.ZYVol.rentdate = this.formatDate(date);
    },
    // 租期至
    confirm_rent(date) {
      this.ZYVol.showRentDate = false;
      this.ZYVol.rent_Date = this.formatDate(date);
    },
    // 提交售表单
    submitSellFrom() {
      this.$refs.SellFrom.validate().then(() => {
        this.ZYVolShow = false
        aplush.apis.propertyManualover({
          KeyID: this.$route.query.KeyId, //房源编号
          TransactionType: '1', //租售类型
          TransactionDate: this.ZYVol.date, //售成交日期
          TransactionType2: this.ZYVol.Volume, //一手二手
          OwnerName: this.ZYVol.name, //联系人名字
          GenderKeyId: this.nameID, //称呼ID
          TrustorTypeKeyId: this.identityTypeId, //联系人类型
          MobileAttribution: this.phoneNo, //手机号码归属地
          Mobile: this.ZYVol.phoneNumber, //手机号
          Tel: this.ZYVol.telephone, //座机
          WeChat: this.ZYVol.weiXin, //微信
          CarNo: this.ZYVol.Space, //连车位号
          Pric: this.ZYVol.price, //成交价
          TargetContractorKeyId: this.ResultKeyId, //成交人id
          TargetContractorDeptKeyId: this.DepartmentKeyId //成交人部门id
        })
        Object.assign(this.$data.ZYVol, this.$options.data().ZYVol) // 这里重置 ZYVol 数据，其他不受影响
      }).catch(() => {
        //验证失败
        console.log("验证失败")
      })

    },
    submitRentFrom() {
      this.$refs.rentFrom.validate().then(() => {
        this.ZYVolShow = false
        aplush.apis.propertyManualover({
          KeyID: this.$route.query.KeyId, //房源编号
          TransactionType: '2', //租售类型
          TransactionDate: this.ZYVol.rentdate, //租成交日期
          RentToDate: this.ZYVol.rent_Date, //租期至
          Pric: this.ZYVol.rentprice, //租成交價
          TargetContractorKeyId: this.ResultKeyId, //成交人id
          TargetContractorDeptKeyId: this.DepartmentKeyId //成交人部門id
        }).then(res => {
          res.Flag == true ? Toast('中原成交修改成功') : Toast(res.ErrorMsg);
        })
        Object.assign(this.$data.ZYVol, this.$options.data().ZYVol) // 这里重置 ZYVol 数据，其他不受影响
      }).catch(() => {
        //验证失败
        console.log("验证失败")
      })
    },
    // 獲取手機號地區
    getArea() {
      let Type = 125
      aplush.apis.chooseArea({
        Type
      }).then((res) => {
        console.log('resArea', res)
        res.Result.Items.forEach((item) => {
          if (item.ItemName) {
            this.PhoneList.push({
              text: item.ItemName,
              phoneNo: item.ItemNo
            })
          }
        })
      })
    },
    // 搜索成交人
    onchangeVOLPeople() {
      this.showcell = true
      aplush.apis.SelectPerson({
        "KeyWords": this.ZYVol.KeyWords,
        "AutoCompleteType": 1,
      }).then((res) => {
        this.celllist = res.UserDepartmentDatas
      })
    },
    closeDialogVOLPeople() {
      this.ZYVol.dialogVOLPeople = false;
    },
    confirmVOLPeople() {
      this.ZYVol.dialogVOLPeople = false;
      this.ZYVol.VOLPeople = this.ZYVol.KeyWords
      this.celllist = []
      this.ZYVol.KeyWords = ''
      this.showcell = false
    },
    chooseName(item) {
      console.log("item", item)
      this.ZYVol.KeyWords = item.ResultName
      this.DepartmentKeyId = item.DepartmentKeyId
      this.ResultKeyId = item.ResultKeyId
      this.showcell = false
    },
    confirmPeople() {
      this.ZYVol.dialogVOLPeople = false;
      this.ZYVol.VOLrentPeople = this.ZYVol.KeyWords
      this.celllist = []
      this.ZYVol.KeyWords = ''
      this.showcell = false
    }
  }
};
