<template>


 <!-- <van-icon @click="back" name="arrow-left" />
          <van-search class="search" v-model="value" placeholder="樓盤名稱 | 棟座單元 | 房號" /> -->

  <div>
<van-nav-bar title="" cross>
  <template #left>
    <van-icon class="cross" name="cross" size="18" @click="back" />
  </template>
</van-nav-bar>

<van-nav-bar
  title=""
  left-text="首頁應用"
  right-text="編輯"
  @click-right="onClickRight"/>

<div style="background-color:#fff;border-radius:15px;position: relative;"> 
   <van-grid>
  <van-grid-item icon="icon/building_icon.png" text="樓盤管理"  />
  <van-grid-item icon="icon/custome_icon.png" text="客戶管理" />
  <van-grid-item icon="icon/poll_icon.png" text="公客池" />
  <van-grid-item icon="icon/collection_icon.png" text="我的收藏" />
  <van-grid-item icon="icon/work-icon.png" text="工作量化" />
  <van-grid-item icon="icon/deal_icon.png" text="成交報告" />
  </van-grid>


<van-nav-bar
  title=""
  left-text="推薦應用"
    @click-right="onClickRight">
   <template #left>
    <h3>推薦應用</h3>
    <span style="font-size:9px;padding-top: 4px;color:#999999">點擊添加到首頁應用</span>
  </template>
  <!-- <van-nav-bar title="标题" left-text="返回" left-arrow>
  <template #right>
    <div>4444444</div>
  </template>
</van-nav-bar> -->
</van-nav-bar>

   <van-grid>
  <van-grid-item badge="+"  icon="icon/group_icon.png" text="集團資訊"  />
  </van-grid>
</div>



  </div>
</template>

<script>
import { Toast } from 'vant';
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
  methods:{
    back(){
      this.$router.push('/')

    },
    more(){
       this.$router.push("More")
    },
        onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
  }
};
</script>

<style>
body {
  background-color: white;
}
.van-info {
  background-color: #4c89e2;
}
.van-nav-bar__left .van-nav-bar__text {
  font-size:16px ;
  color: #333333;
  font-weight: 700;
}
.van-nav-bar__right .van-nav-bar__text {
   width: 66px;
   height: 26px;
   line-height: 26px;
   background-color: #f12945;
   color: white;
   border-radius: 5px;
}
.van-icon.cross {
      font-size: 28px !important;
      color: #666666 !important;
}
.decrease article {
  position: relative;
  line-height: 22px;
  text-align: center;
   width: 120px;
   font-size: 15px;
   background-color: #fae8da;
   margin: auto;
}
.decrease article img {
  width: 16px;
  position: absolute;
  top: 7px;
    right: 15px;
}
.decrease {
  height: 184px;
  background: url(/icon/card_bg_pic.png) bottom center;
  border:1px solid #f9e3c5;
}
body {
  overflow: auto !important;
}
.dv {
  flex-direction: column;
}
.van-grid-item__content {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: 12px 8px;
    background-color: #fff;
}
.van-grid-item__icon {
    font-size: 43px;
}

.van-swipe__indicators {
    position: absolute;
    bottom: 45px;
    left: 50%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
body {
  background: #ebeced;
  overflow: hidden;
}
.my-swipe {
  height: 212px;
}
  .my-swipe .van-swipe-item {
    height: 212px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    /* background-color: #39a9ed; */
  }
/* 滚动条无法滚动问题修复 */
.van-tabs__content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 999;
  overflow: scroll;
}
</style>