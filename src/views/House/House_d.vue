<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div class="navs">
      <img @click="back" src="/icon/nav_back_transparent_icon.png" alt="" />

      <img @click="more_i" src="/icon/nav_more_transparent_icon.png" alt="" />

      <img
        v-if="bool_good"
        @click="good_i"
        src="/icon/nav_good_transparent_icon.png"
        alt=""
      />
      <img
        v-else
        @click="good_i"
        src="/icon/nav_good_collected_icon.png"
        alt=""
      />

      <img
        v-if="bool_collect"
        @click="collect_i"
        src="/icon/nav_collect_transparent_icon.png"
        alt=""
      />
      <img
        v-else
        @click="collect_i"
        src="/icon/nav_collected_transparent_icon.png"
        alt=""
      />

      <div
        v-if="showPopover"
        class="van-popup van-popover van-popover--light"
        data-popper-placement="left-start"
        style="
          position: absolute;
          left: 215px;
          top: 50px;
          margin: 0px;
          z-index: 2001;
        "
      >
        <div class="van-popover__arrow"></div>
        <div role="menu" class="van-popover__content">
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增現場相/查冊
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增放盤紙
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增鑰匙
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              編輯房源
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              中原成交
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              發佈房源
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end 顶部导航 -->
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item>
        <img
          src="http://mo.centanet.com/CentalineMacauImage/JobImg/054620_f9006edb-e6f9-497e-8813-94619288c09e.jpg?w=1120&watermark=smallgroup_center"
          alt=""
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="http://mo.centanet.com/CentalineMacauImage/JobImg/015807_28afb281-e5f2-4ee9-900b-69eac786ad41.jpg?w=1120&watermark=smallgroup_center"
          alt=""
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="http://mo.centanet.com/CentalineMacauImage/JobImg/054620_f9006edb-e6f9-497e-8813-94619288c09e.jpg?w=1120&watermark=smallgroup_center"
          alt=""
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="http://mo.centanet.com/CentalineMacauImage/JobImg/015807_28afb281-e5f2-4ee9-900b-69eac786ad41.jpg?w=1120&watermark=smallgroup_center"
          alt=""
        />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <!-- end 轮播图 -->

    <!-- 房源標籤 -->
    <div class="house_tag">
      <div style="margin: 10px 0px 10px 20px">
        <van-button
          type="default"
          size="small"
          style="
            width: 30px;
            height: 25px;
            background-color: #f1f1f1;
            margin: 1px;
            color: #b77af0;
          "
          >業</van-button
        >
        <van-button
          type="default"
          size="small"
          style="
            width: 30px;
            height: 25px;
            background-color: #f1f1f1;
            margin: 1px;
            color: #b77af0;
          "
          >匙</van-button
        >
        <van-button
          type="default"
          size="small"
          style="
            width: 30px;
            height: 25px;
            background-color: #f1f1f1;
            margin: 1px;
            color: #b77af0;
          "
          >獨</van-button
        >
      </div>

      <div></div>
    </div>
    <!-- end 房源標籤 -->
    <div class="content">
      <span>泉裕豪庭 5A</span>
      <div class="price">
        <div>1,288 萬</div>
        <div>17,500 元/月</div>
        <div>4-2-3-2</div>
      </div>

      <div class="price">
        <nav>售價</nav>
        <nav>租價</nav>
        <nav>房型</nav>
      </div>

      <div class="price">
        <article style="flex: 1">朝向：<span>東北</span></article>
        <!-- <article style="flex:0.9"></article> -->
        <article style="flex: 1">建築面積：<span>1,979 呎</span></article>
      </div>

      <div class="price">
        <aside>裝修情況：<span>地下車位</span></aside>
        <aside>房屋形狀：<span>暫無</span></aside>
      </div>

      <div class="btn">
        <button class="btn1" style="color: #2c81e1">
          <img
            style="left: 12px; position: absolute; height: 14px; top: 8px"
            src="/icon/photo_icon.png"
            alt=""
          />
          <div>現場相</div>
        </button>

        <button class="btn2" style="color: #f86442">
          <img
            style="left: 18px; position: absolute; height: 14px; top: 8px"
            src="/icon/paper_icon.png"
            alt=""
          />
          <div>放盤紙</div>
        </button>
        <button class="btn3" style="color: #f3a616">
          <img
            style="left: 20px; position: absolute; height: 14px; top: 8px"
            src="/icon/key_icon.png"
            alt=""
          />
          <div>鑰匙</div>
        </button>
      </div>
  
      <!-- 房源跟进 -->
      <div class="nav_follow">
        <span>房源跟进</span><van-icon name="arrow" @click="full_Follow" />
      </div>
      <van-steps
        direction="vertical"
        active-color="#646566"
        inactive-color="#646566"
      >
        <van-step
          v-for="(item, index) in FollowUp"
          :key="index"
          class="lc_step"
        >
          <template #active-icon>
            <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <template #inactive-icon>
            <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <span class="lc_main_title">{{ item.FollowContent }}</span>

          <div class="sub_title">
            <article>{{ item.Follower }}</article>
            <article>{{ item.FollowType }}</article>
            <article>{{ item.FollowTime }}</article>
          </div>
        </van-step>
      </van-steps>
      <!-- end 房源跟进 -->
    </div>
    <!-- 聯繫人 -->
    <div class="lc_contact">
      <div class="tel">
        <article>
          <img src="/icon/photo_defual_pic.png" style="width: 49px" alt="" />
        </article>
        <div>
          <p>Jane Wong</p>
          <p style="color: #666666">MB</p>
        </div>

        <van-button
          type="primary"
          size="small"
          color="#f12945"
          @click="addFollow"
          >新增跟進</van-button
        >
        <van-button type="info" size="small" color="#54bd46" @click="call"
          >撥打電話</van-button
        >
      </div>
    </div>
    <!-- end 聯繫人 -->
    <van-dialog
      id="lc_dialog"
      v-model="show"
      :show-confirm-button="false"
      closeOnClickOverlay
    >
      <template #title>
        <span class="call_title">撥打電話</span>
      </template>
      <div class="dialog_content">
        <div class="lc_title">蔡小姐（業主）</div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
        <div class="lc_title">洪先生（租客）</div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Popover } from "vant";
