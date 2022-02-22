<template>
  <div class="msg_details">
    <div style="height: 46px">
      <van-nav-bar
        fixed
        :title="this.$route.query.name"
        left-arrow
        @click-left="back"
      />
    </div>
    <template v-for="(item, index) in msg_details">
      <div class="lc_time" style="text-align: center">{{ item.MsgTime }}</div>
      <div style="display:flex;justify-content:flex-end;">
        <span class="msg_box">{{ item.MsgContent }} </span>
        <van-image round class="message_head" :src="item.SenderPhotoPath" />
      </div>
    </template>
    <div class="lc_footer">
      <van-field
        v-model="msg_content"
        :placeholder="'輸入訊息'"
        :maxlength="200"
        :rows="1"
        :autosize="{ minRows: 1, maxRows: 5 }"
        @keyup.enter="send"
      />
      <van-button @click="send_msg" color="#7232dd">發送</van-button>
    </div>
  </div>
</template>
<script>
import aplush from "@/api/A+";
export default {
  data() {
    return {
      msg_details: [],
      msg_content: "",
    };
  },
  beforeMount() {
    this.getMsgDetails();
  },
  filters: {
    time(time) {
      //獲取今天日期
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let today_date = year + "-" + month + "-" + day;
      return today_date;
    },
  },
  methods: {
    getMsgDetails() {
      //獲取路由參數
      const id = this.$route.query.id;
      console.log(id);
      aplush.apis
        .getMsgDetail({
          MessageKeyId: this.$route.query.id,
        })
        .then((res) => {
          console.log(res);
          this.msg_details = res.Result;
        });
    },
    back() {
      // 路由返
      this.$router.go(-1);
    },
    // 發送消息接口
    send_msg() {
      aplush.apis
        .sendMsg({
          ContactsKeyId: this.msg_details[0].SenderKeyId,  //写反了
          Content: this.msg_content,
        })
        .then((res) => {
          console.log(res);
          this.getMsgDetails();
          this.msg_content='';

        });
    },
  },
};
</script>

<style lang="scss" scoped>
.msg_details {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  .lc_time {
    font-family: PingFangSC-Regular;
    font-size: 11px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 19px;
    letter-spacing: 0px;
    color: #b5b5b5;
    margin-top: 16px;
    margin-bottom: 14px;
  }
  .msg_box {
    position: relative;
    background-color: #98ea70;
    display: inline-block;
    border-radius: 0.1066667rem 0 0.1066667rem 0.1066667rem;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 14px; */
    letter-spacing: 1px;
    max-width: 230px;
    color: #333333;
    padding: 10px; // 伪类
    float: right;
    // margin-right: 80px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-left-color: #98ea70;
      top: 0;
      right: -14px;
    }
    
  }
  .lc_footer {
      position: fixed;
      display: flex;
      align-items: center;
      height: 70px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      border-top: 1px solid #eae5e5;
      padding-bottom: constant(safe-area-inset-bottom);
      /*兼容 IOS<11.2*/
      padding-bottom: env(safe-area-inset-bottom);
      /*兼容 IOS>11.2*/
      ::v-deep .van-button--default {
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  .message_head {
    width: 65px;
    height: 65px;
    margin-left: 10px;
    margin-right: 10px;
  }
  ::v-deep .van-nav-bar__content {
    border-bottom: 1px solid #eae5e5;
  }
  ::v-deep .van-nav-bar__title {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
  }
  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
}
</style>