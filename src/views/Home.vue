<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>
    <img style="width:100%" src="img/banner_pic.png" alt="">
  </van-swipe-item>
  <van-swipe-item>
    <img style="width:100%" src="img/banner_pic.png" alt="">

  </van-swipe-item>
</van-swipe>


<div style="background-color:white;border-radius:15px;position: relative;top:-35px"> 
  <div style="height:13px"></div>
 <van-grid>
  <van-grid-item icon="icon/building_icon.png" text="樓盤管理" @click="house"  />
  <van-grid-item icon="icon/custome_icon.png" text="客戶管理" />
  <van-grid-item icon="icon/poll_icon.png" text="公客池" />
  <van-grid-item icon="icon/collection_icon.png" text="我的收藏" />
  <van-grid-item icon="icon/work-icon.png" text="工作量化" />
  <van-grid-item icon="icon/deal_icon.png" text="成交報告" />
  <van-grid-item icon="icon/more_icon.png" @click="more" text="更多" />
</van-grid>
<div style="display:flex;margin:0 10px">
  <nav style="background-color:green;flex:1;background: url(icon/bg_one_pic.png) center center/100% 100%">
     <div style="padding:11px">
       <div style="fontWeight:bold;color: #4b6fc1;font-size:14px;padding-left:5px">
         錄帶看
       </div>
       <div style="color:#788ab5;font-size:12px;padding-top:8px;padding-left:5px">
         記錄帶看客戶
       </div>
     </div>
  </nav>
    <div style="flex:0.02">

       </div>
  <nav style="background-color:;flex:1;background: url(icon/bg_two_pic.png) no-repeat center center/100% 100% ">
       <div style="padding:11px">
        
       <div style="fontWeight:bold;color: #8b3335;font-size:14px;padding-left:5px">
         錄客戶
       </div>
     
       <div style="color:#b68485;font-size:12px;padding-top:8px;padding-left:5px">
         新增客戶信息
       </div>
       
     </div>
  </nav>
</div>



  <div style="background-color:;margin:13px 15px">
    <span style="font-size:20px">降價房源</span>
    
  </div>
  
  <div style="display:flex;margin:0 10px">
  <nav  class="decrease" style="background-color:;flex:1; height:134px">
    <article>
      君悅灣(第 <br />
      六座)君薈 7A
    </article>

      <article style="background-color:white">
        2-0-0-0 | 1,186呎  <br />
      970萬
    </article>

    <article style="background-color:#f12945;color:white;border-radius:35px;line-height:30px">
       降 30 萬  <img src="icon/right_icon.png" style="width:16px;" alt="">
    </article>
  </nav>
    <div style="flex:0.02">

    </div>
  <nav  class="decrease" style="background-color:;flex:1; height:134px">
      <article>
      星海豪庭 <br />
      (紅星閣) 13K 
    </article>

      <article style="background-color:white">
        3-2-0-0 | 1,458呎  <br />
      960萬
    </article>


    <article style="background-color:#f12945;color:white;border-radius:35px;line-height:30px">
       降 8 萬 <img src="icon/right_icon.png" style="width:16px;" alt="">
    </article>
    
  </nav>
</div>
  

</div>
 
  </div>
</template>

<script>
import router from '@/router';
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
    more(){
       this.$router.push("More")
    },
    house(){
             this.$router.push("House?from=home")

    }
  }
};
</script>

<style scoped lang="scss">
.decrease article {
  position: relative;
  line-height: 25px;
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