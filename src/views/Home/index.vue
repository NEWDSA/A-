<template>
  <div class="container">
    <van-skeleton title :row="3" :loading="loading">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" indicator-color="#f12945">
        <van-swipe-item v-for="(item, index) in Banner" :key="index">
          <div style="width: 100%; height: 0; padding-bottom: 56.25%">
            <img style="width: 100%; height: 200px" :src="item.url" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </van-skeleton>
    <!-- end 轮播图 -->
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
        <div
          data-v-fae5bece=""
          class="van-grid-item"
          style="flex-basis: 25%"
          @click="more"
        >
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
            <div class="oth_container">
              記錄帶看客戶<img
                src="icon/arrow_one_icon.png"
                class="right_icon"
              />
            </div>
          </div>
        </nav>
        <div style="flex: 0.02"></div>
        <nav class="bg2">
          <div class="container">
            <div class="main_title">錄客戶</div>

            <div class="oth_title">
              新增客戶信息
              <img src="icon/arrow_two_icon.png" class="right_icon" />
            </div>
          </div>
        </nav>
      </div>
      <!-- end 錄帶看 and 錄客戶box -->
      <!-- 房源標題 -->
      <div class="main_title">
        <span>降價房源</span>
      </div>
      <!-- 房、室、廳、衛 -->
      <!-- end 房源標題 -->
      <div data-v-fae5bece="" class="lc_grid van-grid van-hairline--top">
        <template v-for="(item, index) in ReduceHouse">
          <div style="flex-basis: 50%">
            <div data-v-fae5bece="" class="van-grid-item lc_item1">
              <div class="lc_content">
                <div data-v-fae5bece="">
                  {{ item.EstateName }}{{ item.BuildingName }}
                </div>
              </div>
              <div class="lc_content2">
                <div class="lc_mix">
                  {{ item.CountF }}-{{ item.CountT }}- {{ item.CountW }}-{{
                    item.CountY
                  }}

                  |呎
                </div>
                <div class="lc_price">{{ item.SalePrice }}萬</div>
                <div class="lc_cute">
                  <span class="word">降</span
                  ><span class="money">{{ item.ReducePrice }}</span
                  ><span class="word">萬</span>
                  <img class="left" src="icon/right_icon.png" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import aplus from "@/api/A+/index"; //轮播图接口
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
      // 降價房源
      ReduceHouse: [],
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
      Banner: [],
      loading: true,
    };
  },
  mounted() {
    this.getBanner();
    this.getHouse_Down();
  },
  methods: {
    more() {
      this.$router.push("More");
    },
    house() {
      this.$router.push("House?from=home");
    },
    async getBanner() {
      aplus.apis.getBanner().then((res) => {
        this.Banner = res.HomeImgPath;
        this.loading = false;
      });
    },
    // 降價房源
    async getHouse_Down() {
      aplus.apis
        .getPriceDown({
          GetCount: 9,
        })
        .then((res) => {
          this.ReduceHouse = res.Result;
          // this.houseDetail = await res.HouseList;
        });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  // height: 100%;
  .my-swipe .van-swipe-item {
    height: 212px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
  }
  .lc_gap {
    position: relative;
    background-color: white;
    border-radius: 15px;

    height: calc(100vh - 253px);
    overflow-y: scroll;
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
        background: url(/icon/bg_one_pic.png);
        height: 54px;
        background-size: cover;
        display: flex;
        .container {
          padding: 11px;
          height: auto;
          .main_title {
            position: relative;
            font-weight: bold;
            color: #4b6fc1;
            font-size: 14px;
            padding-left: 5px;
            top: -4px;
            margin: 0;
          }
          .oth_container {
            position: relative;
            color: #788ab5;
            font-size: 12px;
            display: flex;
            align-items: center;
            top: -5px;
            padding-left: 5px;
            .right_icon {
              width: 11px;
              height: 7px;
              margin-left: 5px;
            }
          }
        }
      }
      .bg2 {
        background-color: #f8cfcf;
        flex: 1;
        background: url(/icon/bg_two_pic.png);
        height: 54px;
        background-size: cover;
        display: flex;
        .container {
          padding: 11px;
          height: auto;
          .main_title {
            position: relative;
            font-weight: bold;
            color: #8b3335;
            font-size: 14px;
            padding-left: 5px;
            top: -4px;
            margin: 0;
          }
          .oth_title {
            position: relative;
            color: #b68485;
            font-size: 12px;
            top: -5px;
            padding-left: 5px;
            .right_icon {
              width: 11px;
              height: 7px;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .main_title {
      font-size: 20px;
      font-family: PingFangSC-Medium;
      margin: 13px 15px;
      font-weight: bold;
      font-stretch: normal;
      color: #333333;

      span {
        color: #333333;
      }
    }
    .lc_grid {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
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
          color: #333333;
          font-size: 14px;
          text-align: center;
          .lc_mix {
            font-size: 14px;
          }
          .lc_price {
            font-size: 14px;
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
        background-image: url(/icon/card_bg_pic.png);
        // background-size: cover;
        background-size: 100% 100%;
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
  .van-swipe__indicator {
    background-color: #ffffff;
    opacity: 1;
  }
}
body {
  background: #ebeced;
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
.van-grid-item__text {
  position: relative;
  top: -10px;
  font-size: 13px;
  font-weight: bold;
}
::v-deep.van-icon__image {
  width: 60px;
  height: auto;
}

::v-deep .van-swipe__indicator.van-swipe__indicator--active {
  opacity: 1;
  width: 12px !important;
  height: 5px;
  // background-color: #f12945;
  border-radius: 5px;
}
</style>