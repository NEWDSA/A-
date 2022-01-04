/*
 * @Author: luciano 
 * @Date: 2021-12-17 16:17:49 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-01-03 10:49:10
 */
import { Toast } from "vant";
import Draggable from "vuedraggable"; //使用自由拖拽組件
export default {
  name: "Home",
  data() {
    return {
      HomeApp: [
        {
          title: "樓盤管理",
          icon:require("@/assets/icon/building_icon.png"),
          bage: "",
          sort: 1,
        },
        {
          title: "客戶管理",
          icon: require("@/assets/icon/custome_icon.png"),
          bage: "",
          sort: 2,
        },
        {
          title: "公客池",
          icon: require("@/assets/icon/poll_icon.png"),
          bage: "",
          sort: 3,
        },
        {
          title: "我的收藏",
          icon: require("@/assets/icon/collection_icon.png"),
          bage: "",
          sort: "4",
        },
        {
          title: "工作量化",
          icon: require("@/assets/icon/work-icon.png"),
          bage: "",
          sort: "5",
        },
        {
          title: "成交報告",
          icon: require("@/assets/icon/deal_icon.png"),
          bage: "",
          sort: "6",
        },
      ],
      RecoApplication: [
        {
          title: "集團資訊",
          icon: require("@/assets/icon/group_icon.png"),
          sort: "1",
        },
        {
          title: "每日推薦",
          icon: require("@/assets/icon/group_icon.png"),
          sort: "2",
        },
        {
          title: "粵港澳資訊",
          icon: require("@/assets/icon/group_icon.png"),
          sort: "3",
        },
        {
          title: "蘋果日報",
          icon: require("@/assets/icon/group_icon.png"),
          sort: "4",
        },
      ],
      AppStatus: "編輯",
      index: 0,
      disabled:true
    };
  },
  components: {
    Draggable,
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    more() {
      this.$router.push("More");
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    // 編輯應用
    EditApplication(item) {
      if (this.index === 0) {
        this.AppStatus = "編輯";
      }
      ++this.index;
      if (this.AppStatus == "編輯") {
        this.HomeApp.forEach((item) => {
          item.bage = "-";
        });
        this.disabled=false;
      }
      // 給應用添加移除標籤
      if (this.index === 2) {
        this.AppStatus = "完成";
        this.HomeApp.forEach((item) => {
          item.bage = "";
        });
        this.index = 0;
      }
      // end 給應用添加移除標籤
    },
    // end 編輯應用
    //拖拽應用
    dragChange(e) {
      console.log("觸發事件");
      console.log(e);
    },
    // end 拖拽應用
    // 添加應用
    AddAplicaton(item) {
      //待添加應用
      let obj = item;
      // end 待添加應用
      if (this.AppStatus == "編輯" && this.index == 1) {
        this.HomeApp.push(obj);
        // 通過下標尋找對應的對象
        let lc_index = this.HomeApp.findIndex((item) => item == obj);
        // end 通過下標尋找對應的對象
        this.HomeApp.forEach((item, index) => {
          console.log(item[index]);
          if (index == lc_index) {
            item.bage = "-";
          }
        });
      }
    },
    // end 添加應用
    // 移除應用
    RemoveApp(item) {
      let _temp = item;
      //移除數組單個項目
      if (this.index == 1) {
        this.HomeApp.splice(
          this.HomeApp.findIndex((item) => item === _temp),
          1
        );
      }

      //end 移除數組單個項目
    },
    // end 移除應用
  },
};