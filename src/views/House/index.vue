<template>
  <div style="background: #ffffff">
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
            v-model="lc_Keywords"
            placeholder="樓盤名稱 | 棟座單元 | 房號"
            @search="onSearch(lc_Keywords)"
          />
        </div>
      </div>
    </van-sticky>
    <!-- 下拉框 -->
    <van-dropdown-menu class="lc_str" :close-on-click-outside="false">
      <van-dropdown-item @open="show_area" title="區域" ref="lc_item">
        <van-tree-select
          class="lc_tree-select"
          :items="items"
          :main-active-index.sync="active"
          :active-id.sync="lcactiveId"
          @click-nav="area_left_click"
          @click-item="area_click"
        >
        </van-tree-select>
        <div class="sort_btn">
          <div class="btn">
            <van-button @click="reset_area" type="warning" class="btn_reset"
              >重置</van-button
            >
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
          class="lc_tree-select"
          :items="item"
          :main-active-index.sync="lc_price_activeId"
          :isShow="false"
          :active-id.sync="lc_price_acitve"
          @click-nav="price_left_click"
          @click-item="price_click"
        >
          <template slot="content">
            <ul>
              <li
                v-if="lc_price_left == 0"
                @click="price_click(item, index)"
                :class="
                  lc_price_acitve == index ? 'lc_ul_li_active' : 'lc_ul_li'
                "
                v-for="(item, index) in priceList"
              >
                {{ item.text }}
              </li>
              <li
                v-if="lc_price_left == 1"
                @click="price_click(item, index)"
                :class="
                  lc_price_acitve_two == index ? 'lc_ul_li_active' : 'lc_ul_li'
                "
                v-for="(item, index) in priceList"
              >
                {{ item.text }}
              </li>
            </ul>
            <template v-if="lc_price_activeId == '0'">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 90%;
                  margin: 0 auto;
                "
              >
                <van-field
                  style="flex: 1"
                  type="number"
                  v-model="saler_price_min"
                  placeholder="最低價"
                />
                <div class="lc_divider"></div>
                <van-field
                  style="flex: 1"
                  type="number"
                  v-model="saler_price_max"
                  placeholder="最高價"
                />
                <span style="color: #666666; margin-left: 2%">萬</span>
              </div>
            </template>
            <template v-else>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 90%;
                  margin: 0 auto;
                "
              >
                <van-field
                  style="flex: 1"
                  type="number"
                  v-model="rent_price_min"
                  placeholder="最低價"
                />
                <div class="lc_divider"></div>
                <van-field
                  style="flex: 1"
                  type="number"
                  v-model="rent_price_max"
                  placeholder="最高價"
                />
                <span style="color: #666666; margin-left: 2%">元</span>
              </div>
            </template>
          </template>
        </van-tree-select>
        <div class="sort_btn">
          <div class="btn">
            <van-button @click="price_reset()" type="warning" class="btn_reset"
              >重置</van-button
            >
            <van-button
              class="btn_confrim"
              type="danger"
              @click="price_confirm_click"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item title="標簽" @open="show_tag" ref="lc_items_tags">
        <van-cell-group>
          <div class="lc_tags_height">
            <van-cell  @click="tags_Click(index,item.KeyId)" v-for="(item, index) in item_t">
              <span :class="tagsindex==index?'lc_tags_hover':''">{{ item.text }}</span>
            </van-cell>
          </div>
        </van-cell-group>
        <div class="lc_sort_btn">
          <div class="btn">
            <van-button type="warning" class="btn_reset" @click="reset_tags" >重置</van-button>
            <van-button type="danger" class="btn_confrim" @click="sure"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item @open="show_more" title="更多" ref="item">
        <van-tree-select
          class="lc_tree-select"
          :items="item_m"
          :main-active-index.sync="active"
          :active-id.sync="activeId"
          @click-nav="more_left_Click"
          @click-item="more_right_Click"
        >
          <template #content>
            <div id="lc_drop_title" class="lc_drop_title">聯繫人類型</div>
            <div style="display: flex; flex-wrap: wrap">
              <template v-for="(item, index) in lc_CustomType.Items">
                <span
                  @click="contact_list(item, index)"
                  :class="
                    lc_CustomIndex === index ? 'lc_box_selected' : 'lc_box'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div>
            <!-- 選擇類型 -->
            <van-row>
              <van-col type="flex" justify="center" span="22">
                <van-field
                  style="
                    background-color: #f1f1f1;
                    border: 0.025rem solid #696969;
                    margin-left: 10px;
                  "
                  readonly
                  v-model="Type_Text"
                  placeholder="請選擇類型"
                  right-icon="arrow-down"
                  @click-right-icon="Search_Type_event"
                />
              </van-col>
            </van-row>
            <template>
              <div class="lc_field">
                <van-field
                  v-model="lc_filter"
                  :label="
                    lc_saveSearch_index === '1'
                      ? '手機'
                      : lc_saveSearch_index === '2'
                      ? '房源編號'
                      : lc_saveSearch_index === '3'
                      ? '地址'
                      : ''
                  "
                  :type="lc_saveSearch_index === '1' ? 'number' : 'text'"
                  placeholder="请输入"
                  size="mini"
                />
              </div>
            </template>
            <span class="lc_status_txt">狀態</span>
            <div class="lc_status">
              <template v-for="(item, index) in HouseStatus">
                <span
                  @click="change_status(index)"
                  :class="
                    RoomTypeList.includes(index)
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.Name }}</span
                >
              </template>
            </div>
            <span class="lc_status_txt lc_stauts_house">房型</span>
            <div class="lc_status">
              <template v-show="RoomType" v-for="(item, index) in RoomType">
                <span
                  v-if="item"
                  @click="change_roomtype(index)"
                  :class="
                    HouseListIndex.includes(index)
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div>
            <span class="lc_status_txt lc_stauts_userfor">用途</span>
            <div class="lc_status">
              <template v-for="(item, index) in HouseUse">
                <span
                  @click="change_HouseUse(index)"
                  :class="
                    lc_use_index.includes(index)
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div>
            <!-- lc_Orientation -->
            <span
              v-show="lc_Orientation"
              class="lc_status_txt lc_staus_orientation"
              >朝向</span
            >
            <div v-show="lc_Orientation" class="lc_status">
              <template v-for="(item, index) in lc_Orientation">
                <span
                  style="width: fit-content"
                  @click="change_orentation(item, index)"
                  :class="
                    lc_orientation_index.includes(index)
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div>
            <!-- 建築面積、建築類型 -->
            <van-row class="lc_area_cc">
              <van-col type="flex" justify="center" span="22">
                <van-field
                  style="
                    background-color: #f1f1f1;
                    border: 0.025rem solid #696969;
                    margin-left: 10px;
                  "
                  readonly
                  v-model="build_name"
                  placeholder="請選擇建築類型"
                  right-icon="arrow-down"
                  @click-right-icon="BuildingType_event"
                />
              </van-col>
            </van-row>
            <div class="lc_field">
              <van-field
                v-model="lc_area_min"
                placeholder="请输入"
                size="mini"
              />
            </div>
            <div class="lc_field">
              <van-field
                v-model="lc_area_max"
                placeholder="请输入"
                size="mini"
              />
            </div>
            <span class="lc_status_txt lc_house_typess">建築類型</span>
            <div class="lc_status">
              <template v-for="(item, index) in lc_BuildingType">
                <span
                  @click="change_BuildingType(item, index)"
                  :class="
                    lc_BuildingType_index.includes(index)
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div>
            <!-- 樓層 -->
            <span class="lc_status_txt lc_floor">樓層</span>
            <div class="lc_field">
              <van-field
                v-model="lc_floor_min"
                placeholder="請輸入起始樓層"
                size="mini"
              />
            </div>
            <div class="lc_field">
              <van-field
                v-model="lc_floor_max"
                placeholder="請輸入結尾樓層"
                size="mini"
              />
            </div>

            <!-- <div class="lc_status">
              <template v-for="(item, index) in lc_Floor">
                <span
                  @click="change_floor(item, index)"
                  :class="
                    lc_floor_index === index
                      ? 'lc_status_active'
                      : 'lc_stauts_container'
                  "
                  >{{ item.ItemName }}</span
                >
              </template>
            </div> -->
            <!-- 樓齡 -->
            <span
              v-show="lc_BuildingAge.length > 0"
              class="lc_status_txt lc_house_year"
              >樓齡</span
            >
            <div v-show="lc_BuildingAge.length > 0" class="lc_status">
              <template v-for="item in lc_BuildingAge">
                <span class="lc_status_container">{{ item.ItemName }}</span>
              </template>
            </div>
          </template>
        </van-tree-select>
        <div class="sort_btn">
          <div class="btn">
            <van-button @click="more_rest()" type="warning" class="btn_reset"
              >重置</van-button
            >
            <van-button type="danger" class="btn_confrim" @click="more"
              >確定</van-button
            >
          </div>
        </div>
      </van-dropdown-item>
      <!-- 排序 -->
      <van-dropdown-item
        style="overflow: hidden"
        @open="show_sort"
        class="lc_rr"
        ref="sort_item"
      >
        <template #title>
          <van-icon color="#666666" size="20" name="sort" />
        </template>
        <van-cell-group>
          <div style="height: 300px">
            <template v-for="(item, index) in HouseSort">
              <van-cell
                :class="{ lc_active_in: sortIndex === index }"
                @click="sort_event(index)"
                :title="item.text"
              >
              </van-cell>
            </template>
          </div>

          <div id="sort_btn" class="sort_btn" ref="lc_sort">
            <div class="btn">
              <van-button type="warning" class="btn_reset" @click="reset_sort"
                >重置</van-button
              >
              <van-button class="btn_confrim" type="danger" @click="sort_click"
                >確定</van-button
              >
            </div>
          </div>
        </van-cell-group>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 搜索歷史區域 -->
    <div class="lc_hisotry_contianer">
      <!-- tags 需要滿足如下條件 區域 才進行保存 -->
      <div class="lc_pills">
        <template v-for="(item, index) in lc_saveSearch">
          <van-button
            @click="tags_Search(index)"
            type="default"
            size="small"
            class="lc_button"
            >{{ item.areaName }}</van-button
          >
        </template>
      </div>
      <van-button
        v-show="has_search_result"
        type="default"
        size="small"
        style="color: blue !important; border: 0px !important"
        @click="saveSearch"
        >保存記錄</van-button
      >
      <span @click="search_record" style="margin-right: 5px">{{
        "已保存" + `${lc_saveSearch.length}` + "記錄"
      }}</span>
    </div>
    <van-pull-refresh
      v-model="pullLoading"
      @refresh="onPullRefresh"
      success-text="刷新成功"
    >
      <van-list
        :immediate-check="false"
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
          @click="detail(item, item.KeyId)"
        >
          <template #title>
            <van-tag plain type="danger">{{ item.PropertyStatus }}</van-tag>
            <span
              class="build_name"
              style="font-size: 15px; font-weight: 700"
              >{{ item.AllHouseInfo }}</span
            >
            <div style="font-size: 12px; padding: 5px; color: #666666">
              {{ item.Floor }} {{ item.HouseType }}|{{ item.Square }}
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
    <!-- 弹窗选择类型 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="show_type"
    >
      <van-picker
        show-toolbar
        title="請選擇類型"
        :columns="SearchTypeList"
        @confirm="SearchType_confirm"
        @cancel="SearchType_cancel"
        @change="SearchType_change"
      >
      </van-picker>
    </van-popup>
    <!-- 彈窗選擇建築類型 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="show_build"
    >
      <van-picker
        show-toolbar
        title="請選擇建築類型"
        :columns="BuildingTypeList"
        @confirm="BuildType_confirm"
        @cancel="BuildType_cancel"
        @change="BuildType_change"
      >
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import aplush from "@/api/A+";
import Cookies from "js-cookie";

