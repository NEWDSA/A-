<template>
  <div id="app">
    <router-view />
    <!-- 对路由进行判断 -->
    <div class="lc_bar">
      <van-tabbar route active-color="#ee0a24" v-show="show_bar">
        <van-tabbar-item replace to="/Home">
          <span>首頁</span>
          <template #icon="props">
            <img :src="props.active ? icon_home.active : icon_home.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/House">
          <span>樓盤管理</span>
          <template #icon="props">
            <img
              :src="props.active ? icon_house.active : icon_house.inactive"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Customer">
          <span>客戶管理</span>
          <template #icon="props">
            <img
              :src="
                props.active ? icon_customer.active : icon_customer.inactive
              "
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Message">
          <span>消息</span>
          <template #icon="props">
            <img :src="props.active ? icon_news.active : icon_news.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/Home">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? icon_mine.active : icon_mine.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- end 对路由进行判断 -->
  </div>
</template>

<script>
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
      show_bar:true//是否顯示tabbar
    };
  },
  watch: {
    $route(to, from) {
       console.log(to.path)
       //to.path ==='/Home':
       if(to.path==='/Home' || to.path==='/House' || to.path==='/Customer' || to.path==='/Mine' || to.path==='Message'){
         this.show_bar=true;
       }else{
         this.show_bar=false;
       }
      //判断是否显示tabbar
      // v-if="this.$route.path=='/Home' || this.$route.path=='/Customer' || this.$route.path=='/Mine' || this.$route.path=='/House' "
    },
  },
  methods: {
    more() {
      this.$router.push("More");
    },
  },
};
</script>
<style lang="less">
@import "~vux/src/styles/reset.less";
</style>
<style scoped lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.lc_bar {
  position: relative;
  height: 30px;
}
/* #app {
  background-color: #fff;
} */
// .van-tabbar {
//   height: calc(54px + constant(safe-area-inset-bottom));
//      height: calc(54px + env(safe-area-inset-bottom));
// }

::v-deep .van-tabbar--fixed {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
