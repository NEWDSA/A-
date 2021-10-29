<template>
  <div>
    <!-- 搜索區域 -->
    <div class="lc_search" style="display: flex">
      <div class="lc_back" v-if="$route.meta.showTab">
        <van-icon @click="back" name="arrow-left" />
      </div>

      <div class="search_setting">
        <van-search
          class="search"
          style="width: 100%"
          v-model="values"
          placeholder="樓盤名稱 | 棟座單元 | 房號"
          @search="onSearch(values)"
        />
      </div>
    </div>
    <!-- end 搜索區域 -->

    <!-- 下拉框 -->
    <van-dropdown-menu class="lc_str">
      <van-dropdown-item title="區域">
        <van-tree-select
          height="40vw"
          :items="items"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
        </van-tree-select>

        <div class="btn" style="positon: fixed">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button class="btn_confrim" type="danger" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>

      <van-dropdown-item title="價格" ref="item">
        <van-tree-select
          height="70vw"
          :items="item"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button
          >
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button class="btn_confrim" type="danger" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="標簽" ref="item">
        <van-tree-select
          height="110vw"
          :items="item_t"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
          <van-button
            type="danger"
            class="btn_confrim"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button
          >
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button type="danger" class="btn_confrim" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="更多" ref="item">
        <van-tree-select
          height="100vw"
          :items="item_m"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
          <template #content>
            <div class="lc_drop_title">聯繫人類型</div>
            <div style="display: flex; flex-wrap: wrap">
              <span class="lc_box">業主</span>
              <span class="lc_box">中介</span>
              <span class="lc_box">租客</span>
              <span class="lc_box">放盤人</span>
            </div>
            <div class="lc_field">
              <van-field
                v-model="phone"
                label="姓名/手機："
                placeholder="请输入"
                size="mini"
              />
            </div>
            <div style="margin: 5px 5px">
              <van-field
                v-model="phone"
                label="房源編號："
                placeholder="请输入"
                size="mini"
              />
            </div>

            <span>狀態</span>
            <div>
              <span>有效</span>
              <span>暫緩</span>
              <span>已租</span>
              <span>已售</span>
              <span>無效</span>
              <span>資料盤</span>
            </div>
          </template>
          <van-button type="danger" class="btn_confrim" @click="sure"
            >確定</van-button
          >
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button type="danger" class="btn_confrim" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <van-dropdown-item class="lc_rr" title="" ref="item">
        <van-tree-select
          height="100vw"
          :items="item_s"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
          <van-button class="btn_confrim" type="danger" @click="sure"
            >確定</van-button
          >
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button class="btn_confrim" type="danger" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- end 下拉框 -->

    <!-- 搜索歷史區域 -->
    <div style="display: flex; justify-content: space-between">
      <div style="margin-left: 20px">
        <van-button
          type="default"
          size="small"
          style="
            width: 50px;
            height: 30px;
            background-color: rgb(243, 233, 252);
            margin: 1px;
          "
          >租售</van-button
        >
        <van-button
          type="default"
          size="small"
          style="
            width: 50px;
            height: 30px;
            background-color: rgb(243, 233, 252);
            margin: 1px;
          "
          >售</van-button
        >
        <van-button
          type="default"
          size="small"
          style="
            width: 50px;
            height: 30px;
            background-color: rgb(243, 233, 252);
            margin: 1px;
          "
          >租</van-button
        >
      </div>

      <div>
        <van-button
          type="default"
          size="small"
          style="width: 80px; height: 30px; color: blue; border: 0px"
          @click="saveSearch"
          >保存搜索</van-button
        >
      </div>
    </div>
    <!-- end搜索歷史區域 -->

    <van-pull-refresh
      v-model="pullLoading"
      @refresh="onPullRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="沒有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="(item, index) in HouseList"
          :tag="
            item.TrustType == '1' ? '售' : item.TrustType == '2' ? '租' : '租售'
          "
          :key="index"
          :thumb="item.PhotoPath + '?w=1120&watermark=smallgroup_center'"
          @click="detail(item.KeyId)"
        >
          <template #title>
            <van-tag plain type="danger">{{ item.PropertyStatus }}</van-tag>
            <span
              class="build_name"
              style="font-size: 15px; font-weight: 700"
              >{{ item.AllHouseInfo }}</span
            >
            <div style="font-size: 12px; padding: 5px; color: #666666">
              {{ item.Floor }} {{ item.HouseType }}|{{ item.Square }}呎
            </div>
            <!-- 判斷推薦人是否為空  -->
            <template v-if="item.PropertyTags && item.PropertyTags.length > 0">
              <span style="background-color: #f3e9fc; color: #b77af0">
                {{ item.PropertyTags.TagName }}
              </span>
            </template>
            <!-- end 判斷推薦人是否為空 -->
            <span
              style="
                background-color: #f3e9fc;
                margin-left: 5px;
                color: #b77af0;
              "
            >
              連租盤
            </span>
          </template>
          <template #price>
            <!-- Trust 狀態判斷 1售 2租 、3租售  -->
            <!-- 狀態判斷 有效 RentPrice、已售 SalePriceUnit、已租 --  暫緩 SalePriceUnit -->
            <template v-if="item.TrustType == '1'">
              <span>售{{ item.SalePrice }}</span>
            </template>
            <template v-else-if="item.TrustType == '2'">
              <div>租{{ item.RentPrice }}</div>
            </template>
            <template v-else>
              <span>售{{ item.SalePrice }}</span>
              <div>租{{ item.RentPrice }}</div>
            </template>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <div style="height: 50px"></div>
  </div>
