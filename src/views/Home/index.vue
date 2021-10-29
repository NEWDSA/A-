<template>
  <div class="container">
    <van-swipe class="my-swipe"  indicator-color="white">
      <van-swipe-item>
        <img style="width: 100%" src="img/banner_pic.png" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img style="width: 100%" src="img/banner_pic.png" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="lc_gap">
      <div class="gap1"></div>
      <div style="border: none !important" class="van-grid van-hairline--top">
        <div class="van-grid-item" style="flex-basis: 25%">
          <div
            style="border: none !important"
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/building_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">樓盤管理</span>
          </div>
        </div>
        <div class="van-grid-item" style="flex-basis: 25%">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/custome_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">客戶管理</span>
          </div>
        </div>
        <div class="van-grid-item" style="flex-basis: 25%">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/poll_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">公客池</span>
          </div>
        </div>
        <div class="van-grid-item" style="flex-basis: 25%">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/collection_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">我的收藏</span>
          </div>
        </div>
        <div class="van-grid-item" style="flex-basis: 25%">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/work-icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">工作量化</span>
          </div>
        </div>
        <div data-v-fae5bece="" class="van-grid-item" style="flex-basis: 25%">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/deal_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">成交報告</span>
          </div>
        </div>
        <div data-v-fae5bece="" class="van-grid-item" style="flex-basis: 25%" @click="more">
          <div
            class="
              van-grid-item__content van-grid-item__content--center
              van-hairline
            "
          >
            <i class="van-icon van-grid-item__icon"
              ><img
                src="icon/more_icon.png"
                class="van-icon__image"
              /><!----></i
            ><span class="van-grid-item__text">更多</span>
          </div>
        </div>
      </div>
      <!-- 錄帶看 and 錄客戶box -->
      <div class="custom_box">
        <nav class="bg1">
          <div class="container">
            <div class="main_title">錄帶看</div>
            <div class="oth_container">記錄帶看客戶</div>
          </div>
        </nav>
        <div style="flex: 0.02"></div>
        <nav class="bg2">
          <div class="container">
            <div class="main_title">錄客戶</div>

            <div class="oth_title">新增客戶信息</div>
          </div>
        </nav>
      </div>
      <!-- end 錄帶看 and 錄客戶box -->
      <!-- 房源標題 -->
      <div class="main_title">
        <span>降價房源</span>
      </div>
      <!-- end 房源標題 -->
      <div data-v-fae5bece="" class="lc_grid van-grid van-hairline--top">
        <template v-for="(item, index) in houseDetail">
          <div :key="index" data-v-fae5bece="" class="van-grid-item lc_item1">
            <div class="lc_content">
              <div data-v-fae5bece="">{{ item.title }}</div>
            </div>
            <div class="lc_content2">
              <div class="lc_mix">{{ item.unit }} | {{ item.are }}呎</div>
              <div class="lc_price">{{ item.price }}萬</div>
              <div class="lc_cute">
                <span class="word">降</span
                ><span class="money">{{ item.priceCute }}</span
                ><span class="word">萬</span>
                <img class="left" src="icon/right_icon.png" />
              </div>
              <!-- <van-button type="danger" >{{item.priceCute}}</van-button> -->
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
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
      houseDetail: [
        {
          title: "君悅灣(第六座)君匯 7A",
          unit: "2-0-0-0",
          area: "1,186",
          price: "970",
          priceCute: "30",
        },
        {
          title: "星海豪庭(紅星閣) 13K",
          unit: "3-2-0-0",
          area: "1,458",
          price: "880",
          priceCute: "20",
        },
        {
          title: "星星閣(紅星閣) 18K",
          unit: "3-3-5-4",
          area: "1,658",
          price: "870",
          priceCute: "30",
        },
        {
          title: "海天樓(海海樓) 8K",
          unit: "5-5-5-4",
          area: "1,858",
          price: "866",
          priceCute: "50",
        },
      ],
    };
  },
  methods: {
    more() {
      this.$router.push("More");
    },
    house() {
      this.$router.push("House?from=home");
    },
  },
};
</script>

<style scoped lang="scss">
// html,body{
//   width: 100%;
//   height: 100%;
// }
.container {
  position: relative;
  width: 100%;
  // height: 100%;
  .my-swipe .van-swipe-item {
    height: 212px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
  }
  .lc_gap {
    background-color: white;
    border-radius: 15px;
    position: relative;
    top: -35px;
    .gap1 {
      height: 13px;
    }
    [class*="van-hairline"]::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: none;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    .custom_box {
      display: flex;
      margin: 0 10px;
      .bg1 {
        background-color: green;
        flex: 1;
        background: url(/icon/bg_one_pic.png) center center/100% 100%;
        .container {
          padding: 11px;
          .main_title {
            font-weight: bold;
            color: #4b6fc1;
            font-size: 14px;
            padding-left: 5px;
          }
          .oth_container {
            color: #788ab5;
            font-size: 12px;
            padding-top: 8px;
            padding-left: 5px;
          }
        }
      }
      .bg2 {
        background-color: #f8cfcf;
        flex: 1;
        background: url(/icon/bg_two_pic.png) no-repeat center center/100% 100%;
        .container {
          padding: 11px;
          .main_title {
            font-weight: bold;
            color: #8b3335;
            font-size: 14px;
            padding-left: 5px;
          }
          .oth_title {
            color: #b68485;
            font-size: 12px;
            padding-top: 8px;
            padding-left: 5px;
          }
        }
      }
    }
    .main_title {
      font-size: 20px;
      margin: 13px 15px;
      span {
        color: #333333;
      }
    }
    .lc_grid {
      display: flex;
      justify-content: space-around;
      .lc_item1 {
        flex: 45%;
        margin: 0 8px;

        .lc_content {
          position: relative;
          display: flex;
          margin-bottom: 9.5px;
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 120px;
            height: 44px;
            background-color: #fae8da;
            border-radius: 0px 0px 4px 4px;
            font-size: 14px;
            color: #ac533e;
            margin-left: 24.5px;
          }
        }
        .lc_content2 {
          position: relative;
          margin-top: 9.5px;
          color: #333333;
          font-size: 14px;
          text-align: center;

          // background: url(/icon/card_lc.png);
          // background: url(/icon/card_bg_pic.png);
          //設置背景圖片
          .lc_mix {
            margin-top: 9.5px;
          }
          .lc_price {
            margin-top: 9.5px;
          }
          .lc_cute {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 10px;
            left: 50%;
            right: 50%;
            background-color: #f12945;
            color: #ffffff;
            margin-top: 9.5px;
            width: 120px;
            height: 30px;
            box-sizing: border-box;
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
            border: solid 0.5px #ffffff;
            font-size: 20px;
            transform: translate(-50%, -50%);
            .word {
              font-size: 16px;
            }
            .money {
              font-size: 20px;
            }
            .left {
              margin-left: 5px;
              width: 15px;
              height: 15px;
              line-height: 30px;
            }
          }
        }
      }

      .van-grid {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        justify-content: center;
      }
      .van-grid-item {
        position: relative;
        box-sizing: border-box;
        // border-radius: 10px;
        // border: solid 1px #f9e3c5;

        background-image: url(/icon/card_bg_pic.png);
        background-size: cover;
        height: 134px;
        margin-bottom: 10px;
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
        padding: 0.42667rem 0.21333rem;
        background-color: #ffffff;
      }
    }
  }
}

::v-deep .van-swipe__indicators {
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
  // overflow: hidden;
}
// .my-swipe {
//   height: 212px;
// }

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