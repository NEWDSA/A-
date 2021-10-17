<template>
  <div id="cus">
    <div class="fixed">
      <img src="/icon/new-customers_icon.png" alt="" />
      <img src="/icon/poll_float_icon.png" alt="" />
      <img src="/icon/look_icon.png" alt="" />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        margin: auto;
        width: 95%;
        justify-content: end;
      "
    >
      <div style="height: auto; flex: 8">
        <van-search
          class="search"
          style="width: 100%"
          placeholder="輸入姓名／手機/目標樓盤"
        />
      </div>
      <div style="flex: 1">
        <img src="/icon/screen_icon.png" alt="" style="width: 20px" />
      </div>
    </div>

    <article style="margin-top: 18px">
      <section>
        <div>30天租房到期</div>
        <div>渠道來電客</div>
        <div>轉介客</div>
        <div>滿二年</div>
        <div>唯一</div>
      </section>
    </article>

    <nav v-for="(item, index) in 13" @click="tap(index)" :key="index">
      <div class="fx">
        <div class="avater">
          <img src="/icon/man_vip_pictur.png" alt="" />
          <button>有效</button>
        </div>

        <div class="daikan">
          <span>2</span>
          <div>帶看</div>
        </div>

        <div class="chengjiao">
          <span>0</span>
          <div>成交</div>
        </div>
      </div>

      <div class="fx">
        <aside>
          <div style="font-weight: 700">洪先生</div>
          <van-button type="primary" class="btn_f" size="mini">
            求購</van-button
          >
          <van-button type="primary" class="btn_s" size="mini">
            三居</van-button
          >
        </aside>

        <aside>
          <div>求購價：</div>
          <div>100-300萬</div>
        </aside>

        <aside>
          <div>所屬人：</div>
          <div>庄耀璟 Ken Chong HM5</div>
        </aside>

        <aside>
          <div>最後跟進：</div>
          <div>2021-08-20</div>
        </aside>

        <aside>
          <div>意向泰和中央，想投160萬左右</div>
        </aside>
      </div>
    </nav>

    <div style="height: 50px"></div>
  </div>
</template>



<script>
import { Toast } from "vant";

export default {
  methods: {
    back() {
      this.$router.push("/Mine");
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    tap(index) {
       this.$router.push('/Custom_d')
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.fixed img:nth-child(1) {
  
  right: 0;
  position: fixed;
  width: 60px;  bottom: 250px;
}
.fixed img:nth-child(2) {
  bottom: 120px;
  right: 0;
  position: fixed;
  width: 60px;
}
.fixed img:nth-child(3) {

    bottom: 185px;
  right: 0;
  position: fixed;
  width: 60px;
}
.van-icon-search::before {
  content: "\F0AF";
  color: #ccc !important;
}
#cus {
  background-color: #fff;
}
.avater {
  img {
    width: 65px;
  }
  button {
    border-radius: 8px;
    width: 42px;
    height: 18px;
    font-size: 9px;
    position: relative;
    top: -20px;
    border: 0;
    background-color: #fff;
    box-shadow: 0px 0px 3px 1px rgba(110, 26, 26, 0.28);
  }
}
article {
  width: 343px;
  margin: auto;
  section {
    width: 263px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    div {
      margin: 2px 0 2px 5px;
      padding: 8px;
      background-color: #fdf1db;
      font-size: 14px;
    }
  }
}
nav {
  margin: 18px auto;
  width: 343px;
  padding: 9px;
  border-radius: 5px;
  display: flex;
  box-shadow: 0px 0px 12px 0.5px rgba(110, 26, 26, 0.18);

  .daikan {
    padding: 15px;
  }

  span {
    color: #de4135;
    font-weight: 700;
  }

  .fx:nth-child(1) {
    text-align: center;
    flex: 1;
  }

  .fx:nth-child(2) {
    flex: 3.5;
  }
  .fx aside:nth-child(2) {
    font-size: 15px;
    color: #f12945;
    font-weight: 700;
  }
  .fx aside:nth-child(3) div:nth-child(1) {
    color: #999;
  }
  .fx aside:nth-child(4) div:nth-child(1) {
    color: #999;
  }

  .fx aside {
    align-items: center;
    padding: 8px;
    display: flex;

    .btn_f {
      width: 46px;
      background-color: #f12945;
      margin: 0 5px;
      border: 0;
      span {
        color: #fff !important;
      }
    }

    .btn_s {
      width: 46px;
      background-color: #fff;
      border: solid 1px #313e60;
      margin: 0 5px;
      span {
        color: #333 !important;
      }
    }
  }

  .fx aside:last-child {
    padding-top: 22px;
  }
}

.van-search {
  height: 46px;
}
</style>
