<template>
  <div id="modify">
    <van-nav-bar title="" cross>
      <template #left>
        <van-icon class="cross" name="cross" size="18" @click="back" />
      </template>
    </van-nav-bar>

    <div id="list_m">
       <article class="title-container">
        <h3 class="title">賬號登錄</h3>

      </article>
      <article style="margin-top:-10px;color:#999999">
             <span>用員工號碼和密碼進行登錄</span>
      </article>
      <article style="height: 54px">
        <nav>舊密碼</nav>

        <nav>
          <input
            type="text"
            placeholder="請輸入舊密碼"
            style="border: 0; width: 117px"
          />
        </nav>
      </article>
      <article style="height: 54px">
        <nav>新密碼</nav>

        <nav>
          <input
            type="text"
            placeholder="請輸入新密碼"
            style="border: 0; width: 117px"
          />
        </nav>
      </article>
      <article style="height: 54px">
        <nav>確認密碼</nav>

        <nav>
          <input
            type="text"
            placeholder="請再次輸入密碼"
            style="border: 0; width: 117px"
          />
        </nav>
      </article>

      <van-button type="danger">保存</van-button>
    </div>
  </div>
</template>



<script>
import { Toast } from "vant";

export default {
  methods: {
    back() {
         this.$router.push('/Mine')
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.modify{
    background-color: #fff;
}
#list_m article {
  align-items: center;
  margin: 0 16px;
  padding-right: 50px;
  display: flex;
}
#list_m .van-button {
  background-color: rgba(247, 208, 208);
  margin: 20px auto;
  width: 343px;
  display: flex;
  justify-content: space-around;
  border: 0;
}
article nav:nth-child(1){
    flex: 1;
}
article nav:nth-child(2){
    flex: 1;
}
.van-icon-cross {
    font-size: 20px !important;
    color: black;
}
</style>