import { Popup } from "vant";
import aplush from "@/api/A+"; // 獲取樓詳情
Vue.use(Popup);
import { Toast } from "vant";
Vue.use(Popover);
Vue.use(Toast);
export default {
  mounted() {
    let keyId = this.$route.query.KeyId;
    // 房源详情接口
    aplush.apis.ListingDetail(keyId).then((res) => {
      this.House_detail = res;
    });
    // end 房源详情接口
    // 房源跟进接口
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "0EEF0532-7AAD-4B52-8BCB-AB1B67987AAF",
      IsDetails: "true",
      PropertyKeyId: keyId,
    };
    aplush.apis.ListiongFollow(params).then((res) => {
      console.log("ddd");
      console.log(res);
      this.FollowUp = res.PropFollows;
    });
    // end 房源跟进接口
  },
  data() {
    return {
      show: false,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "新增現場相/查冊" },
        { text: "新增放盤紙" },
        { text: "新增鑰匙" },
        { text: "編輯房源" },
        { text: "中原成交" },
        { text: "發佈房源" },
      ],
      //
      bool_collect: true,
      bool_good: true,
      current: 0,
      list: [],
      loading: false,
      finished: false,
      House_detail: {},
      FollowUp: [], //房源跟进
      pageIndex: 1, //起始页
      pageSize: 3, //显示页数
    };
  },
  filters: {
    formatt: function (value) {},
  },
  methods: {
    back() {
      this.$router.push("/House");
    },
    onChange(index) {
      this.current = index;
    },
    collect_i() {
      this.bool_collect = !this.bool_collect;
      console.log("as");
    },
    good_i() {
      this.bool_good = !this.bool_good;
      console.log("as");
    },
    // 撥打電話
    call() {
      this.show = true;
    },
    // end 撥打電話
    more_i() {
      this.showPopover = !this.showPopover;
    },
    onSelect(action) {
      Toast(action.text);
    },
    // 新增跟進
    addFollow() {
      this.$router.push("AddFollow");
    },
    // end 新增跟進
    // 跟进详情
    FollowDetail(index) {},
    // end 跟进详情
    // 房源跟进
    full_Follow() {
      let lc_keyId = this.$route.query.KeyId;
      this.$router.push({ path: "/MoreFollow", query: { KeyId: lc_keyId } });
    },
    //  end 房源跟进
  },
};
</script>


