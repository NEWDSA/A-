<template>
  <div id="app">
    <router-view />
    <!-- 对路由进行判断 -->
    <!-- <div class="lc_bar"> -->
    <van-tabbar fixed route active-color="#ee0a24" v-if="show_bar">
      <van-tabbar-item replace to="/House">
        <template #icon="props">
          <img :src="props.active ? icon_house.active : icon_house.inactive" />
          <span class="lc_span">樓盤管理</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/Customer">
        <template #icon="props">
          <img
            :src="props.active ? icon_customer.active : icon_customer.inactive"
          />
          <span class="lc_span">客戶管理</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/Home">
        <template #icon="props">
          <img :src="props.active ? icon_home.active : icon_home.inactive" />
          <span class="lc_span">首頁</span>
        </template>
      </van-tabbar-item>
      <!-- <van-badge :content="unread_message"> -->
      <van-tabbar-item replace to="/Message" :badge="unread_message">
        <template #icon="props">
          <img :src="props.active ? icon_news.active : icon_news.inactive" />
          <span class="lc_span">消息</span>
        </template>
      </van-tabbar-item>
      <!-- </van-badge> -->
      <van-tabbar-item replace to="/Mine">
        <template #icon="props">
          <img :src="props.active ? icon_mine.active : icon_mine.inactive" />
          <span class="lc_span">我的</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- </div> -->
    <!-- end 对路由进行判断 -->
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
import Cookies from "js-cookie";
import watermark from "./utils/watermark";
// import user from 'mock/user';
import {mapGetters} from "vuex";
// import { getUserInfo } from "./api/authentication";
export default {
  name: "Home",
  data() {
    return {
      icon_home: {
        active: require("@/assets/icon/home_seleted_icon.png"),
        inactive: require("@/assets/icon/home_unseleted_icon.png"),
      },
      icon_house: {
        active: require("@/assets/icon/house_seleted_icon.png"),
        inactive: require("@/assets/icon/house_unseleted_icon.png"),
      },
      icon_customer: {
        active: require("@/assets/icon/customer_selected_icon.png"),
        inactive: require("@/assets/icon/customer_unselected_icon.png"),
      },

      icon_news: {
        active: require("@/assets/icon/news_seleted_icon.png"),
        inactive: require("@/assets/icon/news_unselected_icon.png"),
      },
      icon_mine: {
        active: require("@/assets/icon/mine_selected_icon.png"),
        inactive: require("@/assets/icon/mine_unselected_icon.png"),
      },
      show_bar: true, //是否顯示tabbar

      // 調用 getters 中的 unread_count
      unread_message: "",
    };
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      //to.path ==='/Home':
      if (
        to.path === "/Home" ||
        to.path === "/House" ||
        to.path === "/Customer" ||
        to.path === "/Mine" ||
        to.path === "/Message"
      ) {
        this.show_bar = true;
      } else {
        this.show_bar = false;
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("bage/get_unread_count");
  },
  beforeMount() {
    this.unread_message = this.$store.getters.unread_count;
    // 獲取更新後的數據
    this.$store.watch(
      (state) => state.bage.unread_count,
      (new_count) => {
        this.unread_message = new_count;
      }
    );
  },
  mounted() {
    // let userInfo = Cookies.get("userInfo");
    // if (userInfo != null) {
    //   userInfo = JSON.parse(userInfo);
    //   watermark.set(userInfo.UserName + "" + userInfo.StaffNo);
    // }
    // userInfo.Mobile
    
  },
  methods: {
    more() {
      this.$router.push("More");
    },
  },
};
</script>
<style scoped lang="scss">
@font-face {
  font-family: "PingFangSC-Regular, sans-serif";
  src: url("/assets/PingFang-SC-Regular.ttf");
}
@font-face {
  font-family: "PingFangSC-Medium, sans-serif";
  src: url("/assets/PingFang-SC-Medium.ttf");
}

html,
body,
#app {
  width: 100%;
  height: 100vh;
  font-family: "PingFangSC-Regular", sans-serif;
  font-weight: normal;
  font-stretch: normal;
  background-color: #f3f3f3;
  //橫屏檢測
}

::-webkit-scrollbar {
  display: none;
  width: 0px;
}
::v-deep .van-pull-refresh {
  width: 100%;
  height: calc(100vh - 200px);
  overflow-y: scroll;
}

.van-tabbar {
  height: 70px;
  box-shadow: 0px -1px 0px 0px #dddddd;
}

::v-deep .van-tabbar--fixed {
  position: fixed;
  bottom: 0;
  left: 0;
}
.van-tabbar-item__icon img {
  display: block;
  /* height: 0.53333rem; */
  width: 50px;
}
.van-tabbar-item__icon img {
  display: block;
  height: auto;
}
::v-deep .van-tabbar-item__icon {
  position: relative;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .lc_span {
    position: relative;
    top: -5px;
    vertical-align: middle;
    font-size: 10px;
  }
}
::v-deep .van-tabbar-item .van-info {
  margin-top: 10px;
}
// ::v-deep .van-badge--fixed {
//   top: 12px;
// }
</style>
