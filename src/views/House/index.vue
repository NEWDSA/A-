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
    <!-- 下拉框 -->
    <van-dropdown-menu class="lc_str">
      <!-- 區域設定 main-active-index左侧选中项的索引、active-id右側選中的id支持傳入數組[] -->
      <van-dropdown-item @open="show_area" title="區域" ref="lc_item">
        <van-tree-select
          height="70vw"
          :items="items"
          :main-active-index.sync="active"
          :active-id.sync="lcactiveId"
          @click-nav="area_left_click"
          @click-item="area_click"
        >
        </van-tree-select>
        <div class="sort_btn">
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
          :isShow="false"
          :active-id.sync="lc_price_acitve"
          @click-nav="price_left_click"
          @click-item="price_click"
          class="lc_tree-select"
        >
        <template slot="content" >
          <ul>
            <li class="lc_ul_li"  v-for="(item, index) in priceList">
              {{item.text}}
            </li>
          </ul>
          <template v-if="lc_price_activeId=='0'">
            <div style="display:flex;">
              <van-field style="flex:1;" type="number" v-model="price_min" placeholder="最低價" />
              <span>---</span>
              <van-field style="flex:1;" type="number" v-model="price_max" placeholder="最高價" />
            </div>
          </template>
          <template v-else>
            <div style="display:flex;">
              <van-field style="flex:1;" type="number" v-model="price_min" placeholder="最低價" />
              <span>---</span>
              <van-field style="flex:1;" type="number" v-model="price_max" placeholder="最高價" />
            </div>
          </template>
        </template>
        </van-tree-select>
        <!-- <div style="position:relative;top:-20px;width:100%;box-sizing:border-box;border:1px solid pink;display:flex;">
          <div style="flex:1;"></div>
          <div style="flex:2;">
            <van-field type="text" v-model="lc_price_input" placeholder="最低價格" style="width:100%;height:30px;"></van-field>
          </div>
          <div style="flex:3;">
            <van-field type="text" v-model="lc_price_input" placeholder="最高價格" style="width:100%;height:30px;"></van-field>
          </div>
        </div> -->
        <div class="sort_btn">
          <div class="btn">
            <van-button type="warning" class="btn_reset">重置</van-button>
            <van-button
              class="btn_confrim"
              type="danger"
              @click="price_confirm_click"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="標簽" @open="show_tag" ref="item">
        <van-tree-select
          height="70vw"
          :items="item_t"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="left_c"
          @click-item="right_c"
        >
        </van-tree-select>
        <div class="sort_btn">
          <div class="btn">
            <van-button type="warning" class="btn_reset">重置</van-button>
            <van-button type="danger" class="btn_confrim" @click="sure"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item @open="show_more" title="更多" ref="item">
        <van-tree-select
          height="100vw"
          :items="item_m"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="more_left_Click"
          @click-item="more_right_Click"
        >
          <template #content>
            <div class="lc_drop_title">聯繫人類型</div>

            <div style="display: flex; flex-wrap: wrap">
              <template v-for="item in lc_CustomType.Items">
                <span class="lc_box">{{ item.ItemName }}</span>
              </template>
            </div>
            <div class="lc_field">
              <van-field
                v-model="phone"
                label="姓名/手機:"
                placeholder="请输入"
                size="mini"
              />
            </div>
            <div class="lc_field lc_house">
              <van-field
                v-model="PropertyID"
                label="房源編號:"
                placeholder="请输入"
                size="mini"
              />
            </div>

            <span class="lc_status_txt">狀態</span>
            <div class="lc_status">
              <template v-for="item in HouseStatus">
                <span class="lc_stauts_container">{{ item.Name }}</span>
              </template>
            </div>
            <span class="lc_status_txt">房型</span>
            <div class="lc_status">
              <template v-show="RoomType" v-for="(item, index) in RoomType">
                <span v-if="item" class="lc_status_container">{{ item.ItemName}}</span>
              </template>
            </div>
          </template>
        </van-tree-select>
        <div class="sort_btn">
          <div class="btn">
            <van-button type="warning" class="btn_reset">重置</van-button>
            <van-button type="danger" class="btn_confrim" @click="sure"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <!-- 排序 -->
      <van-dropdown-item v-model="sortIndex" class="lc_rr" ref="sort_item">
        <template #title>
          <van-icon color="#666666" size="20" name="sort" />
        </template>
        <van-cell-group>
          <template v-for="(item, index) in HouseSort">
            <van-cell
              :class="{ lc_active_in: sortIndex === index }"
              :key="index"
              @click="sort_event(index)"
              :title="item.text"
            >
            </van-cell>
          </template>
        </van-cell-group>
        <div class="sort_btn" v-show="HouseSort">
          <div class="btn">
            <van-button type="warning" class="btn_reset" @click="reset_sort"
              >重置</van-button
            >
            <van-button class="btn_confrim" type="danger" @click="sort_click"
              >確定</van-button
            >
          </div>
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
  </div>
