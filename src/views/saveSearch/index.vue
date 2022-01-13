<template>
  <div class="container">
    <van-nav-bar
      title="保存记录"
      left-arrow
      @click-left="goPage"
      :fixed="true"
      :placeholder="true"
    ></van-nav-bar>
    <!-- The mock data is juker -->
    <!-- <template v-for="index of 3">
      <div class="lc_card">
        <div style="width:100%;position:relative;top:0px;display:flex;flex-wrap:wrap;">
          <div class="lc_items"><span>交易類型:</span>租售</div>
          <div class="lc_items"><span>標籤:</span>經理推薦</div>
          <div class="lc_items"><span>房型:</span>兩居</div>
          <div class="lc_items"><span>排序:</span>默認排序</div>
          <div class="lc_items"><span>用途:</span>住宅</div>
          <div class="lc_items"><span>朝向:</span>西南</div>
        </div>
        <div class="lc_footer">
          <van-divider />
          <div class="lc_main_footer">
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#ee0a24">設置默認</van-radio>
            </van-radio-group>
            <div><span>刪除</span></div>
          </div>
        </div>
        <div style="position: absolute; width: 100%;">
          <div class="lc_cover">
            <div class="lc_word"></div>
          </div>
        </div>
      </div>
    </template> -->
    <template v-for="(item,index) in SearchOption">
      <div class="lc_card">
        <div style="width:100%;position:relative;top:0px;display:flex;flex-wrap:wrap;">
          <div class="lc_items" v-if="item.TagsName"><span>地區:</span>{{item.TagsName}}</div>
          <div class="lc_items" v-if="item.areaName"><span>區域:</span>{{item.areaName}}</div>
          <!-- 房屋朝向 -->
            <div class="lc_items" v-if="item.HouseDirection.length>0">
              <span>朝向:</span>
            <span>

              {{item.HouseDirection[index]==='0ca691b3-541d-4108-ad77-45799d618c48'?'北':
              item.HouseDirection[index]=='4f61a203-e355-466c-a582-7d94329a79d7'?'東北':
              item.HouseDirection[index]==='77831b13-7eb9-46a2-b78a-851c10143e99'?'東南':
              item.HouseDirection[index]==='ada8969a-bb45-440b-917c-8b7798fb6279'?'西北':
              item.HouseDirection[index]==='9843c331-78f4-419c-8f2c-1d3166322bee'?'東':
              item.HouseDirection[index]==='94c435d0-bca0-43f2-84f7-b1a0a9f24b5b'?'西':
              item.HouseDirection[index]==='51f504a0-1ce8-44bd-8929-f85d19cdf43b'?'南':
              item.HouseDirection[index]==='86c2e43f-44fd-4022-b07e-ffb223fa0731'?'西南':
              item.HouseDirection[index]==='32e220ba-14a2-48cb-8a52-923ff75f0a8d'?'三面单边':''
              }}</span>
            </div>
            
          <!-- </template> -->
          <div class="lc_items" v-if="item.SalePriceFrom"><span>售價起:</span>{{item.SalePriceFrom}}</div>
          <div class="lc_items" v-if="item.SalePriceTo"><span>售價止:</span>{{item.SalePriceTo}}</div>
          <div class="lc_items" v-if="item.SalePriceTo"><span>租價起:</span>{{item.RentPriceFrom}}</div>
          <div class="lc_items" v-if="item.SalePriceTo"><span>租價止:</span>{{item.RentPriceTo}}</div>
          <div class="lc_items" v-if="item.SalePriceTo"><span>排序方式:</span>{{item.SortField}}</div>
        </div>
        <div class="lc_footer">
          <van-divider />
          <div class="lc_main_footer">
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#ee0a24">設置默認</van-radio>
            </van-radio-group>
            <div @click="move_search"><span>刪除</span></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import aplush from "@/api/A+";
export default {
  // get-property-conditions
  data() {
    return {
      //设置保存记录内容 mock data 數據
      saveRecord: [
        {
          isdefault: true,
          transType: "3", //1，售 2、租 3、租售
          tag: "经理推荐", //标签
          houseType: "两居", //房型
          sort: "默認排序",
          purpose: "住宅",
          orientation: "西南",
        },
        {
          isdefault: false,
          transType: "2", //1，售 2、租 3、租售
          tag: "经理推荐", //标签
          houseType: "两居", //房型
          sort: "默認排序",
          purpose: "住宅",
          orientation: "西南",
        },
        {
          isdefault: false,
          transType: "1",
          buildType: "有電梯大廈", //建築類型
          houseType: "三居", //房型
          tag: "區經推薦", //用途
          use: "車位",
          orientation: "東南",
        },
      ],
      radio: "1",
      SearchOption:[]
    };
  },
  mounted() {
    let _temp_Option= Cookies.get("SearchCookies");
    if(_temp_Option){
      this.SearchOption=JSON.parse(_temp_Option);
      // 通過keyId獲取對應的區域名稱
    }

  
  },
  methods: {
    //返回上一頁
    goPage() {
      this.$router.go(-1);
    },
    //保存搜索項
    move_search(){
      this.SearchOption.pop(); //移除保存內容
      Cookies.set("SearchCookies",JSON.stringify(this.SearchOption));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;

  ::v-deep .van-nav-bar .van-icon {
    color: #666666;
  }
  .lc_card {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    width: 343px;
    // height: 147.5px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px auto;
    .lc_items {
      flex: 1;
      height: fit-content;
      font-size: 14px;
      padding-top: 19.5px;
      padding-left: 20px;
      padding-right: 10px;
      padding-bottom: 10px;
      white-space: nowrap;
      span {
        color: #7e7e7e;
        margin-right: 5px;
      }
    }
    .lc_footer {
      flex: 100%;
       margin-left: 10px;
       margin-right: 20px;
       margin-bottom: 10px;
      .lc_divider {
        width: 95%;
        //   background-color: #e2e2e2;
        height: 1px;
        border: 0.25px solid #e2e2e2;
        margin: 0 auto;
      }
      .lc_main_footer {
        bottom: 9px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 14px;
      }
    }
    .lc_cover {
      position: absolute;
      display: "block";
      left: 0;
      width: 40px;
      height: 40px;
      background: url("/icon/default.png");
      background-size: cover;
      &::after {
        position: relative;
        display: block;
        font-weight: lighter;
        content: "默認";
        font-size: 1px;
        color: #ffffff;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>