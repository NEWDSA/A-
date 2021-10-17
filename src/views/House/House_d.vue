<template>
  <div id="house_d">
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

    <div style="display: flex; justify-content: space-between">
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

    <div class="content">
      <span> 泉裕豪庭 5A</span>

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

      <div style="margin: 47px 0 17px; font-weight: 700">房源跟進</div>
      <div class="genjin" v-for="(item, index) in 3" :key="index">
        <img @click="collect_i" src="/icon/single_selected_icon.png" alt="" />
        <span id="span_i">有客睇打比業主,upate就唔煩佢</span>

        <div>
          <article>MB Jane Wong</article>
          <article>洗盤</article>
          <article>2021-05-06 18:54</article>
        </div>
      </div>
    </div>

    <div class="tel">
      <article>
        <img src="/icon/photo_defual_pic.png" style="width: 49px" alt="" />
      </article>
      <div>
        <p>Jane Wong</p>
        <p style="color: #666666">MB</p>
      </div>
      <div>
        <van-button type="primary" size="small" color="#f12945"
          >新增跟進</van-button
        >
      </div>
      <div>
        <van-button type="info" size="small" color="#54bd46" @click="call"
          >撥打電話</van-button
        >
      </div>
    </div>

    <van-popup v-model="show">
      <div id="popup">
        <h4>撥打電話</h4>
        <span>蔡小姐(業主)</span>
        <article>
          <div>
            <img
              style="width: 12px; margin-right: 1px"
              src="/icon/tel_red_icon.png"
              alt=""
            />
            手機正常撥
          </div>
          <div>
            <img
              style="width: 12px; margin-right: 1px"
              src="/icon/tel_blue_icon.png"
              alt=""
            />
            手機加撥0
          </div>
        </article>

        <article>
          <div>
            <img
              style="width: 12px; margin-right: 3px"
              src="/icon/tel_red_icon.png"
              alt=""
            />
            座機正常撥
          </div>
          <div>
            <img
              style="width: 12px; margin-right: 3px"
              src="/icon/tel_blue_icon.png"
              alt=""
            />座機加撥0
          </div>
        </article>

        <span style="margin-top：30px;display:block">洪先生(租客)</span>
        <article>
          <div>
            <img
              style="width: 12px; margin-right: 3px"
              src="/icon/tel_red_icon.png"
              alt=""
            />座機正常撥
          </div>
          <div>
            <img
              style="width: 12px; margin-right: 3px"
              src="/icon/tel_blue_icon.png"
              alt=""
            />座機加撥0
          </div>
        </article>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Popover } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
import { Toast } from "vant";
Vue.use(Popover);
Vue.use(Toast);
export default {
  mounted: function () {
    document.getElementById('house_d').onclick=function(){
      console.log('是速度急速放大');

      this.showPopover = !this.showPopover;
      console.log(this.showPopover)
    }
    // document.onclick=function(){
    //   this.showPopover = !this.showPopover;
    // }
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
      bool_collect: true,
      bool_good: true,
      current: 0,
      list: [],
      loading: false,
      finished: false,
    };
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
    call() {
      this.show = true;
    },
    more_i() {
        this.showPopover = !this.showPopover;
      // if(this.showPopover=false){
      //      this.showPopover = true;
      // }else {
      //      this.showPopover = false;
      // }
     
    },
    onSelect(action) {
      Toast(action.text);
    },
  },
};
</script>


<style  lang="scss" scoped>
// .van-popover[data-popper-placement=right-end] .van-popover__arrow {
//     left: 127px;
// }
#house_d {
  background-color: #fff;
}
.van-popover__action-text {
  display: block;
  /* display: -webkit-box; */
  /* display: -webkit-flex; */
  /* display: flex; */
  /* -webkit-box-flex: 1; */
  margin-left: 10px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-box-align: center;
  -webkit-align-items: center;
  line-height: 40px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 100%;
}
#house_d .van-popup {
  border-radius: 15px;
}
#house_d .van-popup h4 {
  text-align: center;
}
#house_d .van-popup #popup {
  width: 290px;
  height: 283px;
}
#house_d .van-popup #popup article {
  margin-top: 18px;
  display: flex;
  justify-content: space-around;
}
#house_d .van-popup #popup article div:nth-child(1) {
  background-color: #fdf1f2;
  font-size: 14px;
  color: #ed0c19;
}

#house_d .van-popup #popup article div:nth-child(2) {
  background-color: #ecf8fd;
  font-size: 14px;
  color: #1e9cd0;
}

#house_d .van-popup #popup span {
  margin: 20px;
}
.van-popover__action {
  padding: 0;
}
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
.genjin {
  // background-color: blanchedalmond;
  height: 77px;

  #span_i {
    font-size: 14px;
  }

  img {
    position: relative;
    top: 5px;
    margin-top: 2px;
    width: 20px;
    height: 20px;
  }

  div {
    justify-content: space-around;
    display: flex;
    margin-top: 20px;
  }
  article {
    font-size: 9px;
    color: #9c9fa1;
  }
}
.swipe_i {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  z-index: 88;
  background-color: red;
}

.content {
  height: 550px;
  width: 90%;
  margin: auto;
  // background-color: olivedrab;
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
.my-swipe .van-swipe-item {
  height: 200px;
  color: #fff;
  font-size: 20px;
  line-height: 200px;
  text-align: center;
  // background-color: #39a9ed;

  img {
    width: 100%;
  }
}
</style>