</template>
<script>
import { Toast } from "vant";
import aplush from "@/api/A+";
import axios from "axios";
import api from "@/api";
export default {
  mounted() {
    // 獲取房源列表
    this.lc_House_List();
    this.ck_house_status();
    this.house_sort();
    this.house_type();
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
      lc_area_left: [],
      lc_price_left: 0,
      // 售選中的價格
      lc_price_select: {
        startPrice: "",
        endPrice: "",
      },
      // 租選中的價格
      lc_price_select_rent: {
        startPrice: "",
        endPrice: "",
      },
      // 房源編號
      PropertyID: "",
      // 客戶類型
      lc_CustomType: "",
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
              id: 4,
            },
            {
              text: "500萬以下",
              startPrice: 0,
              endPrice: 500,
              id: 5,
            },
            {
              // 名称
              text: "500-1000萬",
              startPrice: 500,
              endPrice: 1000,
              // id，作为匹配选中状态的标识符
              id: 6,
            },
            {
              text: "1000-20004萬",
              startPrice: 1000,
              endPrice: 2000,
              id: 7,
            },
          ],
        },
      ],
      item_t: [],
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
      items: [],// 房型
      value: 0,
      values: this.$route.query.word,
      switch1: false,
      switch2: false,
      content_r: "",
      content_l: "",
      phone: "",
      price_low: "",
      price_max: "",
      lc_districtKey: "",
      price_disabled: false,
      click_count: 0,
      click_count2: 0,
      HouseStatus: [],
      //房源查詢類型
      QueryType: "4",
      HouseSort: [],
      // 排序index
      sortIndex: "0",
      sort_name: "", //排序選中的值
      RoomType: [
        {
          ItemName: "",
        },
      ], //房型
      lc_price_input: "",
      priceList:[],
      price_min: "",
      price_max: "",
      // priceList:this.item["0].children, //價格列表
    };
  },
  created(){
    this.priceList=this.item[0].children;
  },
  mounted(){
    // document.getElementsByClassName("van-tree-select__nav");
    // console.log(this.$refs.tree_select);
    // this.$nextTick(()=>{
    //   let lc_size= document.querySelectorAll("a[class='van-tree-select__nav-item']");
    //   console.log(document.getElementsByClassName('van-tree-select__nav-item')[0]);
    //   console.log(lc_size);
    //   console.log(this.$refs.lc_item_price.style);
    // })
    
    // console.log(this.$refs.tree_select.querySelector(".van-tree-select__nav"));
    
  },
  methods: {
    // search 區域
    onSearch(word) {
      this.$router.push({
        path: "/Search",
        query: {
          word: this.values,
        },
      });
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
      // console.log("下拉刷新列表");
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
        });
    },
    // 保存搜索
    saveSearch() {
      this.$router.push("/saveSearch");
    },
    // 跳轉房源詳情
    detail(keyId) {
      let lc_keyId = keyId;
      this.$router.push({ path: "details", query: { KeyId: lc_keyId } });
    },
    // end 跳轉房源詳情
    sure() {
      console.log(this.items[this.active].children[this.activeId].text);
      console.log(this.activeId);
    },
    // 排序確認

    left_c(e) {
      console.log(this.items[e]);
    },
    // 點擊顯示區域
    show_area() {
      this.lc_area_data();
    },
    // 顯示標籤
    show_tag() {
      aplush.apis
        .SystemType({
          Type: "27",
        })
        .then((res) => {
          // this.item_t=res.Result;
          let _temp = res.Result.Items;
          console.log("打印temp");
          console.log(_temp);
          _temp.forEach((item, index) => {
            if (item.id == this.house_sort_id) {
              this.item_t.push({
                text: item.ItemName,
                value: item.KeyId,
              });
            }
          });
          console.log(this.item_t);
          // this.item_t=res;
        });
    },
    // 更多左點擊
    more_left_Click() {},
    // 更多右點擊
    more_right_Click() {},
    // 標籤右側點擊
    right_c(e) {
      console.log("標籤點擊事件");
      console.log(e);
    },
    //標籤左側點擊
    left_c(e) {
      console.log("標籤左側點擊");
      console.log(e);

      this.baseData();
    },
    // 排序左侧点击
    // left_click(e) {
    //   this.active = e;
    //   this.activeId = 0;
    // },
    //排序左側點擊
    // Sort_let_Click(e) {
    //   console.log(this.HouseSort[e]);
    // },
    // 排序右侧点击
    Sort_right_Click(e) {
      console.log("排序右侧点击");
      console.log(e);
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    show_more() {
      aplush.apis
        .SystemType({
          Type: "41",
        })
        .then((res) => {
          this.lc_CustomType = res.Result;
          aplush.apis
            .SystemType({
              Type: "25",
            })
            .then((res) => {
              console.log('this RoomType');
              
              // this.RoomType.push(res.Result.Items);
              this.RoomType = res.Result.Items;
              console.log(this.RoomType);
            // this.$nextTick(() => {
            //     this.RoomType.push(res.Result.Items);
            //   });
            //   console.log("this.RoomType");
            //   console.log(this.RoomType);
            // });
            });
        })

      // aplush.apis.SystemType({

      // }).then(res=>{

      // })
    },
    back() {
      this.$router.push("/Home");
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    //篩選條件使用
    baseData() {
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1, //查詢類型
          EstateSelectType: this.QueryType, //房源查詢類型
          AreaKeyIdStr: this.lc_districtKey, //區域選中的keyId
          SalePriceFrom: this.lc_price_select.startPrice, //
          SalePriceTo: this.lc_price_select.endPrice,
          RentPriceFrom: this.lc_price_select_rent.startPrice,
          RentPriceTo: this.lc_price_select_rent.endPrice,
          SortField: this.sort_name, // 排序條件
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
      this.click_count++;
      this.click_count == 1
        ? (this.lc_price_acitve = item.id.toString())
        : (this.lc_price_acitve = this.lc_price_acitve);
      this.lc_price_select.startPrice = item.startPrice;
      this.lc_price_select.endPrice = item.endPrice;
      if (this.click_count == 2) {
        if (this.lc_price_acitve == item.id.toString()) {
          this.click_count = 0;
          this.lc_price_acitve = "";
          this.lc_price_select.startPrice = "";
          this.lc_price_select.endPrice = "";
        } else {
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
      this.click_count2++;
      this.click_count2 == 1
        ? (this.lc_price_acitve = item.id)
        : (this.lc_price_acitve = this.lc_price_acitve);
      this.lc_price_select.startPrice = item.startPrice;
      this.lc_price_select.endPrice = item.endPrice;
      if (this.click_count2 == 2) {
        if (this.lc_price_acitve == item.id) {
          this.click_count2 = 0;
          this.this.lc_price_acitve = "";
          this.lc_price_select.startPrice = "";
          this.lc_price_select.endPrice = "";
        } else {
          this.click_count2 = 0;
          this.lc_price_acitve = item.id;
          this.lc_price_select.startPrice = item.startPrice;
          this.lc_price_select.endPrice = item.endPrice;
        }
      }
    },
    // 區域左側選擇
    area_left_click(left_click) {
      this.lc_area_left = left_click;
      console.log("this.lct_area_left");
      console.log(left_click);
      console.log(this.lct_area_left);
    },
    // 區域點擊
    area_click(result_item) {
      //通過下標獲取keyId
      console.log("打印選中的結果");
      console.log(this.lcactiveId);
    },
    // 價格左側選擇
    price_left_click(left_click) {
      console.log("價格左側點擊下標");
      this.lc_price_left = left_click;
      console.log(left_click);
      // 根據左側顯示右側內容
      console.log(this.item[left_click].children);
      this.priceList=this.item[left_click].children;
    },
    // 价格點擊
    price_click(e) {
      console.log("價格點擊事件");
      console.log(e);
      console.log(this.lc_price_select);
      console.log(this.lc_price_acitve);
      // this.baseData();
    },
    // 區域確認選擇
    area_confrim_click() {
      //清空數據
      this.lct_area = [];
      this.$refs.lc_item.toggle();
      this.QueryType = 2;
      let lc_index = this.lc_area_left; //左側選中的
      this.items.forEach((item, index) => {
        item.children.forEach((item2) => {
          this.lcactiveId.forEach((item3) => {
            if (item3 == item2.id) {
              this.lct_area.push(item2.KeyId);
            }
          });
        });
      });

      this.lct_area.length > 1
        ? (this.lc_districtKey = this.lct_area.join(","))
        : (this.lc_districtKey = this.lct_area.join(""));
      this.baseData();
    },
    price_confirm_click() {
      this.$refs.lc_item_price.toggle();
      this.QueryType = 2;
      console.log("價格確認點擊", this.lc_price_activeId);
      // 右側選中的
      this.item.forEach((item, index) => {
        item.children.forEach((item2) => {
          if (this.lc_price_acitve == item2.id) {
            this.lc_price_activeId == "0"
              ? (this.lc_price_select.startPrice = item2.startPrice)
              : "";
            this.lc_price_activeId == "0"
              ? (this.lc_price_select.endPrice = item2.endPrice)
              : "";
            this.lc_price_activeId == "1"
              ? (this.lc_price_select_rent.startPrice = item2.startPrice)
              : "";
            this.lc_price_activeId == "1"
              ? (this.lc_price_select_rent.endPrice = item2.endPrice)
              : "";
          }
        });
      });
      this.baseData();
    },
    price_confirm_click2() {
      this.$refs.lc_item_price.toggle();
      // this.baseData();
    },
    // 房源列表
    lc_House_List() {
      this.baseData();
    },
    // 房源狀態
    ck_house_status() {
      // 房源狀態篩選
      aplush.apis.ListingStatus().then((res) => {
        this.HouseStatus = res.propertyStatus;
        console.log("房源狀態");
        console.log(this.HouseStatus);
      });
    },
    //房源列表排序
    house_sort() {
      aplush.apis.ListingSort().then((res) => {
        console.log("房源列表排序");
        console.log(res);
        let _temp = res;
        _temp.forEach((item, index) => {
          if (item.id == this.house_sort_id) {
            this.HouseSort.push({
              text: item.SortName,
              value: index,
              SortName: item.SortField,
            });
          }
        });
        console.log("房源列表排序",this.HouseSort);
      });
    },
    // 排序重置
    reset_sort() {
      this.sort_name = "";
      this.sortIndex = "";
    },
    //房源排序選中
    sort_event(index) {
      this.sortIndex = index;
      console.log("房源排序選中");
      console.log(index);
      this.sort_name = this.HouseSort[index].SortName;
    },
    //房型
    house_type() {
      aplush.apis
        .SystemType({
          Type: "25",
        })
        .then((res) => {
          console.log("房型");
          console.log(res);
          this.RoomType = res;
          console.log(this.RoomType);
        });
    },
    // 排序方法查詢
    sort_click() {
      // 關閉 dropitems
      this.$refs.sort_item.toggle();
      this.baseData();
    },
    //區域數據
    lc_area_data() {
      aplush.apis.ListingStatusMore().then((res) => {
        var lc_Districts = res.Districts;
        lc_Districts.forEach((item) => {
          (item.text = item.Name),
            (item.KeyId = item.KeyId),
            (item.children = []);
        });
        var lc_Regions = res.Regions;
        lc_Districts.map((item, index) => {
          lc_Regions.filter((i, index) => {
            if (i.ParentId == item.KeyId) {
              item.children.push({
                id: index,
                text: i.Name,
                KeyId: i.KeyId,
              });
            }
          });
        });
        this.items = lc_Districts;
        console.log("this.items");
        console.log(this.items);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
::v-deep .van-cell {
  padding: 0;
}

.lc_tree-select ::v-deep .van-cell__value {
  width: 83px;
  height: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 0.5px #e2e2e2;
  margin-left: 20px;
  margin-right: 10px;
}
::v-deep van-tree-select__content-text-hide {
  display: none;
}
</style>


