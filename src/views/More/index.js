/*
 * @Author: luciano 
 * @Date: 2021-12-17 16:17:49 
 * @Last Modified by: Abner
 * @Last Modified time: 2022-03-02 16:58:57
 */
import {
  Toast
} from "vant";
import Draggable from "vuedraggable"; //使用自由拖拽組件
import aplus from '@/api/A+';
export default {
  name: "Home",
  data() {
    return {
      HomeApp: [],
      RecoApplication: [],
      AppStatus: "編輯",
      index: 0,
      disabled: true
    };
  },
  components: {
    Draggable,
  },
  beforeMount() {
    this.getApp();
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
    //獲取應用
    getApp() {
      aplus.apis.getMenu().then(res => {
        this.HomeApp = res.HasMenus;
        this.HomeApp.forEach((item) => {
          item.bage = "";
        });
        this.RecoApplication = res.NotHasMenus;
      })
    },
    // 編輯應用
    EditApplication(item) {
      if(this.index==0){
        this.index=1;
        this.AppStatus = "完成";
        this.disabled = false;
        this.HomeApp.forEach((item) => {
          item.bage = "-";
        });
        this.RecoApplication.forEach((item) => {
          item.bage = "+";
        });
      }else{
        this.index=0;
        this.AppStatus = "编辑";
        this.disabled = true;
        this.HomeApp.forEach((item) => {
          item.bage = "";
        });
        this.RecoApplication.forEach((item) => {
          item.bage = "";
        });
        this.EditApi();
        this.$router.push("/");
      }
    },
    //拖拽應用
    dragChange(e) {
      console.log("觸發事件");
      console.log(e.movedoldIndex);
      //使用 e.moved.newIndex 、 e.moved.oldIndex  
      //得到更新後的新位置
      this.HomeApp.forEach((item, index) => {
        if (index === e.moved.newIndex) {
          item.index = e.moved.newIndex;
        }
      });

    },
    // end 拖拽應用
    // 添加應用
    AddAplicaton(item) {
      //待添加應用
      let obj = item;
      // end 待添加應用
      if (this.AppStatus == "完成" && this.index == 1) {
        this.HomeApp.push(obj);
        // 通過下標尋找對應的對象
        let lc_index = this.HomeApp.findIndex((item) => item == obj);
        // end 通過下標尋找對應的對象
        this.HomeApp.forEach((item, index) => {
          if (index == lc_index) {
            item.bage = "-";
          }
        });
        this.RecoApplication.splice(
          this.RecoApplication.findIndex((item) => item === obj),
          1
        );
      }
    },
    // 移除應用
    RemoveApp(item) {
      let _temp = item;
      //移除數組單個項目
      if (this.index == 1) {
        //移除的時候至少要有一個應用
        if (this.HomeApp.length > 1) {
          //刷新視圖
          this.$nextTick(() => {
            this.HomeApp.splice(
              this.HomeApp.findIndex((item) => item === _temp),
              1
            );
            _temp.bage="+";
            this.RecoApplication.push(_temp);
            //this.getApp();
          });

        }

      }
    },
    // App接口
    EditApi() {
      aplus.apis.editMenu(this.HomeApp).then(res => {
        res == true ? Toast.success('操作成功') : Toast.fail('操作失敗');
      })
    }
  },
};
