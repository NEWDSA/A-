<template>
  <div id="house">
    <div style="display: flex">
      <div style="height: 54px; flex: 1" v-if="$route.meta.showTab">
        <van-icon @click="back" name="arrow-left"  />
      </div>

      <div style="height: 54px; flex: 20">
        <van-search
          class="search"
          style="width: 100%"
          v-model="values"
          placeholder="樓盤名稱 | 棟座單元 | 房號"
        />
      </div>
    </div>

    <van-dropdown-menu>
      <van-dropdown-item title="區域">
        <van-tree-select
          height="110vw"
          :items="items"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
        </van-tree-select>

        <div class="btn">
          <van-button
            type="warning"
            style="
              flex: 0.2;
              height: 35px;
              background-color: #fbeeee;
              color: #f12945;
              border-color: #f12945;
            "
            >重置</van-button
          >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
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
            >確定</van-button>
        </van-tree-select>
     <div class="btn">
          <van-button
            type="warning"
            style="
              flex: 0.2;
              height: 35px;
              background-color: #fbeeee;
              color: #f12945;
              border-color: #f12945;
            "
            >重置</van-button
          >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
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
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button>
        </van-tree-select>
     <div class="btn">
          <van-button
            type="warning"
            style="
              flex: 0.2;
              height: 35px;
              background-color: #fbeeee;
              color: #f12945;
              border-color: #f12945;
            "
            >重置</van-button
          >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
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
         <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button>
        </van-tree-select>
     <div class="btn">
          <van-button
            type="warning"
            style="
              flex: 0.2;
              height: 35px;
              background-color: #fbeeee;
              color: #f12945;
              border-color: #f12945;
            "
            >重置</van-button
          >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="排序" ref="item">
           <van-tree-select
          height="100vw"
          :items="item_s"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
         <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button>
        </van-tree-select>
     <div class="btn">
          <van-button
            type="warning"
            style="
              flex: 0.2;
              height: 35px;
              background-color: #fbeeee;
              color: #f12945;
              border-color: #f12945;
            "
            >重置</van-button
          >
          <van-button
            type="danger"
            style="flex: 0.6; height: 35px; background-color: #f12945"
            @click="sure"
            >確定</van-button
          >
        </div> 
      </van-dropdown-item>
    </van-dropdown-menu>
    <div style="display: flex; justify-content: space-between;margin-top:10px">
      <div style="margin-left:12px">
        <van-button
          type="default"
          size="small"
          style="width: 50px; height: 30px;background-color:rgb(243, 233, 252);margin:1px"
          >租售</van-button
        >
        <van-button
          type="default"
          size="small"
          style="width: 50px; height: 30px;background-color:rgb(243, 233, 252);margin:1px"
          >售</van-button
        >
        <van-button
          type="default"
          size="small"
          style="width: 50px; height: 30px;background-color:rgb(243, 233, 252);margin:1px"
          >租</van-button
        >
      </div>

      <div>
      <van-button
          type="default"
          size="small"
          style="width: 80px; height: 30px;color:blue;border:0px"
          >保存搜索</van-button
        >
      </div>
    </div>

    <van-card
    @click="detail_c(index)"
    tag="租售"
    v-for="(item,index) in 8"
      :key="index"
      thumb="http://mo.centanet.com/CentalineMacauImage/ArticleImage/20170628113844_visual00.jpg?w=1120&watermark=smallgroup_center"
    >
      <template #title>
            <van-tag plain type="danger">有效</van-tag>
         <span style="font-size: 15px;font-weight:700">泉裕豪庭5A</span>

         <div style="font-size:12px;padding: 5px;color:#666666">4-2-3-2 | 东北 | 1,385 呎</div>
         <span style="background-color:#f3e9fc;color:#b77af0;">經理推薦</span>
         <span style="background-color:#f3e9fc;margin-left:5px;color:#b77af0;">連租盤</span>

      </template>

        <template #price>
         <span>售 1,288萬</span>
         <div>租 17,500元/月</div>
      </template>
    </van-card>

    <div style="height:50px">

    </div>
  </div>
</template>


<script>
import { Toast } from "vant";

export default {
  created(){
    console.log(this.$route.meta.showTab)
  },
  data() {
    return {
      index_l: 0,
      index_r: 0,
      radio: "1",
      chosenContactId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
        },
      ],
      active: 0,
       item_s: [
             {
          text: "默認",
          children: [
          
          ],
        },
        {
          text: "售價從高到低",
          children: [
           
          ],
        },
         {
          text: "售價從低到高",
          children: [
          
          ],
        },
        {
          text: "租價從高到低",
          children: [
           
          ],
        }, {
          text: "租價從低到高",
          children: [
          
          ],
        },
        {
          text: "面積從大到小",
          children: [
           
          ],
        }, {
          text: "面積從小到大",
          children: [
          
          ],
        },
        {
          text: "樓層從高到低",
          children: [
           
          ],
        }, {
          text: "樓層從低到高",
          children: [
           
          ],
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
            }
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
            }
          ],
        }
      ],
       item_t: [
        {
          text: "不限",
          children: [
          
          ],
        },
        {
          text: "獨家",
          children: [
           
          ],
        },
         {
          text: "放盤紙",
          children: [
          
          ],
        },
        {
          text: "鑰匙",
          children: [
           
          ],
        }, {
          text: "有圖",
          children: [
          
          ],
        },
        {
          text: "有360視頻",
          children: [
           
          ],
        }, {
          text: "72小時内新增房源",
          children: [
          
          ],
        },
        {
          text: "30天租約到期房",
          children: [
           
          ],
        }, {
          text: "豪宅盤",
          children: [
           
          ],
        },
      ],
        item_m: [
        {
          text: "聯係人類型",
          children: [
          
          ],
        },
        {
          text: "狀態",
          children: [
           
          ],
        },
         {
          text: "房型",
          children: [
          
          ],
        },
        {
          text: "用途",
          children: [
           
          ],
        }, {
          text: "朝向",
          children: [
          
          ],
        },
        {
          text: "建築面積",
          children: [
           
          ],
        }, {
          text: "建築類型",
          children: [
          
          ],
        },
        {
          text: "樓層",
          children: [
           
          ],
        }, {
          text: "樓齡",
          children: [
           
          ],
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
    detail_c(index){
       this.$router.push('/House_d?from=home')
    },
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
  },
};
</script>

<style lang="scss" scoped>
#house {
  background-color: #fff;
}

.van-card {
    position: relative;
    box-sizing: border-box;
    padding: 3px 16px;
    font-size: 12px;
    background-color: #fff;
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
</style>
