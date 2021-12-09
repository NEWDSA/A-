<template>
  <div class="house_d">
    <div class="fixed">
      <img src="/icon/float_follow-up_icon.png" alt="" />
    </div>
    <van-nav-bar title="客戶詳情" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-button
          plain
          type="info"
          size="mini"
          style="border: 0; color: red; font-size: 13px"
          >編輯</van-button
        >
      </template>
    </van-nav-bar>
    <div id="cust">
      <nav>
        <div>
          <img src="/icon/nonmember_woman_picture.png" alt="" />

          <div>
            <button>蔡女士</button>
          </div>
          <div>
            <span style="color: #de4135; display: inline-block; width: 32px"
              >有效</span
            >JY006277
          </div>
        </div>

        <div>
          <div>
            <span class="phone">手機：</span>
            <span style="background: #f12945; color: white"
              ><img src="/icon/mobile_icon.png" alt="" /> 86-13825688211</span
            >
          </div>

          <div>
            <span class="tel">座機：</span>
            <span style="background: #f12945; color: white"
              ><img src="/icon/landline_icon.png" alt="" /> 853-63936390</span
            >
          </div>
          <div>
            <span>QQ：</span>
            <span> 1404557686</span>
          </div>
          <div>
            <span> 微信：</span>
            <span>1404557686</span>
          </div>
          <div>
            <span> 生日： </span>
            <span>07.28</span>
          </div>
        </div>
      </nav>

      <div class="command"><span></span> 客户需求</div>

      <article>
        <div v-for="(item, index) in list_com" :key="index">
          {{ item.title }}：<span>{{ item.value }}</span>
        </div>
      </article>

      <div class="command"><span></span> 跟進記錄</div>

      <aside>
        <div>跟進內容</div>
        <div>業務員</div>
        <div>跟進時間</div>
      </aside>

      <footer v-for="(item, index) in 6" :key="index">
        <div>人暫時不在珠海，繼續跟進</div>
        <div style="color: #de4135">曾德明</div>
        <div>2021-07-24</div>
      </footer>

      <div style="height: 50px"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list_com: [
        {
          title: "交易類型",
          value: "求租",
        },
        {
          title: "心裡租價",
          value: "3,000-8,000元",
        },
        {
          title: "面積",
          value: "100-120m³",
        },
        {
          title: "朝向",
          value: "南",
        },
        {
          title: "樓層",
          value: "6層以下",
        },
        {
          title: "裝修情況",
          value: "簡裝",
        },
        {
          title: "投資",
          value: "6層以下",
        },
        {
          title: "來源",
          value: "老客戶-客轉介紹",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      console.log(1);
      this.$router.go(-1);
    },
  },
};
</script>


<style scoped lang="scss">
.house_d {
  background-color: #fff;
}
.fixed img:nth-child(1) {
  right: 25px;
  position: fixed;
  width: 60px;
  bottom: 250px;
}
.fixed img:nth-child(2) {
  right: 22px;
  position: fixed;
  width: 60px;
  bottom: 198px;
}
.fixed img:nth-child(3) {
  bottom: 185px;
  right: 0;
  position: fixed;
  width: 60px;
}

#cust {
  width: 343px;
  line-height: 15px;
  margin: auto;
  background-color: #fff;

  .command {
    margin: 39px 0 20px 0;
    font-size: 16px;
  }

  .command span {
    margin-right: 5px;
    float: left;
    display: block;
    width: 4px;
    height: 15px;
    background-color: #de4135;
  }
}
nav {
  display: flex;
  margin: 16px auto;
  height: 161px;
  align-items: center;
  text-align: center;

  div img {
    width: 65px;
  }
  button {
    border-radius: 8px;
    width: 48px;
    height: 18px;
    font-size: 9px;
    color: #de4135;
    position: relative;
    top: -20px;
    border: 0;
    background-color: #fff;
    box-shadow: 0px 0px 3px 1px rgba(110, 26, 26, 0.28);
  }

  div:nth-child(1) {
    flex: 1;
  }
  div:nth-child(2) {
    flex: 1.5;

    div {
      display: flex;
      justify-content: flex-start;
      font-size: 15px;
      padding: 9px;
      align-items: center;
      img {
        width: 14px;
      }

      span:nth-child(1) {
        // color: #666666;
        display: inline-block;
        flex: 1;
        text-align: left;
      }

      span:nth-child(2) {
        color: black;
        text-align: left;
        display: inline-block;
        flex: 3;
        padding: 3px;
      }
    }
  }
}

article {
  flex-wrap: wrap;
  margin: 16px auto;

  div {
    font-size: 14px;
    color: #999999;
    padding: 10px;
  }

  span {
    color: black;
  }
}

aside {
  background-color: #f0eeee;
  justify-content: space-around;
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 16px auto;

  nav {
    display: flex;

    div {
      flex: 1;
    }
  }
}

footer {
  justify-content: space-around;
  display: flex;
  height: 42px;

  div {
    max-width: 130px;
    justify-content: center;
    display: flex;
    flex: 1;
  }
}
.van-icon {
  color: black !important;
}
</style>