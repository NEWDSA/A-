<template>
  <div id="app">
  
    <van-tabbar v-model="active" active-color="#ee0a24" v-if="$tabbar_b">
      <van-tabbar-item to="/Home">
        <span>首頁</span>
        <template #icon="props">
          <img :src="props.active ? icon_home.active : icon_home.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/House">
        <span>樓盤管理</span>
        <template #icon="props">
          <img :src="props.active ? icon_house.active : icon_house.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/Customer">
        <span>客戶管理</span>
        <template #icon="props">
          <img
            :src="props.active ? icon_customer.active : icon_customer.inactive"
          />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/Message">
        <span>消息</span>
        <template #icon="props">
          <img :src="props.active ? icon_news.active : icon_news.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/Login">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon_mine.active : icon_mine.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

      <router-view />
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      active: 0,
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
    };
  },
  created(){
console.log(this.$tabbar_b)
  },
   watch:{
    $route(to,from){
      //判断是否显示tabbar
      if(to.query.from=='home'){
        this.$tabbar_b = false
        this.$route.meta.showTab = true
        // console.log(this.$tabbar_b)
      }else{
        this.$route.meta.showTab = false
        this.$tabbar_b = true
        console.log('显示')
      }
    }
 }, 
  methods: {
    more() {
      this.$router.push("More");
    },
  },
};
</script>

<style> 

/* #app {
  background-color: #fff;
} */
.van-tabbar {
  height: calc(54px + constant(safe-area-inset-bottom));
     height: calc(54px + env(safe-area-inset-bottom));
}
</style>