<style  lang="scss" scoped>
.container {
  background-color: #fff;
  .navs {
    width: 100%;
    top: 0;
    z-index: 200;
    position: absolute;

    img:nth-child(1) {
      width: 31px;
      height: 31px;
      margin: 10px 0 0 16px;
      float: left;
    }

    img:nth-child(2) {
      width: 31px;
      height: 31px;
      margin: 10px 8px 0 5px;
      float: right;
    }
    img:nth-child(3) {
      width: 31px;
      height: 31px;
      margin: 10px 2px 0 5px;
      float: right;
    }

    img:nth-child(4) {
      width: 31px;
      height: 31px;
      margin: 10px 2px 0 5px;
      float: right;
    }
  }

  .my-swipe {
    .van-swipe-item {
      height: 200px;
      color: #fff;
      font-size: 20px;
      line-height: 200px;
      text-align: center;
      img {
        width: 100%;
      }
    }
    .custom-indicator {
      text-align: center;
      width: 52px;
      border-radius: 13px;
      height: 26px;
      line-height: 26px;
      color: #fff;
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .house_tag {
    display: flex;
    justify-content: space-between;
  }
  .content {
    height: 100%;
    width: 90%;
    margin: auto;
    // span {
    //   font-size: 16px;
    // }

    .btn {
      justify-content: space-around;
      display: flex;
      margin-top: 20px;
      height: 34px;
    }
    .btn1,
    .btn2,
    .btn3 {
      position: relative;
    }
    .btn button {
      font-size: 13px;
      width: 105px;
      border-radius: 20px;
      border: 0;
    }
    .btn button img {
      flex: 1;
    }
    .btn button div {
      flex: 1;
    }

    .btn button:nth-child(1) {
      background-color: #e0efff;
    }

    .btn button:nth-child(2) {
      background-color: #ffe0db;
    }

    .btn button:nth-child(3) {
      background-color: #feefd2;
    }
    span {
      font-size: 16px;
      font-weight: 700;
    }
    .price {
      justify-items: center;
      display: flex;
      margin-top: 8px;
      div,
      aside,
      article,
      nav {
        flex: 1;
        // background-color: orange;
        text-align: left;
        font-size: 16px;
      }

      div {
        color: #f12945;
        font-weight: 700;
      }
      nav {
        font-size: 12px;
        color: #999999;
      }
      article {
        font-size: 13px;
        color: #999999;
        span {
          font-size: 13px;
          color: black;
          font-weight: 500;
        }
      }

      aside {
        font-size: 14px;
        color: #999999;
        span {
          font-size: 13px;
          color: black;
          font-weight: 500;
        }
      }
    }
  }
  .lc_contact {
    position: relative;
    height: 80px;
    z-index: 333;
    .tel {
      display: flex;
      justify-content: space-around;
      align-items: center;
      bottom: 0px;
      position: fixed;
      width: 100%;
      box-shadow: 10px 10px 10px 10px rgba(130, 119, 119, 0.2);
      background-color: #fff;
      height: 60px;

      div p {
        font-size: 13px;
        color: #333333;
      }
      article {
        width: 49px;
        height: 49px;
        border-radius: 50%;
      }
    }
  }
  .call_title {
    font-size: 18px;
  }

  .dialog_content {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    .lc_title {
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .lc_items {
      display: flex;
      margin-bottom: 10px;
      // justify-content: space-around;
      // align-items: center;
      .lc_normal {
        display: flex;

        width: fit-content;
        justify-content: center;
        align-items: center;
        height: 30px;
        background-color: #fdf1f2;
        flex: 45%;
        margin: 0 10px;
        span {
          font-size: 14px;
          color: #ed0c19;
        }
      }
      .lc_special {
        display: flex;
        width: fit-content;
        height: 30px;
        justify-content: center;
        align-items: center;
        background-color: #ecf8fd;
        flex: 45%;
        margin: 0 10px;
        span {
          font-size: 14px;
          color: #1e9cd0;
        }
      }
    }
  }
}

.nav_follow {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-size: 16px;
  span {
    font-size: 16px !important;
  }
}

.lc_main_title {
  font-size: 14px;
  box-sizing: border-box;
  color: #333333;
  font-size: 16px;
}
.sub_title {
  font-size: 12px;
  color: #9c9fa1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
}
::v-deep .van-step__line {
  background-color: #e5e5e5 !important;
}
</style>