<template>
  <div>
    <!-- 搜索區域 -->
    <van-sticky>
      <div class="lc_search">
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
    </van-sticky>
    <!-- end 搜索區域 -->
    <!-- 下拉框 -->
    <van-dropdown-menu class="lc_str">
      <van-dropdown-item title="區域" ref="lc_item">
        <van-tree-select
          height="70vw"
          :items="items"
          :main-active-index.sync="active"
          :active-id.sync="lcactiveId"
          @click-nav="area_left_click"
          @click-item="area_click"
        >
        </van-tree-select>
        <div style="display: flow-root">
          <div class="btn">
            <van-button type="warning" class="btn_reset">重置</van-button>
            <van-button
              class="btn_confrim"
              type="danger"
              @click="area_confrim_click"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>

      <van-dropdown-item title="價格" ref="lc_item_price">
        <van-tree-select
          height="70vw"
          :items="item"
          :main-active-index.sync="lc_price_activeId"
          :active-id.sync="lc_price_acitve"
          @click-nav="price_left_click"
          @click-item="price_click"
        >
          <template #content>
            <template v-if="lc_price_left === 0">
              <div v-for="(item, index) in item[0].children" :key="index">
                <span
                  @click="lc_item_click(item)"
                  :class="
                    index.toString() === lc_price_acitve ? 'lc_active' : 'lc_unactive'
                  "
                  >{{ item.text }}</span
                >
              </div>
              <div class="lc_luciano">
                <van-row type="flex" justify="center" align="center">
                  <van-col span="11">
                    <van-field
                      class="lc_input_price"
                      :disabled="price_disabled"
                      v-model="price_low"
                      type="number"
                      placeholder="最低價格"
                    />
                  </van-col>
                  <van-col span="1">
                    <span class="lc_divider"></span>
                  </van-col>
                  <van-col span="11">
                    <van-field
                      :disabled="price_disabled"
                      v-model="price_max"
                      type="number"
                      placeholder="最高價格"
                      class="lc_input_price"
                    />
                  </van-col>
                </van-row>
              </div>
            </template>
            <template v-else>
              <div v-for="(item, index) in item[1].children" :key="index">
                <span
                  @click="lc_item_click2(item)"
                  :class="index === activeId2 ? 'lc_active' : 'lc_unactive'"
                  >{{ item.text }}</span
                >
              </div>
            </template>
          </template>
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button
            class="btn_confrim"
            type="danger"
            @click="price_confirm_click"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="標簽" ref="item">
        <van-tree-select
          height="70vw"
          :items="item_t"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
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
            <div class="lc_house">
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
        </van-tree-select>
        <div class="btn">
          <van-button type="warning" class="btn_reset">重置</van-button>
          <van-button type="danger" class="btn_confrim" @click="sure"
            >確定</van-button
          >
        </div>
      </van-dropdown-item>
      <!-- 排序 -->
      <van-dropdown-item class="lc_rr" title="" ref="item">
        <van-tree-select
          height="100vw"
          :items="item_s"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
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
    <div class="lc_hisotry_contianer">
      <div class="lc_pills">
        <van-button type="default" size="small" class="lc_button"
          >租售</van-button
        >
        <van-button type="default" size="small" class="lc_button"
          >售</van-button
        >
        <van-button type="default" size="small" class="lc_button"
          >租</van-button
        >
      </div>
      <van-button
        type="default"
        size="small"
        style="color: blue !important; border: 0px !important"
        @click="saveSearch"
        >保存搜索</van-button
      >
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
    <!-- <div style="height: 50px"></div> -->
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
    // 獲取房源列表
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
    // 房源狀態篩選
    aplush.apis.ListingStatus().then((res) => {
      this.HouseStatus = res.PropertyStatus;
    });
  },
  watch: {
    lcactiveId(val, old) {
      let lc_index = this.lc_area_left;
      this.lct_area = [];
      this.items[lc_index].children.forEach((item) => {
        this.lcactiveId.forEach((item2) => {
          if (item2 == item.id) {
            this.lct_area.push(item.keyId);
          }
        });
      });
    },
  },
  data() {
    return {
      index_l: 0,
      index_r: 0,
      radio: "1",
      chosenContactId: "1",
      HouseList: [],
      activeId: 0,
      lcactiveId: [],
      activeId2: 0,
      lct_area: [],
      lct_area_str: "",
      lc_price: [],
      lc_price_activeId: 0,
      lc_price_acitve: "",
      active: 0,
      pageIndex: 1,
      listLoading: false, //上滑列表加載（每一次上滑的時候)
      finishedList: false, //上滑列表加載完了所有數據（沒有更多了)
      pullLoading: false, //下拉刷新加載動畫
      loading: false,
      finished: false,
      refreshing: false,
      lc_area_left: 0,
      lc_price_left: 0,
      // 價格選中的值
      lc_price_select: {
        startPrice: 0,
        endPrice: 0,
      },
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
              startPrice: 0,
              endPrice: 0,
              id: 0,
            },
            {
              text: "500萬以下",
              startPrice: 0,
              endPrice: 500,
              id: 1,
            },
            {
              // 名称
              text: "500-1000萬",
              startPrice: 500,
              endPrice: 1000,
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "1000-2000萬",
              startPrice: 1000,
              endPrice: 2000,
              id: 3,
            },
          ],
        },
        {
          text: "出租價(元)",
          type: "rent",
          children: [
            {
              // 名称
              text: "不限",
              // id，作为匹配选中状态的标识符
              id: 0,
            },
            {
              text: "500萬以下",
              startPrice: 0,
              endPrice: 500,
              id: 1,
            },
            {
              // 名称
              text: "500-1000萬",
              startPrice: 500,
              endPrice: 1000,
              // id，作为匹配选中状态的标识符
              id: 2,
            },
            {
              text: "1000-2000萬",
              startPrice: 1000,
              endPrice: 2000,
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
          Id: "ee549454-4917-414a-b9da-df150d4534d2",
          children: [
            {
              keyId: "33e629bd-d54a-46e6-8ab2-2f4452130806",
              id: 0,
              text: "青洲區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "9aee3ce3-1dd6-400b-af10-a5b292c6b21b",
              id: 1,
              text: "台山區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "0911cf23-557b-4054-b635-51d95cce7897",
              id: 2,
              text: "黑沙環及祐漢區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "7e6f6916-4685-4c1f-8093-3d92fbc27898",
              id: 3,
              text: "黑沙環新填海區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "caec3deb-299e-4864-b6d3-9138e385f5cf",
              id: 4,
              text: "望廈及水塘區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "9c4c23ec-68ed-40e7-8f1e-cd6ca41b70d0",
              id: 5,
              text: "筷子基區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "077490e0-f8bd-49c0-ac0d-9dcb6d1a5aca",
              id: 6,
              text: "林茂塘區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "6a053c3c-bd9b-4d1a-ab76-5295cb6f411e",
              id: 7,
              text: "高士德及雅廉訪區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "1af2bdd9-aaaf-4c16-a262-28855241fe30",
              id: 8,
              text: "新橋區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "60a1ea8e-10eb-4394-bb21-5e00103bf5b2",
              id: 9,
              text: "沙梨頭及大三巴區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "dd8f9c0e-3387-4a1f-bb82-51a09062df3a",
              id: 10,
              text: "荷蘭園區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "e61f7fd7-370a-4d06-b510-0576f56351a2",
              id: 11,
              text: "東望洋區(松山區)",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "e670c892-f37b-4fea-9c23-1531d6965f41",
              id: 12,
              text: "新口岸區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "ab5c10a3-7b8b-4f46-89d2-5da31396c6bf",
              id: 13,
              text: "外港及南灣湖新填海區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "a4efa499-8400-4b3f-98bf-8040c17a839d",
              id: 14,
              text: "中區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "23a2722a-cbca-41cc-a645-52b236c9806d",
              id: 15,
              text: "下環區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
            {
              keyId: "ff0e8455-bcdc-4bfe-809e-7fe9ff97b184",
              id: 16,
              text: "南西灣及主教山區",
              Level: 2,
              IsMacau: false,
              ParentId: "ee549454-4917-414a-b9da-df150d4534d2",
              IsSelect: false,
            },
          ],
        },

        {
          text: "氹仔",
          keyId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
          children: [
            {
              keyId: "6ae1cc29-0755-41c4-b330-81f442963726",
              id: 0,
              text: "海洋及小潭山區",
              Level: 2,
              IsMacau: false,
              ParentId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
              IsSelect: false,
            },
            {
              keyId: "7abb001a-e35a-4de8-a071-3946a2d60b6a",
              id: 1,
              text: "氹仔中心區",
              Level: 2,
              IsMacau: false,
              ParentId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
              IsSelect: false,
            },
            {
              keyId: "9eb8b44c-5855-4925-869e-35df52b9769d",
              id: 2,
              text: "大學及北安灣區",
              Level: 2,
              IsMacau: false,
              ParentId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
              IsSelect: false,
            },
            {
              keyId: "68155529-6b5d-48e5-aeca-2cc4cc1199da",
              id: 3,
              text: "北安及大潭山區",
              Level: 2,
              IsMacau: false,
              ParentId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
              IsSelect: false,
            },
            {
              keyId: "3c68d0a4-b83d-4e0a-91b6-55208ddb2995",
              id: 4,
              text: "氹仔舊城及馬場區",
              Level: 2,
              IsMacau: false,
              ParentId: "66864c48-f68b-4d39-8a7e-0d531b5cb6e3",
              IsSelect: false,
            },
          ],
        },
        {
          text: "路環",
          KeyId: "d0091123-dca0-445d-877c-6c1ba803ca3b",
          children: [
            {
              keyId: "dcc7d085-0fdb-47a8-8208-d146a815993f",
              id: 0,
              text: "路環",
              Level: 2,
              IsMacau: false,
              ParentId: "d0091123-dca0-445d-877c-6c1ba803ca3b",
              IsSelect: false,
            },
          ],
        },
      ],

      value: 0,
      values: this.$route.query.word,
      switch1: false,
      switch2: false,
      content_r: "",
      content_l: "",
      option: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      phone: "",
      price_low: "",
      price_max: "",
      lc_districtKey: "",
      price_disabled: false,
      click_count: 0,
    };
  },
  methods: {
    // search 區域
    onSearch(word) {
      console.log("打印搜索關鍵字");
      console.log(word);
      this.$router.push({
        path: "/Search",
        query: {
          word: this.values,
        },
      });
      // aplush.apis
      //   .Listinglist({
      //     PageIndex: 1,
      //     PageSize: 20,
      //     PropType: 1,
      //     EstateSelectType: 4,
      //   })
      //   .then((res) => {
      //     this.HouseList = res.PropertysModel;
      //     console.log("打印结果");
      //     console.log(res);
      //   });
    },
    // 條搜索頁面
    goSearch() {
      this.$router.push({
        path: "/Search",
        params: {
          word: this.values,
        },
      });
    },
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
    //篩選條件使用
    baseData() {
      console.log("BaseData 被調用");
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
          AreaKeyIdStr: this.lc_districtKey,
          SalePriceFrom:
            this.lc_price_select.startPrice == ""
              ? this.price_low
              : this.lc_price_select.startPrice, //出價格開始
          SalePriceTo:
            this.lc_price_select.endPrice == ""
              ? this.price_max
              : this.lc_price_select.endPrice, //出價格結束
          RentPriceFrom: "", //租價開始
          RentPriceTo: "", //租價結束
        })
        .then((res) => {
          let _temp = res.PropertysModel;
          this.HouseList = _temp;
        });
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
    lc_item_click(item) {
      console.log(item);
      this.click_count++;
      // this.lc_price_acitve ==""?this.item.id:this.lc_price_acitve;
    
      this.click_count == 1
        ? (this.lc_price_acitve = item.id.toString())
        : (this.lc_price_acitve = this.lc_price_acitve);
      this.click_count==1?this.lc_price_acitve = item.id.toString():this.lc_price_acitve;
      this.lc_price_select.startPrice = item.startPrice;
      this.lc_price_select.endPrice = item.endPrice;
      if (this.click_count == 2) {
        if (this.lc_price_acitve == item.id.toString()) {

          this.click_count = 0;
          this.lc_price_acitve = "";
          this.lc_price_select.startPrice = "";
          this.lc_price_select.endPrice = "";
        }else{
          this.click_count = 0;
          this.lc_price_acitve = item.id.toString();
          this.lc_price_select.startPrice = item.startPrice;
          this.lc_price_select.endPrice = item.endPrice;
        }
      }

      this.lc_price_acitve == ""
        ? (this.price_disabled = false)
        : (this.price_disabled = true);
    },
    lc_item_click2(item) {
      this.activeId2 = item.id;
      
    },
    area_left_click(left_click) {
      console.log("左側標題點擊事件");
      console.log(left_click);
      this.lc_area_left = left_click;
    },
    // 區域點擊
    area_click(result_item) {
      console.log(this.lct_area);
    },
    price_left_click(left_click) {
      console.log("價格左側標題點擊事件");
      console.log(left_click);

      this.lc_price_left = left_click;
    },
    price_click() {},
    area_confrim_click() {
      this.$refs.lc_item.toggle();
      this.lc_districtKey = this.lct_area.join(",");
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1,
          EstateSelectType: 4,
          AreaKeyIdStr: this.lc_districtKey,
        })
        .then((res) => {
          let _temp = res.PropertysModel;
          this.HouseList = _temp;
        });
    },
    price_confirm_click() {
      this.$refs.lc_item_price.toggle();
      this.baseData();
    },
    price_confirm_click2() {
      this.$refs.lc_item_price.toggle();
      this.baseData();
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
.lc_house {
  margin: 5px 5px;
}
.van-card__price {
  display: inline-block;
  color: #323233;
  font-weight: 700;
  font-size: 14px;
  color: #f12945;
  margin-top: 3px;
}
.lc_hisotry_contianer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .lc_pills {
    position: relative;
    display: flex;
    margin-left: 20px;
    .lc_button {
      width: 50px;
      height: 30px;
      background-color: rgb(243, 233, 252);
      margin: 1px;
    }
  }
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
.lc_confirm {
  flex: 0.6;
  height: 35px;
  background-color: #f12945;
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
.lc_active {
  padding: 0 30px 0 15px;
  color: #f12945;
  line-height: 46px;
  font-size: 14px;
}
.lc_unactive {
  padding: 0 30px 0 15px;
  line-height: 46px;
  font-size: 14px;
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
// ::v-deep .van-cell .van-cell__value .van-field__body {
//   border: solid 1px #e2e2e2;
//   border-radius: 2px;
//   padding: 3px;
// }
.lc_divider {
  position: relative;
  display: block;
  width: 20px;
  height: 2px;
  background: #000;
}
.lc_luciano {
  ::v-deep .van-cell {
    padding: 8.9px 8px 8.9px 8px;
    .van-cell__value {
      .van-field__body {
        border: solid 1px #e2e2e2;
        border-radius: 2px;
        padding: 3px;
      }
    }
  }
}
</style>


