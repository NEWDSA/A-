<template>
  <div id="app">
    <router-view />
    <!-- 对路由进行判断 -->
    <div class="lc_bar">
      <van-tabbar fixed safe-area-inset-bottom route active-color="#ee0a24" v-show="show_bar">
        <van-tabbar-item replace to="/Home">
          <template #icon="props">
            <img :src="props.active ? icon_home.active : icon_home.inactive" />
            <span class="lc_span">首頁</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/House">
          <template #icon="props">
            <img
              :src="props.active ? icon_house.active : icon_house.inactive"
            />
            <span class="lc_span">樓盤管理</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Customer">
          <template #icon="props">
            <img
              :src="
                props.active ? icon_customer.active : icon_customer.inactive
              "
            />
            <span class="lc_span">客戶管理</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Message">
          <template #icon="props">
            <img :src="props.active ? icon_news.active : icon_news.inactive" />
            <span class="lc_span">消息</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Mine">
          <template #icon="props">
            <img :src="props.active ? icon_mine.active : icon_mine.inactive" />
            <span class="lc_span">我的</span>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- end 对路由进行判断 -->
  </div>
</template>

<!-- <script src="//wurfl.io/wurfl.js" crossorigin></script> -->
<script>
import Cookies from "js-cookie";
import watermark from "./utils/watermark";
import { getUserInfo } from "./api/authentication";

export default {
  name: "Home",
  data() {
    return {
      icon_home: {
        active: "icon/home_seleted_icon.png",
        inactive: "icon/home_unseleted_icon.png",
      },
      icon_house: {
        active: "icon/house_seleted_icon.png",
        inactive: "icon/house_unseleted_icon.png",
      },
      icon_customer: {
        active: "icon/customer_selected_icon.png",
        inactive: "icon/customer_unselected_icon.png",
      },

      icon_news: {
        active: "icon/news_seleted_icon.png",
        inactive: "icon/news_unselected_icon.png",
      },
      icon_mine: {
        active: "icon/mine_selected_icon.png",
        inactive: "icon/mine_unselected_icon.png",
      },
      show_bar: true, //是否顯示tabbar
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
      //判断是否显示tabbar
      // v-if="this.$route.path=='/Home' || this.$route.path=='/Customer' || this.$route.path=='/Mine' || this.$route.path=='/House' "
    },
  },

  mounted() {
    watermark.set("IT Luciano 彭量 4176 ");
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
  height: 100%;
  font-family: "PingFangSC-Regular", sans-serif;
  font-weight: normal;
  font-stretch: normal;
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
</style>
