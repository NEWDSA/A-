<template>
  <div class="container">
    <!-- navbar 導航 -->
    <van-nav-bar class="lc_bar" title="新增跟進" right-text="提交" left-arrow>
    </van-nav-bar>
    <!-- end navbar 導航 -->
    <div class="lc_items">
      <span class="lc_title_">跟進類型</span>
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        class="lc_radio_group"
      >
        <van-radio name="1" icon-size="14px" checked-color="#ee0a24"
          >单选框 1</van-radio
        >
        <van-radio name="2" icon-size="14px">单选框 2</van-radio>
      </van-radio-group>
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title">更改房源狀態</span
      ><span class="lc_title">已售</span>
      <van-icon name="arrow" class="lc_arrow" />
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title">行家狀態</span>
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        class="lc_radio_group"
      >
        <van-radio name="1" icon-size="14px" checked-color="#ee0a24"
          >单选框 1</van-radio
        >
        <van-radio name="2" icon-size="14px">单选框 2</van-radio>
      </van-radio-group>
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title">資料來源</span>
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        class="lc_radio_group"
      >
        <van-radio name="1" icon-size="14px" checked-color="#ee0a24"
          >单选框 1</van-radio
        >
        <van-radio name="2" icon-size="14px">单选框 2</van-radio>
      </van-radio-group>
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title">是否連車位</span>
      <van-radio-group
        v-model="radio"
        direction="horizontal"
        class="lc_radio_group"
      >
        <van-radio name="1" icon-size="14px" checked-color="#ee0a24"
          >单选框 1</van-radio
        >
        <van-radio name="2" icon-size="14px">单选框 2</van-radio>
      </van-radio-group>
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title_p">成交價</span>
      <van-field type="text" placeholder="請選擇"></van-field>
      <span class="unit">元</span>
    </div>
    <div class="lc_items">
      <span class="lc_star">*</span>
      <span class="lc_title_f">成交時間</span>
      <van-field type="text" placeholder="請選擇"></van-field>
      <van-icon name="arrow" />
    </div>
    <div class="lc_items" style="display: flex">
      <div style="flex: 30%; white-space: nowrap">
        <span class="lc_star">*</span>
        <span class="lc_title">跟進內容</span>
      </div>
      <div style="flex: 70%; font-size: 14px; height: auto; line-height: 30px">
        <div style="flex: 70%">
          <span class="lc_block" style="flex: 20%; margin: 10px">無人接觸</span>
          <span class="lc_block" style="flex: 20%; margin: 10px"
            >非業主電話</span
          >
          <span class="lc_block" style="flex: 20%; margin: 10px">號碼無效</span>
          <span class="lc_block" style="flex: 20%; margin: 10px">不租不售</span>
          <span class="lc_block" style="flex: 20%; margin: 10px">業主不在</span>
          <van-field
            style="flex: 20%; margin: 10px"
            type="text"
            placeholder="請輸入"
          ></van-field>
        </div>
      </div>
    </div>
    <!-- <div class="make-copy select-person">
      <h3 class="title vuex-1px-t">提醒Ta</h3>
      <flexbox class="select-images-list" wrap="wrap" align="flex-start">
        <flexbox-item v-for="(item, index) in NoticeList" :key="index">
          <i class="remove-icon" v-if="item.removeSwitch !== false" @click="removeNotice(item)"></i>
          <div class="img-box">
            <img style="width: 40px; height: 40px" :src="item.icon" />
          </div>
          <p class="name">{{ item.Name }}</p>
        </flexbox-item>
        <flexbox-item class="select-img" @click.native="selectPerson" ></flexbox-item>
      </flexbox>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      NoticeList: [
        {
          Name: "Lucinao",
          Department: "IT",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Lily",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
      ], //   提醒人
      //   新增提醒人
      AddNoticeList: [
        {
          Name: "Lucinao",
          Department: "IT",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Lily",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
        {
          Name: "Ken Lo",
          Department: "MTK",
          icon: "https://img2.baidu.com/it/u=3279938379,2065999068&fm=26&fmt=auto",
        },
      ],
      // end 新增提醒人
    };
  },
  methods: {
    //移除提醒人
    removeNotice(item) {
      console.log("移除內容");
      console.log(item);
      let lc_items = item;
      this.NoticeList.splice(
        this.NoticeList.findIndex((item) => item === lc_items),
        1
      );
    },
    // end 移除提醒人
    // 添加提醒人
    selectPerson(){
      this.$router.push('SelectPerson');
      console.log('gggg')
    }
    // end 添加提醒人
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // 設置 arrow 樣式
  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
  //   end 設置 arrow樣式
  .lc_bar {
    ::v-deep .van-nav-bar__text {
      color: #f12945;
      font-size: 16px;
    }
  }
  .lc_items {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    box-shadow: 0px 1px 0px 0px #e2e2e2;
    color: #333333;
    overflow-x: hidden;
    .lc_star {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 20px;
      top: 15px;
      color: #d91b22;
    }
    .lc_title_ {
      font-size: 14px;
      line-height: 50px;
      height: 50px;
      flex: 1;
      padding-left: 30px;
    }
    .lc_title {
      font-size: 14px;
      line-height: 50px;
      height: 50px;
      flex: 1;
      padding-left: 30px;
      .lc_header {
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }
    .lc_title_f {
      font-size: 14px;
      line-height: 50px;
      height: 50px;
      margin-left: 30px;
      white-space: nowrap;
    }
    .lc_title_p {
      font-size: 14px;
      line-height: 50px;
      height: 50px;
      padding-left: 30px;
      width: 110px;
      white-space: nowrap;
    }
    .lc_radio_group {
      ::v-deep .van-radio__label {
        margin-left: 8px;
        color: #323233;
        line-height: 20px;
        font-size: 14px;
      }
    }
    .lc_arrow {
      .van-icon {
        position: relative;
        display: inline-block;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        line-height: 50px;
      }
    }
    .lc_block {
      background-color: #f1f1f1;
      border-radius: 2px;
      font-size: 12px;
      padding: 5px;
      color: #666666;
      font-size: 12px;
    }
    .unit {
      height: 50px;
      font-size: 14px;
      line-height: 50px;
      padding-right: 10px;
    }

    ::v-deep .van-cell {
      background-color: transparent;
    }
    ::v-deep .van-icon {
      line-height: 50px;
    }
  }

  .select-images-list {
    // flex-wrap: wrap;
    margin-left: -0.8rem;
    // align-items: start;
    padding-bottom: 0.5rem;
    // box-align: start;
    .vux-flexbox-item {
      flex: 0 0 2.475rem;
      margin-bottom: 0.5rem;
      margin-left: 0.8rem !important;
      position: relative;
      img {
        display: block;
        // width: getRem(96);
        height: 2.5rem;
        width: 100%;
      }
    }
    .img-box {
      width: 100%;
      height: 2.475rem;
      border: 0.5px solid #ccc;
      border-radius: 0.25rem;
      overflow: hidden;
    }
    .remove-icon {
      display: block;
      width: 0.9rem;
      height: 0.9rem;
      position: absolute;
      right: -0.55rem;
      top: -0.45rem;
      background: url("/icon/remove-icon.png") no-repeat center center;
      background-size: 0.9rem 0.9rem;
    }
    .name {
      margin-top: 0.25rem;
      line-height: 0.7rem;
      font-size: 0.6rem;
      color: #ccc;
      text-align: center;
    }
    .select-img {
      border: 0;
      flex: 0 0 2.5rem;
      height: 2.5rem;
      background-size: 2.5rem 2.5rem !important;
      input[type="file"] {
        opacity: 0;
        display: block;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }

  .select-images-list {
    .select-img {
      background: url("/icon/select-img.png") no-repeat;
    }
  }

  .select-person {
    background: #fff;
    padding-left: 15px;
    &:before {
      border-color: #e6e6e6;
    }
    .title {
      font-size: 14px;
      line-height: 1;
      padding: 0.8rem 0;
    }
  }
}
</style>