</template>


<script>
import { Toast } from "vant";
import aplush from "@/api/A+";
export default {
  created() {
    console.log(this.$route.meta.showTab);
  },
  mounted() {
    aplush.apis
      .Listinglist({
        PageIndex: this.pageIndex,
        PageSize: 20,
        PropType: 1,
        EstateSelectType: 4,
      })
      .then((res) => {
        this.HouseList = res.PropertysModel;
      });
  },
  data() {
    return {
      index_l: 0,
      index_r: 0,
      radio: "1",
      chosenContactId: "1",
      HouseList: [],
      active: 0,
      pageIndex: 1,
      listLoading: false, //上滑列表加載（每一次上滑的時候)
      finishedList: false, //上滑列表加載完了所有數據（沒有更多了)
      pullLoading: false, //下拉刷新加載動畫
      loading: false,
      finished: false,
      refreshing: false,
      item_s: [
        {
          text: "默認",
          children: [],
        },
        {
          text: "售價從高到低",
          children: [],
        },
        {
          text: "售價從低到高",
          children: [],
        },
        {
          text: "租價從高到低",
          children: [],
        },
        {
          text: "租價從低到高",
          children: [],
        },
        {
          text: "面積從大到小",
          children: [],
        },
        {
          text: "面積從小到大",
          children: [],
        },
        {
          text: "樓層從高到低",
          children: [],
        },
        {
          text: "樓層從低到高",
          children: [],
        },
      ],
      item: [
        {
          text: "出售價(萬)",
          children: [
            {
              // 名称
              text: "不限",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
            {
              text: "500萬以下",
              id: 1,
            },
            {
              // 名称
              text: "500-1000萬",
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "1000-2000萬",
              id: 3,
            },
          ],
        },
        {
          text: "出租價(元)",
          children: [
            {
              // 名称
              text: "不限",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
            {
              text: "500萬以下",
              id: 1,
            },
            {
              // 名称
              text: "500-1000萬",
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "1000-2000萬",
              id: 3,
            },
          ],
        },
      ],
      item_t: [
        {
          text: "不限",
          children: [],
        },
        {
          text: "獨家",
          children: [],
        },
        {
          text: "放盤紙",
          children: [],
        },
        {
          text: "鑰匙",
          children: [],
        },
        {
          text: "有圖",
          children: [],
        },
        {
          text: "有360視頻",
          children: [],
        },
        {
          text: "72小時内新增房源",
          children: [],
        },
        {
          text: "30天租約到期房",
          children: [],
        },
        {
          text: "豪宅盤",
          children: [],
        },
      ],
      item_m: [
        {
          text: "聯係人類型",
          children: [],
        },
        {
          text: "狀態",
          children: [],
        },
        {
          text: "房型",
          children: [],
        },
        {
          text: "用途",
          children: [],
        },
        {
          text: "朝向",
          children: [],
        },
        {
          text: "建築面積",
          children: [],
        },
        {
          text: "建築類型",
          children: [],
        },
        {
          text: "樓層",
          children: [],
        },
        {
          text: "樓齡",
          children: [],
        },
      ],
      items: [
        {
          text: "澳門",
          children: [
            {
              // 名称
              text: "黑沙環新填海區",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
            {
              text: "新口岸區",
              id: 1,
            },
            {
              // 名称
              text: "筷子基區",
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "高士德及雅廉訪區",
              id: 3,
            },
            {
              // 名称
              text: "沙梨頭及大三巴區",
              // id，作为匹配选中状态的标识符
              id: 4,
            },
            {
              text: "南西灣及主教山區",
              id: 5,
            },
            {
              text: "林茂塘區",
              id: 6,
            },
            {
              // 名称
              text: "高士德及雅廉訪區",
              // id，作为匹配选中状态的标识符
              id: 7,
            },
            {
              text: "新橋區",
              id: 8,
            },
          ],
        },
        {
          text: "氹仔",
          children: [
            {
              // 名称
              text: "海洋及小潭山區",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
            {
              text: "氹仔中心區",
              id: 1,
            },
            {
              // 名称
              text: "大學及北安灣區",
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "北安及大潭山區",
              id: 3,
            },
            {
              text: "氹仔舊城及馬場區",
              id: 4,
            },
          ],
        },
        {
          text: "路環",
          children: [
            {
              // 名称
              text: "路環",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
          ],
        },
      ],
      activeId: 0,
      value: 0,
      values: "",
      switch1: false,
      switch2: false,
      content_r: "",
      content_l: "",
      option: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
    };
  },
  methods: {
    // search 區域
    onSearch(word) {
      console.log("打印搜索關鍵字");
      console.log(word);

      aplush.apis
        .Listinglist({
          PageIndex: 1,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
        })
        .then((res) => {
          this.HouseList = res.PropertysModel;
          console.log("打印结果");
          console.log(res);
        });
    },
    // end search 區域
    //下拉刷新
    onPullRefresh() {
      console.log("下拉刷新列表");
      ++this.pageIndex;
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
        })
        .then((res) => {
          // 判斷數據是否已經加載完畢
          // end 判斷數據是否已經加載完畢
          this.pullLoading = false;
          if (res.PropertysModel == []) {
            this.finishedList = 0;
            this.pullLoading = this.listLoading = false;
            console.log("進入下一判斷");
            return;
          }
          let temp_data = res.PropertysModel;
          temp_data.forEach((item) => {
            this.HouseList.push(item);
          });
          //this.HouseList=this.HouseList+ res.PropertysModel;
          console.log(this.HouseList);
          // this.HouseList+= res.PropertysModel;
        });
    },
    //上滑加載列表 no use
    onLoadList() {
      if (this.finishedList) return;
      ++this.pageIndex;
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
        })
        .then((res) => {
          // 判斷數據是否已經加載完畢
          // end 判斷數據是否已經加載完畢
          if (res.PropertysModel == []) {
            this.finishedList = 0;
            this.pullLoading = this.listLoading = false;
          }
          this.HouseList += res.PropertysModel;
        });
    },
    // end 下滑加載列表
    // end 下拉刷新
    // 保存搜索
    saveSearch() {
      this.$router.push("/saveSearch");
    },
    // end 保存搜索
    // 跳轉房源詳情
    detail(keyId) {
      console.log("打印內容");
      console.log(keyId);
      let lc_keyId = keyId;
      // this.$router.push("/House_d?from=home");
      this.$router.push({ path: "house_d", query: { KeyId: lc_keyId } });
    },
    // end 跳轉房源詳情
    sure() {
      console.log(this.items[this.active].children[this.activeId].text);
      console.log(this.activeId);
    },
    left_c(e) {
      console.log(this.items[e]);
    },
    right_c(e) {
      console.log(e);
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    back() {
      this.$router.push("/Home");
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    onLoad() {
      ++this.pageIndex;
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
        })
        .then((res) => {
          let _temp = res.PropertysModel;
          _temp.forEach((item) => {
            this.HouseList.push(item);
          });

          this.loading = false;
          if (_temp == null || _temp == "" || _temp == 0) {
            this.finished = true;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.lc_search {
  display: flex;
  .lc_back {
    height: 54px;
    flex: 1;
  }
  .search_setting {
    height: 54px;
    flex: 20;
  }
}

.lc_drop_title {
  margin: 5px;
}

.lc_box {
  // flex: 20%;
  box-sizing: border-box;
  background-color: #f1f1f1;
  color: #333333;
  font-size: 12px;
  padding: 6px;
  margin: 5px;
}

.lc_field {
  margin: 5px 5px;
  .van-cell {
    background-color: #f1f1f1;

  }
}
.van-card__price {
  display: inline-block;
  color: #323233;
  font-weight: 700;
  font-size: 14px;
  color: #f12945;
  margin-top: 3px;
}
.van-tag--danger.van-tag--plain {
  background-color: #ee0a24;
  color: #fff;
}
.van-card__title {
  max-height: 32px;
  color: black;
  font-weight: 700;
  font-size: 15px;
  line-height: 16px;
}
.van-tag--danger.van-tag--plain {
  background-color: #ee0a24;
  position: relative;
  top: -1px;
  color: #fff;
}
.van-tag {
  position: relative;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 4px;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  border-radius: 2px;
}
.van-tag--mark {
  border-radius: 3px;
}
.van-card__tag {
  position: absolute;
  top: 0px;
  left: 0;
}
.van-card__thumb img {
  border-radius: 5px;
}
.van-card__thumb {
  position: relative;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  flex: none;
  width: 116px;
  height: 88px;
  margin-right: 8px;
}
.van-dropdown-menu__bar {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  /* height: 30px; */
  background-color: #fff;
  box-shadow: 0 0 0 rgb(100 101 102 / 12%);
}
.van-dropdown-item__content {
  position: absolute;
  max-height: 100%;
}
.btn {
  display: flex;
  justify-content: space-around;
  margin: 13px;
  .btn_reset {
    flex: 0.2;
    height: 35px;
    background-color: #fbeeee;
    color: #f12945;
    border-color: #f12945;
  }
  .btn_confrim {
    flex: 0.6;
    height: 35px;
    background-color: #f12945;
  }
}
.van-icon-search {
  color: #999999;
  font-size: 24px !important;
}
#app {
  background-color: white;
}
.van-icon-arrow-left {
  float: left;
  font-size: 24px;
  line-height: 54px;
}
.van-search__content--square {
  border: 1px solid #ccc;
  width: 320px;
}
.search {
  float: left;
}

::v-deep .van-dropdown-menu__bar {
  div:nth-child(5) {
    //  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201201%2F21%2F20120121221738_zyAvm.jpg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637381188&t=84fa3d6603a9919bfdb9ddd9e8d93b0a);
    .van-dropdown-menu__title--down::after {
      // margin-top: -0.02667rem;
      // -webkit-transform: rotate(135deg);
      // transform: rotate(135deg);
      //background: url(/icon/sort.icon/png);
      // top: auto;
      // display: block;
      // width: 15.5px;
      // height: 15.5px;
      // background: url("/icon/sort_select_icon.png") no-repeat center;
      // background-size: cover;
      // right: -0.10667rem;
      // margin-top: -0.13333rem;
      // border: none;
      // content: '333';
      // transform:none;
    }
    .van-dropdown-menu__title::after {
      // position: relative;
      // // top: 50%;
      top: -5px;
      display: block;
      width: 15.5px;
      height: 15.5px;
      background: url("/icon/sort_icon.png") no-repeat center;
      background-size: cover;
      right: -0.10667rem;
      margin-top: -0.13333rem;
      border: none;
      content: "";
      transform: none;
      // border: 0.08rem solid;
      // border-color: transparent transparent #dcdee0 #dcdee0;
      // -webkit-transform: rotate(-45deg);
      // transform: rotate(-45deg);
      // opacity: 0.8;
      // content: "";
    }

    .van-dropdown-menu__title--active::after {
      // border-color: transparent transparent currentColor currentColor;
      background: none;
    }
    .van-dropdown-menu__title--active {
      // color: #484ea1;
      position: relative;
      // top: 50%;
      top: 4px;
      display: block;
      width: 15.5px;
      height: 15.5px;
      background: url("/icon/sort_select_icon.png") no-repeat center;
      background-size: cover;
      right: -0.10667rem;
      margin-top: -0.13333rem;
      border: none;
      content: "";
      transform: none;
    }
  }
}
</style>