export default {
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
      lc_price_acitve: -1,
      lc_price_acitve_two: -1,
      phone: "", //手機
      name: "", //姓名
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
      has_search_result: false,
      //搜索條件條目數
      search_items: 0,
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
              text: "1000-2000萬",
              startPrice: 1000,
              endPrice: 2000,
              id: 7,
            },
          ],
        },
      ],
      item_t: [],
      lc_sort_type: false,
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
      items: [], // 房型
      value: 0,
      values: this.$route.query.word,
      switch1: false,
      switch2: false,
      content_r: "",
      content_l: "",
      lc_filter: "",
      //搜索條件類型
      SearchTypeList: [
        {
          text: "手機",
          value: "1",
        },
        {
          text: "房源編號",
          value: "2",
        },
        {
          text: "地址",
          value: "3",
        },
        {
          text: "房源",
          value: "5",
        },
        {
          text: "聯繫人姓名",
          value: "6",
        },
      ],
      // 建築類型
      BuildingTypeList: [
        {
          text: "建築面積",
          value: "1",
        },
        {
          text: "實用面積",
          value: "2",
        },
        {
          text: "花園面積",
          value: "3",
        },
      ],
      lc_build_index: "",
      Type_Text: "", //選中類型文字
      build_name: "", //建築類型名稱
      unlimited: "", //不限條件搜索
      show_type: false, //類型選擇框
      lc_districtKey: "",
      price_disabled: false,
      click_count: 0,
      click_count2: 0,
      HouseStatus: [],
      show_build: false,
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
      RoomTypeList: [], //房型
      HouseListIndex: [],
      lc_price_input: "",
      lc_area_left: 0,
      priceList: [],
      saler_price_min: "",
      saler_price_max: "",
      rent_price_min: "",
      rent_price_max: "",
      //保存的搜索條件
      lc_saveSearch: [],
      lc_saveSearch_index: "", //選中的下標
      lc_CustomIndex: "", //選中的下標
      //用途index
      lc_use_index: [],
      //朝向index
      lc_orientation_index: [],
      lc_orientation_KeyId: [],
      // 樓層index
      lc_floor_index: [],
      // 樓層KeyId
      lc_floor_keyId: [],
      //建築類型index
      lc_BuildingType_index: [],
      // 建築類型keyid
      lc_BuildingType_KeyId: [],
      //標籤KeyId
      lc_Tag_KeyId: "",
      lc_tagsName: "",
      HouseUse: [], //物業用途
      lc_Orientation: [], // 朝向
      lc_Area: [], // 建築面積
      lc_BuildingType: [], // 建築類型
      lc_Floor: [], // 樓層
      lc_BuildingAge: [], // 樓齡
      lc_contact_index: 0, //聯繫人選中下標
      lc_area_min: "", // 面積起
      lc_area_max: "", //面積止
      lc_orentation_keyId: [],
      lc_Keywords: this.$route.query.word,
      lc_floor_start: "",
      lc_floor_end: "",
      lc_floor_min: "",
      lc_floor_max: "",
      save_cookies: false, // 保存cookies
      tagsindex: -1
    };
  },
  created() {
    this.priceList = this.item[0].children;
  },
  beforeMount() {
    this.lc_area_data();
  },
  mounted() {
    this.$nextTick(() => {
      this.ck_house_status();
    });
    this.house_sort();
    if (localStorage.getItem("SearchCookies") != undefined) {
      this.SearchObject = JSON.parse(localStorage.getItem("SearchCookies"));
      let lc_default_result = this.SearchObject.find(
        (item) => item.isdefault === true
      );
      //判斷是否有默認查詢條件
      if (lc_default_result != undefined) {
        console.log("this result is true??");
        aplush.apis
          .Listinglist({
            PageIndex: this.pageIndex,
            PageSize: 20,
            PropType: 1, //查詢類型
            EstateSelectType: lc_default_result.EstateSelectType, //房源查詢類型
            AreaKeyIdStr: lc_default_result.AreaKeyIdStr, //區域選中的keyId
            SalePriceFrom: lc_default_result.SalePriceFrom, //
            SalePriceTo: lc_default_result.SalePriceTo,
            HouseDirection: lc_default_result.HouseDirection,
            RentPriceFrom: lc_default_result.RentPriceFrom,
            RentPriceTo: lc_default_result.RentPriceTo,
            SortField: lc_default_result.SortField, // 排序條件
          })
          .then((res) => {
            let _temp = res.PropertysModel;
            this.HouseList = _temp;
          });
      } else {
        this.baseData();
      }
    } else {
      this.baseData();
    }
  },
  methods: {
    // search 區域
    onSearch(word) {
      this.$router.push({
        path: "/Search",
        query: {
          word: this.lc_Keywords,
        },
      });
    },
    //下拉加載
    onPullRefresh() {
      console.log("下拉加載");
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
      Toast({
        message: "保存成功",
        duration: 2000,
        forbidClick: true,
      });

      this.save_cookies = true;
      this.SaveCookies();
      this.has_search_result = false;
    },
    // 跳轉房源詳情
    detail(item, keyId) {
      let lc_keyId = keyId;
      this.$router.push({ path: "details", query: { KeyId: lc_keyId } });
    },
    //標籤
    sure() {
     this.$refs.lc_items_tags.toggle();
      this.baseData();
      this.has_search_result = true;
    },
    reset_tags(){
      console.log('reset_tags');
      console.log('重置內容');
      //將所選內容設置為空
      this.tagsindex =-1;
    },
    //更多
    more() {
      this.$refs.item.toggle();
      this.baseData();
      this.has_search_result = true;
    },
    // 點擊顯示區域
    show_area() {},
    // 顯示標籤
    show_tag() {
      aplush.apis
        .SystemType({
          Type: "27",
        })
        .then((res) => {
          let _temp = res.Result.Items;
          _temp.forEach((item, index) => {
            if (item.id == this.house_sort_id) {
              this.item_t.push({
                text: item.ItemName,
                value: item.KeyId,
                KeyId: item.KeyId,
              });
            }
          });
          console.log(this.item_t);
          // this.item_t=res;
        });
    },
    // 更多左點擊
    more_left_Click(index) {
      switch (index) {
        case 0:
          document.querySelector(".lc_drop_title").scrollIntoView();
          break;
        case 1:
          document.querySelector(".lc_status_txt").scrollIntoView();
          break;
        case 2:
          document
            .querySelector(".lc_status_txt.lc_stauts_house")
            .scrollIntoView();
          break;
        case 3:
          document
            .querySelector(".lc_status_txt.lc_stauts_userfor")
            .scrollIntoView();
          break;
        case 4:
          document
            .querySelector(".lc_status_txt.lc_staus_orientation")
            .scrollIntoView();
          break;
        case 5:
          document.querySelector(".lc_area_cc").scrollIntoView();
          break;
        case 6:
          document
            .querySelector(".lc_status_txt.lc_house_typess")
            .scrollIntoView();
          break;
        case 7:
          document.querySelector(".lc_status_txt.lc_floor").scrollIntoView();
          break;
        case 8:
          document
            .querySelector(".lc_status_txt.lc_house_year")
            .scrollIntoView();
          break;
        default:
          break;
      }
    },
    // 更多右點擊
    more_right_Click() {},
    // 標籤右側點擊
    right_c(e) {
      console.log("標籤點擊事件");
      console.log(e);
    },
    //搜索類型請求事件
    Search_Type_event() {
      this.show_type = true;
    },
    BuildingType_event() {
      this.show_build = true;
    },
    BuildType_confirm(value, index) {
      this.show_build = false;
      this.lc_build_index = value.value;
      console.log(this.lc_build_index);
    },
    // 更改選中的建築類型
    change_BuildingType(item, index) {
      // this.lc_BuildingType_index
      var idx = this.lc_BuildingType_index.indexOf(index);
      if (idx > -1) {
        this.lc_BuildingType_index.splice(idx, 1);
        this.lc_BuildingType_KeyId.splice(idx, 1);
        //移除
        lc_orientation_KeyId.splice(idx, 1);
      } else {
        this.lc_BuildingType_index.push(index);
        this.lc_BuildingType_KeyId.push(item.KeyId);
      }
    },
    //搜索類型點擊確認事件
    SearchType_confirm(value, index) {
      // 獲取選中的值
      // console.log(value, index);
      this.lc_saveSearch_index = value.value;
      console.log(value);
      console.log(this.lc_saveSearch_index);

      this.show_type = false;
    },
    BuildType_cancel() {
      this.show_build = false;
    },
    //搜索類型點擊取消事件
    SearchType_cancel() {
      //取消選擇項
      this.show_type = false;
    },
    //搜索類型點擊點擊事件
    SearchType_change(picker, value, index) {
      console.log("SearchType_change");
      console.log(value);
      this.Type_Text = value.text;
      console.log(index);
    },
    BuildType_change(picker, value, index) {
      this.build_name = value.text;
    },
    // 更多重置
    more_rest() {
      this.active = 0;
      //清除聯繫人類型選中狀態
      this.lc_CustomIndex = "";
      // 清除狀態選中狀態
      this.RoomTypeList = [];
      // 清除房型選中狀態
      this.HouseListIndex = [];
      // 清除用途選中狀態
      this.lc_use_index = [];
      // 清除朝向選中狀態
      this.lc_orientation_index = [];
      // 清除建築面積，建築類型選中
      this.build_name = "";
      this.lc_area_min = "";
      this.lc_area_max = "";
      //清除建築類型選中
      this.lc_BuildingType_index = [];
      //清除樓層選中
      this.lc_floor_index = [];
      console.log(this.lc_floor_index);
    },
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
      console.log("更多");
      console.log(document.querySelector(".lc_drop_title"));
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
              this.RoomType = res.Result.Items;
              //  物業用途
              aplush.apis
                .SystemType({
                  Type: "3",
                })
                .then((res) => {
                  console.log("物業用途");
                  console.log(res);
                  this.HouseUse = res.Result.Items;
                  // 朝向
                  aplush.apis
                    .SystemType({
                      Type: "8",
                    })
                    .then((res) => {
                      this.lc_Orientation = res.Result.Items;
                      // 樓層
                      aplush.apis
                        .SystemType({
                          Type: "26",
                        })
                        .then((res) => {
                          this.lc_Floor = res.Result.Items;
                          //建築類型
                          aplush.apis
                            .SystemType({
                              Type: "4",
                            })
                            .then((res) => {
                              this.lc_BuildingType = res.Result.Items;
                            });
                          //樓齡
                          // TODO: 暫無樓齡接口
                          // aplush.apis.SystemType({
                          //   Type:""
                          // }).then((res)=>{
                          //     this.lc_BuildingAge=res.Result.Items;
                          // })
                        });
                    });
                });
            });
        });
    },
    show_sort() {
      console.log("this is lc sort");
      console.log(document.querySelector(".sort_btn"));
    },
    back() {
      this.$router.push("/Home");
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    // 保存Cookies
    SaveCookies() {
      console.log("保存Cookies");

      console.log(this.items[this.lc_area_left]);
      var _temp_tages_name = [];
      let _temp_items = null;
      if (this.items.length > 0)
        //通過下標查找符合條件的集合

        _temp_items = this.items[this.lc_area_left].children;
      let _temp_districtKey = this.lc_districtKey.split(",");
      if (_temp_districtKey.length > 0) {
        _temp_districtKey.forEach((lcitem) => {
          console.log("lcitem");
          console.log(lcitem);
          _temp_items
            .filter((item) => item.KeyId == lcitem)
            .forEach((item) => {
              _temp_tages_name.push(item.text);
            });
        });
      } else {
        _temp_items.filter((item) => {
          if (item.KeyId == this.lc_districtKey) {
            _temp_tages_name.push(item.text);
          }
        });
      }

      let SearchObject = {
        EstateSelectType: this.QueryType, //房源查詢類型
        AreaKeyIdStr: this.lc_districtKey, //區域選中的keyId
        //保存區域
        TagsName: _temp_tages_name,
        areaName: this.items[this.lc_area_left].Name,
        // 下標, //區域名稱
        HouseDirection:
          this.lc_orentation_keyId.length > 0 ? this.lc_orentation_keyId : "", // 朝向
        SalePriceFrom: this.lc_price_select.startPrice, //
        SalePriceTo: this.lc_price_select.endPrice,
        RentPriceFrom: this.lc_price_select_rent.startPrice,
        RentPriceTo: this.lc_price_select_rent.endPrice,
        SortField: this.sort_name, // 排序條件
        isdefault: false,
      };

      // 限制添加條數
      if (this.lc_saveSearch.length >= 3) {
        this.lc_saveSearch.pop();
      }
      console.log(SearchObject);
      //去除重複內容
      // if (this.lc_saveSearch == -1) {
      this.lc_saveSearch.unshift(SearchObject);
      // }
      //保存搜索條件
      if (this.save_cookies) {
        localStorage.setItem(
          "SearchCookies",
          JSON.stringify(this.lc_saveSearch)
        );
      }
    },
    //篩選條件使用
    baseData() {
      this.pageIndex++;
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1, //查詢類型
          Keywords: this.lc_Keywords, //查詢內容
          EstateSelectType: this.QueryType, //房源查詢類型
          AreaKeyIdStr: this.lc_districtKey, //區域選中的keyId
          PropStatusStr: this.lc_status, //房源狀態
          TrustorTypeKeyId: this.lc_trustorType, //聯繫人類型
          PropertyTypes: this.lc_PropertyTypes, //房源戶型KeyId
          PropertyUseKeyId: this.lc_PropertyUse, //物業用途KeyId
          HouseDirection:
            this.lc_orentation_keyId.length > 0
              ? this.lc_orentation_keyId.join(",")
              : this.lc_orentation_keyId.join(""), //朝向KeyId
          PropertySquareType: this.lc_build_index, // 面積查詢類型
          SquareFrom: this.lc_area_min, //面積起始值
          SquareTo: this.lc_area_max, //面積結束值
          BulidTypes:
            this.lc_BuildingType_KeyId.length > 0
              ? this.lc_BuildingType_KeyId.join(",")
              : this.lc_BuildingType_KeyId.join(""), //建築類型
          FilterType: this.lc_saveSearch_index, //篩選類型
          Filter: this.lc_filter, //不限條件搜索關鍵詞
          FloorFrom: this.lc_floor_min, //樓層起始值
          FloorTo: this.lc_floor_max, //樓層結束值
          IsOnlyTrust: "", // 是否獨家
          SalePriceFrom:
            this.lc_price_select.startPrice == ""
              ? this.saler_price_min
              : this.lc_price_select.startPrice,
          SalePriceTo:
            this.lc_price_select.endPrice == ""
              ? this.saler_price_max
              : this.lc_price_select.endPrice,
          RentPriceFrom:
            this.lc_price_select_rent.startPrice == ""
              ? this.rent_price_min
              : this.lc_price_select_rent.startPrice,
          RentPriceTo:
            this.lc_price_select_rent.endPrice == ""
              ? this.rent_price_max
              : this.lc_price_select_rent.endPrice,
          PropertyboolTag: this.lc_Tag_KeyId, //標籤類型
          SortField: this.sort_name, // 排序條件
        })
        .then((res) => {
          let _temp = res.PropertysModel;
          this.HouseList = _temp;
          console.log("打印內容");
          console.log(this.lc_area_min == null ? "false" : "true");
          //如果請求參數不為空則發送請求
          //this.lc_Keywords=="" ? this.has_search_result = false : this.has_search_result = true;
          // this.lc_districtKey=="" ? this.has_search_result = false : this.has_search_result = true;
          // js 條件多選當有一個條件為真時都為真

          // this.has_search_result =

          //   // js 一個條件為真則結果為真

          console.log("has_search_result");
          console.log(this.has_search_result);
          // js 一個條件為真則結果為真

          // this.has_search_result=res.PropertysModel.length>0?true:false;
        });
    },
    onLoad() {
      this.pageIndex++;
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
    // 區域左側選擇
    area_left_click(left_click) {
      this.lc_area_left = left_click;
      console.log("this.lc_area_left");
      console.log(this.lc_area_left);
    },
    // 區域點擊
    area_click(result_item) {
      //通過下標獲取keyId
      console.log("打印選中的結果");
      console.log(this.lcactiveId);
    },
    // 價格左側選擇
    price_left_click(left_click) {
      this.lc_price_left = left_click;
      // 根據左側顯示右側內容
      this.priceList = this.item[left_click].children;
    },
    // 价格點擊
    price_click(item, index) {
      let lc_item = item;
      let lc_index = index;

      if (this.lc_price_left === 0) {
        this.lc_price_acitve === index
          ? (this.lc_price_acitve = "")
          : (this.lc_price_acitve = lc_index);
        this.lc_price_acitve == ""
          ? (this.lc_price_select.startPrice = "")
          : (this.lc_price_select.startPrice = item.startPrice);
        this.lc_price_acitve == ""
          ? (this.lc_price_select.endPrice = "")
          : (this.lc_price_select.endPrice = item.endPrice);
      }
      if (this.lc_price_left === 1) {
        this.lc_price_acitve_two === index
          ? (this.lc_price_acitve_two = "")
          : (this.lc_price_acitve_two = lc_index);

        this.lc_price_acitve_two == ""
          ? (this.this.lc_price_select_rent.startPrice = "")
          : (this.lc_price_select_rent.startPrice = item.startPrice);
        this.lc_price_acitve_two == ""
          ? (this.lc_price_select_rent.endPrice = "")
          : (this.lc_price_select_rent.endPrice = item.endPrice);
      }
    },
    //區域重置
    reset_area() {
      this.active = "";
      this.lcactiveId = "";
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
      this.has_search_result = true;

      // this.SaveCookies();
    },
    // 價格重置
    price_reset() {
      this.lc_price_activeId = "";
      this.lc_price_acitve =-1;
      this.lc_price_acitve_two = "";
      this.saler_price_min = "";
      this.saler_price_max = "";
      this.rent_price_min = "";
      this.rent_price_max = "";

    },
    price_confirm_click() {
      this.$refs.lc_item_price.toggle();
      this.QueryType = 2;
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
      this.has_search_result = true;
      // this.SaveCookies();
    },
    price_confirm_click2() {
      this.$refs.lc_item_price.toggle();
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
      });
    },
    //房源列表排序
    house_sort() {
      aplush.apis.ListingSort().then((res) => {
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
      });
      this.$nextTick(() => {
        this.lc_sort_type = true;
      });
    },
    // 排序重置
    reset_sort() {
      this.sort_name = "";
      // this.sortIndex = "";
      // 清除選中顏色
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
      this.has_search_result = true;
      // this.SaveCookies();
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
      });
    },
    //通過標籤搜索
    tags_Search(tags_index) {
      let lc_default_result = this.lc_saveSearch.find(
        (item, index) => index == tags_index
      );
      aplush.apis
        .Listinglist({
          PageIndex: this.pageIndex,
          PageSize: 20,
          PropType: 1, //查詢類型
          EstateSelectType: lc_default_result.EstateSelectType, //房源查詢類型
          AreaKeyIdStr: lc_default_result.AreaKeyIdStr, //區域選中的keyId
          SalePriceFrom: lc_default_result.SalePriceFrom, //
          SalePriceTo: lc_default_result.SalePriceTo,
          HouseDirection: lc_default_result.HouseDirection,
          RentPriceFrom: lc_default_result.RentPriceFrom,
          RentPriceTo: lc_default_result.RentPriceTo,
          SortField: lc_default_result.SortField, // 排序條件
        })
        .then((res) => {
          let _temp = res.PropertysModel;
          this.HouseList = _temp;
        });
    },
    // 標籤點擊
    tags_Click(index,keyId) {
      this.tagsindex = index;
      // tags_Click
       this.lc_Tag_KeyId = keyId;
      //PropertyboolTag
    },
    // 聯繫人列表
    contact_list(item, index) {
      console.log("聯繫人類型");
      console.log(item);
      console.log(index);
      this.lc_CustomIndex = index;
    },
    // 狀態
    change_status(index) {
      var idx = this.RoomTypeList.indexOf(index);
      if (idx > -1) {
        this.RoomTypeList.splice(idx, 1);
      } else {
        this.RoomTypeList.push(index);
      }
      console.log('this.RoomTypeList');
      console.log(this.RoomTypeList);
    },
    change_HouseUse(index) {
      var idx = this.lc_use_index.indexOf(index);
      if (idx > -1) {
        this.lc_use_index.splice(idx, 1);
      } else {
        this.lc_use_index.push(index);
      }
    },
    change_roomtype(index) {
      var idx = this.HouseListIndex.indexOf(index);
      if (idx > -1) {
        this.HouseListIndex.splice(index, 1);
      } else {
        this.HouseListIndex.push(index);
      }
    },
    // 改變朝向
    change_orentation(item, index) {
      console.log("朝向");
      var idx = this.lc_orientation_index.indexOf(index);
      if (idx > -1) {
        this.lc_orientation_index.splice(idx, 1);
        this.lc_orentation_keyId.splice(idx, 1);
        //移除
        lc_orientation_KeyId.splice(idx, 1);
      } else {
        this.lc_orientation_index.push(index);
        this.lc_orentation_keyId.push(item.KeyId);
      }
    },
    // 改變樓層
    change_floor(item, index) {
      this.lc_floor_index = index;
      this.lc_floor_start = 0;
      var str = ">12";
      console.log("樓層開始");
      console.log(
        item.ItemValue.includes(">")
          ? (this.lc_floort_end = item.ItemValue.split(">")[0])
          : (this.lc_floor_end = item.ItemValue.split("<")[0])
      );
      console.log(this.lc_floor_end);
    },
    // 查看搜索記錄
    search_record() {
      this.$router.push("/saveSearch");
    },
  },
  //改變建築類型
  change_BuildingType(item, index) {
    // console.log('item keyId')
    // console.log(item);
    var idx = this.lc_BuildingType_index.indexOf(index);
    if (idx > -1) {
      this.lc_BuildingType_index.splice(idx, 1);
      this.lc_BuildingType_KeyId.splice(idx, 1);
    } else {
      this.lc_BuildingType_index.push(index);
      this.lc_BuildingType_KeyId.push(item.KeyId);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "index.scss";
::v-deep .van-cell {
  padding: 0;
}

.lc_tree-select ::v-deep .van-cell__value {
  position: relative;
  display: flex;
  align-items: center;
  width: 83px;
  height: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 0.5px #e2e2e2;
}
.lc_tree-select ::v-deep .van-field__control {
  padding-left: 20px;
}
::v-deep van-tree-select__content-text-hide {
  display: none;
}
</style>


