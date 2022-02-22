<template>
  <div id="edit_house">
    <div class="lc_nav_bar">
      <van-nav-bar
        fixed
        left-text="返回"
        title="編輯房源"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="lc_title">
      <span class="lc_title_name">{{ house_detail.AllHouseInfo }}</span>
      <span class="lc_status">{{
        house_detail.Flag == true ? "有效" : "無效"
      }}</span>
    </div>
    <div class="lc_trnas_title">交易信息</div>
    <div class="trans_types">交易類型:</div>
    <van-radio-group @change="change_Trans" v-model="house_detail.TrustType">
      <van-cell-group>
        <van-cell title="出售">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="出租">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="租售">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <template v-if="house_detail.TrustType == 1">
      <van-cell-group>
        <van-cell title="售價">
          <van-field
            v-model="house_detail.SalePrice"
            placeholder="請輸入售價"
          ></van-field>
        </van-cell>
        <van-cell title="呎價">
          <van-field v-model="house_detail.SaleUnitPrice"></van-field>
        </van-cell>
        <van-cell title="房屋現狀">
          <van-field
            type="text"
            v-model="house_detail.PropertySituation"
            readonly
            @click="Show_Property_Situation = true"
          ></van-field>
        </van-cell>
        <van-cell title="起始租期">
          <van-field
            type="date"
            placeholder="請輸入起始租期"
            v-model="house_detail.StartRentDate"
          />
        </van-cell>
        <van-cell title="結束租期">
          <van-field
            type="date"
            placeholder="請輸入租期至"
            v-model="house_detail.RentToDate"
          />
        </van-cell>
        <van-cell title="出售原因">
          <van-field
            v-model="house_detail.PropertySaleReason"
            readonly
            @click="Show_Property_Sale_Reason = true"
          ></van-field>
        </van-cell>
        <van-cell title="交房時間">
          <van-field
            type="date"
            placeholder="請輸入交房時間"
            v-model="house_detail.TurnkeyDate"
          />
        </van-cell>
        <van-cell title="交房條件">
          <van-field
            v-model="house_detail.LaunchCondition"
            type="textarea"
          ></van-field>
        </van-cell>
        <!-- 來源 -->
        <div class="trans_types">來源:</div>
        <van-radio-group v-model="house_detail.PropertySourceKeyId">
          <van-cell-group>
            <template v-for="(item, index) in sourcefrom">
              <van-cell :title="item.ItemName">
                <template #right-icon>
                  <van-radio :name="item.KeyId" />
                </template>
              </van-cell>
            </template>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
    </template>
    <template v-if="house_detail.TrustType == 2">
      <van-cell-group>
        <van-cell title="租價">
          <van-field type="text" v-model="house_detail.RentPrice" />
        </van-cell>
        <!-- <van-cell title="呎租">
          <template #right-icon>
            <van-field
              type="text"
              v-model="house_detail.RentUnitPrice"
              readonly
            ></van-field>
          </template>
        </van-cell> -->
        <van-cell style="white-space: nowrap" title="租賃方式">
          <van-field
            readonly
            type="text"
            @click="show_rent_way"
            v-model="house_detail.PropertyRentType"
          />
        </van-cell>
        <van-cell style="white-space: nowrap" title="支付類型">
          <van-field
            readonly
            type="text"
            v-model="house_detail.RentPaymentType"
            @click="show_rent_payment_type"
          />
        </van-cell>
        <van-cell style="white-space: nowrap" title="房屋現狀">
          <van-field
            type="text"
            v-model="house_detail.PropertySituation"
            readonly
            @click="Show_Property_Situation = true"
          ></van-field>
        </van-cell>
        <van-cell style="white-space: nowrap" title="起始租期">
          <van-field
            type="date"
            placeholder="請輸入起始租期"
            v-model="house_detail.StartRentDate"
          />
        </van-cell>
        <van-cell style="white-space: nowrap" title="租期至">
          <van-field
            type="date"
            placeholder="請輸入租期至"
            v-model="house_detail.RentToDate"
          />
        </van-cell>
        <van-cell style="white-space: nowrap" title="出租詳情">
          <van-field
            type="textarea"
            v-model="house_detail.RentDetail"
          ></van-field>
        </van-cell>
        <van-cell style="white-space: nowrap" title="交房時間">
          <van-field type="date" v-model="house_detail.TurnkeyDate" />
        </van-cell>
        <!-- <van-cell>
          <van-field label="方便睇樓時間" type="text" v-model="" />
        </van-cell> -->
        <van-cell style="white-space: nowrap" title="交房條件">
          <van-field
            type="text"
            v-model="house_detail.LaunchCondition"
          ></van-field>
        </van-cell>
        <!-- 來源 -->
        <div class="trans_types">來源</div>
        <van-radio-group
          direction="horizontal"
          v-model="house_detail.PropertySourceKeyId"
        >
          <!-- <van-cell-group> -->
          <template v-for="(item, index) in sourcefrom">
            <van-cell :title="item.ItemName">
              <template #right-icon>
                <van-radio :name="item.KeyId" />
              </template>
            </van-cell>
          </template>
          <!-- </van-cell-group> -->
        </van-radio-group>
      </van-cell-group>
    </template>
    <template v-if="house_detail.TrustType == 3">
      <van-cell-group>
        <van-cell title="租價">
          <van-field type="number" v-model="house_detail.RentPrice" />
        </van-cell>
        <van-cell title="起始租期">
          <van-field
            readonly
            type="date"
            v-model="house_detail.StartRentDate"
          />
        </van-cell>
        <van-cell title="租期至">
          <van-field readonly type="date" v-model="house_detail.RentToDate" />
        </van-cell>
        <van-cell title="出租詳情">
          <van-field
            type="date"
            v-model="house_detail.PropertyRentLimitKeyId"
          ></van-field>
        </van-cell>
        <van-cell title="租賃方式">
          <van-field
            readonly
            type="text"
            v-model="house_detail.PropertyRentTypeKeyId"
          />
        </van-cell>
        <van-cell title="支付類型">
          <van-field
            readonly
            type="text"
            v-model="house_detail.PropertyRentPaymentTypeKeyId"
          />
        </van-cell>
        <van-cell title="交房時間">
          <van-field type="text" v-model="house_detail.TurnkeyDate" />
        </van-cell>
        <van-cell title="交房條件">
          <van-field
            type="text"
            v-model="house_detail.LaunchCondition"
          ></van-field>
        </van-cell>
        <!-- 來源 -->
        <div class="lc_trnas_title">來源</div>
        <van-radio-group
          direction="horizontal"
          v-model="house_detail.PropertySourceKeyId"
        >
          <template v-for="(item, index) in sourcefrom">
            <van-cell :title="item.ItemName">
              <template #right-icon>
                <van-radio :name="item.KeyId" />
              </template>
            </van-cell>
          </template>
        </van-radio-group>
      </van-cell-group>
    </template>

    <div class="lc_trnas_title">基本信息</div>
    <van-cell-group>
      <van-cell title="房型">
        <van-field
          @click="e_show_house_type"
          readonly
          type="text"
          v-model="house_detail.CountF"
        />
      </van-cell>
      <van-cell title="廳">
        <van-field
          @click="e_show_hall"
          readonly
          type="text"
          v-model="house_detail.CountT"
        />
      </van-cell>
      <van-cell title="衛">
        <van-field
          @click="e_show_guard"
          readonly
          type="text"
          v-model="house_detail.CountW"
        />
      </van-cell>
      <van-cell title="陽台">
        <van-field
          @click="e_show_blancoy"
          readonly
          type="text"
          v-model="house_detail.CountY"
        />
      </van-cell>
      <van-cell title="面積">
        <van-field type="text" v-model="house_detail.Square" />
      </van-cell>
      <van-cell title="實用">
        <van-field type="number" v-model="house_detail.SquareUse" />
      </van-cell>
      <van-cell title="花園">
        <van-field type="text" v-model="house_detail.SquareGarden" />
      </van-cell>
      <van-cell title="朝向">
        <van-field
          type="text"
          @click="e_show_direction"
          v-model="house_detail.HouseDirection"
        />
      </van-cell>
      <van-cell title="業主數量">
        <van-field type="number" v-model="house_detail.CommonCondition" />
      </van-cell>
      <!-- TODO:缺少建筑数量接口 -->
      <van-cell title="註冊用途">
        <van-field type="text" v-model="house_detail.PropertyUsageKeyId" />
      </van-cell>
      <van-cell title="裝修情況">
        <van-field
          type="text"
          v-model="house_detail.DecorationSituationKeyId"
        />
      </van-cell>
      <!-- 車位 -->
      <div class="lc_trnas_title">車位</div>
      <van-radio-group v-model="house_detail.ParkingTypeKeyId">
        <van-cell-group>
          <template v-for="(item, index) in car_stauts">
            <van-cell :title="item.ItemName">
              <template #right-icon>
                <van-radio :name="item.KeyId" />
              </template>
            </van-cell>
          </template>
        </van-cell-group>
      </van-radio-group>
      <!-- 標籤 -->
      <div class="trans_types">標籤</div>
      <van-checkbox-group v-model="house_detail.PropertyTagKeyIds">
        <template v-for="(item, index) in house_tags">
          <van-cell :title="item.ItemName">
            <template #right-icon>
              <van-checkbox :name="item.KeyId" />
            </template>
          </van-cell>
        </template>
      </van-checkbox-group>
      <div class="trans_types">房源屬性:</div>
      <!-- 房源屬性 -->
      <van-checkbox-group v-model="house_detail.PropertyAttributeKeyIds">
        <template v-for="(item, index) in house_attribute">
          <van-cell :title="item.ItemName">
            <template #right-icon>
              <van-checkbox :name="item.KeyId" />
            </template>
          </van-cell>
        </template>
      </van-checkbox-group>
      <van-cell style="white-space: nowrap" title="備註">
        <template #right-icon>
          <van-field
            placeholder="请输入留言"
            show-word-limit
            v-model="house_detail.Remark"
            type="textarea"
            maxlength="200"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 房屋現狀彈窗 -->
    <van-popup
      position="bottom"
      :style="{ height: 'auto' }"
      v-model="Show_Property_Situation"
    >
      <van-picker
        show-toolbar
        title="房屋現狀"
        v-model="house_detail.PropertySituation"
        :columns="column_house_status"
        @change="change_PropertySituation"
        @confirm="confirm_PropertySituation"
        @cancel="cancel_PropertySituation"
      ></van-picker>
    </van-popup>
    <!-- 出售原因彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_Property_Sale_Reason"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="出售原因"
        v-model="house_detail.PropertySaleReason"
        :columns="column_sale_reason"
        @change="change_PropertySaleReason"
        @confirm="confirm_PropertySaleReason"
        @cancel="cancel_PropertySaleReason"
      >
      </van-picker>
    </van-popup>
    <!-- 房型 popup -->
    <van-popup
      position="bottom"
      v-model="Show_house_type"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="房型"
        v-model="house_detail.CountF"
        :columns="column_house_type"
        @change="change_house_type"
        @confirm="confirm_house_type"
        @cancel="cancel_house_type"
      ></van-picker>
    </van-popup>
    <!-- 廳彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_hall"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="廳"
        v-model="house_detail.CountT"
        :columns="column_hall"
        @change="change_hall"
        @confirm="confirm_hall"
        @cancel="cancel_hall"
      ></van-picker>
    </van-popup>
    <!-- 衛彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_guard"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="衛"
        v-model="house_detail.CountW"
        :columns="column_Toilet"
        @change="change_Toilet"
        @confirm="confirm_Toilet"
        @cancel="cancel_Toilet"
      ></van-picker>
    </van-popup>
    <!-- 陽台彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_blancoy"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="陽台"
        v-model="house_detail.CountY"
        :columns="column_Balcony"
        @change="change_Balcony"
        @confirm="confirm_Balcony"
        @cancel="cancel_Balcony"
      ></van-picker>
    </van-popup>
    <!-- 租賃方式彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_rent_way"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="租賃方式"
        v-model="house_detail.PropertyRentType"
        :columns="column_rent"
        @change="change_rent_type"
        @confirm="confirm_rent_type"
        @cancel="cancel_rent_type"
      ></van-picker>
    </van-popup>
    <!-- 支付類型彈窗 -->
    <van-popup
      position="bottom"
      v-model="Show_pay_type"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        title="支付類型"
        v-model="house_detail.RentPaymentType"
        :columns="column_pay"
        @change="column_pay_change"
        @confirm="confirm_pay_type"
        @cancel="cancel_pay_type"
      ></van-picker>
    </van-popup>
    <!-- 底部button -->
    <div class="lc_fixed_btn">
      <div class="lc_button">
        <van-button type="primary" block @click="onClickSave">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
import { Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      house_detail: {},
      Trans_Type: "1",
      lc_rent_date: "",
      souce_radio: "",
      //來源
      sourcefrom: "",
      //房屋現狀
      house_status: [],
      column_house_status: [],
      //出售原因
      sale_reason: [],
      column_sale_reason: [],
      // 房型
      column_house_type: [
        {
          text: "1",
        },
        {
          text: "2",
        },
        {
          text: "3",
        },
        {
          text: "4",
        },
        {
          text: "5",
        },
        {
          text: "6",
        },
        {
          text: "7",
        },
        {
          text: "8",
        },
        {
          text: "9",
        },
      ],
      // 廳
      column_hall: [
        {
          text: "1",
        },
        {
          text: "2",
        },
        {
          text: "3",
        },
        {
          text: "4",
        },
        {
          text: "5",
        },
        {
          text: "6",
        },
      ],
      // 衛
      column_Toilet: [
        {
          text: "1",
        },
        {
          text: "2",
        },
        {
          text: "3",
        },
        {
          text: "4",
        },
        {
          text: "5",
        },
        {
          text: "6",
        },
      ],
      // 陽台
      column_Balcony: [
        {
          text: "1",
        },
        {
          text: "2",
        },
        {
          text: "3",
        },
        {
          text: "4",
        },
        {
          text: "5",
        },
        {
          text: "6",
        },
      ],
      // 租賃方式
      column_rent_type: [],
      column_rent: [],
      //支付方式
      column_pay_type: [],
      column_pay: [],
      //睇樓時間
      look_time: [],
      //房型
      house_type: [],
      // 註冊用途
      register_use: [],
      // 房源屬性
      house_attribute: [],
      // 車位類型
      car_stauts: "",
      Show_Property_Situation: false,
      //出售原因
      Show_Property_Sale_Reason: false,
      Show_house_type: false,
      Show_blancoy: false,
      Show_hall: false,
      Show_Toilet: false,
      Show_area: false,
      Show_guard: false,
      // 朝向
      Show_direction: false,
      m_tags: [],
      // 標籤
      house_tags: [],
      rent_buy_remark: "",
      Show_rent_way: false,
      //支付類型
      Show_pay_type: false,
      // 房屋現狀
      Show_Property_Situation: false,
    };
  },
  beforeMount() {
    this.baseData();
  },
  mounted() {
    this.Choose_Base();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 基礎數據
    baseData() {
      aplush.apis.ListingDetail(this.$route.query.HouseKeyId).then((res) => {
        this.house_detail = res;
        //過濾字符萬
        console.log("this.house_detail");
        console.log(this.house_detail);
        // this.house_detail.SalePrice = this.house_detail.SalePrice.replace(
        //   "萬",
        //   ""
        // );
        // this.house_detail.RentPrice = this.house_detail.RentPrice.replace(
        //   "萬",
        //   ""
        // );
        this.house_detail.SalePrice == null
          ? this.house_detail.SalePrice=0
          : (this.house_detail.SalePrice = this.house_detail.SalePrice.replace(
              "萬",
              ""
            ));
        // use repalce ways to replace the string "元/月"
        //使用正則替換掉 "元/月"
        this.house_detail.RentPrice == null
          ? this.house_detail.RentPrice=0
          : (this.house_detail.RentPrice = this.house_detail.RentPrice.replace(
              "元/月",
              ""
            ));
        console.log(this.house_detail);
        console.log("this.house_detail rentPrice");
        console.log(this.house_detail.RentPrice == null);
        //過濾面積呎
        // this.house_detail.Square = this.house_detail.Square.replace("呎", "");
        this.house_detail.Square == null
          ? this.house_detail.Square
          : (this.house_detail.Square = this.house_detail.Square.replace(
              "呎",
              ""
            ));
        //過濾實用面積
        this.house_detail.SquareUse == null
          ? this.house_detail.SquareUse
          : (this.house_detail.SquareUse = this.house_detail.SquareUse.replace(
              "呎",
              ""
            ));
        //過濾花園呎
        this.house_detail.SquareGarden == null
          ? this.house_detail.SquareGarden
          : (this.house_detail.SquareGarden =
              this.house_detail.SquareGarden.replace("呎", ""));
        this.house_detail.TrustType == null
          ? this.house_detail.TrustType
          : (this.house_detail.TrustType =
              this.house_detail.TrustType.toString());
        console.log(res);
      });
    },
    //類型選擇基本數據
    Choose_Base() {
      //axios all 並發解決所有問題
      //來源
      aplush.apis
        .SystemType({
          Type: "22",
        })
        .then((res) => {
          this.sourcefrom = res.Result.Items;
          console.log(this.sourcefrom);
          //房屋現狀
          aplush.apis
            .SystemType({
              Type: "24",
            })
            .then((res) => {
              this.house_status = res.Result.Items;
              console.log(this.house_status);
              this.house_status.forEach((item) => {
                this.column_house_status.push({
                  text: item.ItemName,
                  value: item.KeyId,
                  content: item.ItemValue,
                });
              });
              //出售原因
              aplush.apis
                .SystemType({
                  Type: "31",
                })
                .then((res) => {
                  this.sale_reason = res.Result.Items;
                  this.sale_reason.forEach((item) => {
                    this.column_sale_reason.push({
                      text: item.ItemName,
                      value: item.KeyId,
                      content: item.ItemValue,
                    });
                  });
                  //方便睇樓時間
                  aplush.apis
                    .SystemType({
                      Type: "65",
                    })
                    .then((res) => {
                      this.look_time = res.Result.Items;
                      //房型
                      aplush.apis
                        .SystemType({
                          Type: "25",
                        })
                        .then((res) => {
                          this.house_type = res.Result.Items;
                          //註冊用途
                          aplush.apis
                            .SystemType({
                              Type: "26",
                            })
                            .then((res) => {
                              this.register_use = res.Result.Items;
                              // 房源屬性
                              aplush.apis
                                .SystemType({
                                  Type: "107",
                                })
                                .then((res) => {
                                  this.house_attribute = res.Result.Items;
                                  // 车位类型
                                  aplush.apis
                                    .SystemType({
                                      Type: "30",
                                    })
                                    .then((res) => {
                                      this.car_stauts = res.Result.Items;
                                      console.log("this.car_stauts");
                                      console.log(this.car_stauts);
                                      //標籤
                                      aplush.apis
                                        .SystemType({
                                          Type: "27",
                                        })
                                        .then((res) => {
                                          this.house_tags = res.Result.Items;
                                          // 租賃方式
                                          aplush.apis
                                            .SystemType({
                                              Type: "32",
                                            })
                                            .then((res) => {
                                              this.column_rent_type =
                                                res.Result.Items;
                                              this.column_rent_type.forEach(
                                                (item) => {
                                                  this.column_rent.push({
                                                    text: item.ItemName,
                                                    value: item.KeyId,
                                                    content: item.ItemValue,
                                                  });
                                                }
                                              );
                                              // 支付類型
                                              aplush.apis
                                                .SystemType({
                                                  Type: "33",
                                                })
                                                .then((res) => {
                                                  this.column_pay_type =
                                                    res.Result.Items;
                                                  this.column_pay_type.forEach(
                                                    (item) => {
                                                      this.column_pay.push({
                                                        text: item.ItemName,
                                                        value: item.KeyId,
                                                        content: item.ItemValue,
                                                      });
                                                    }
                                                  );
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    //改變狀態
    change_Trans(e) {
      this.Trans_Type = e;
      console.log("e");
      console.log(this.house_detail.TrustType);
      console.log(this.Trans_Type == 1);
    },
    change_PropertySituation() {
      //房屋現狀
      // 將house_stauts 中的key itemvalue 改為 text
    },
    confirm_PropertySituation(value) {
      this.Show_Property_Situation = false;
      this.house_detail.PropertySituation = value.text;
    },
    cancel_PropertySituation() {
      this.Show_Property_Situation = false;
    },
    change_PropertySaleReason() {},
    // 顯示房型
    e_show_house_type() {
      this.Show_house_type = true;
    },
    // 顯示廳 hall
    e_show_hall() {
      this.Show_hall = true;
    },
    // 房型 change
    change_house_type() {},
    // 房型確認 confirm
    confirm_house_type(value) {
      console.log("房型" + value.text);
      this.Show_house_type = false;
      this.house_detail.CountF = value.text;
    },
    // 房型取消 cancel
    cancel_house_type() {
      this.Show_house_type = false;
    },
    // 確認選擇原因
    confirm_PropertySaleReason(value) {
      this.Show_Property_Sale_Reason = false;
      this.house_detail.PropertySaleReason = value.text;
    },
    // 出售原因 cancel
    cancel_PropertySaleReason() {
      this.Show_Property_Sale_Reason = false;
    },
    // 廳 change
    change_hall() {},
    // 廳 confirm
    confirm_hall(value) {
      this.Show_hall = false;
      this.house_detail.CountT = value.text;
    },
    // 廳 cancel
    cancel_hall() {
      this.Show_hall = false;
    },
    // 衛點擊
    e_show_guard() {
      this.Show_guard = true;
    },
    // 衛 change
    change_Toilet() {},
    // 衛 confirm
    confirm_Toilet(value) {
      this.Show_guard = false;
      this.house_detail.CountW = value.text;
    },
    // 衛 cancel
    cancel_Toilet() {
      this.Show_guard = false;
    },
    // 陽台 click事件
    e_show_blancoy() {
      this.Show_blancoy = true;
    },
    //  陽台 change
    change_Balcony() {},
    // 陽台 confirm
    confirm_Balcony(value) {
      this.Show_blancoy = false;
      this.house_detail.CountY = value.text;
    },
    // 陽台 cancel
    cancel_Balcony() {
      this.Show_blancoy = false;
    },
    e_show_direction() {
      this.Show_direction = true;
    },
    // 租賃方式
    show_rent_way() {
      this.Show_rent_way = true;
    },
    change_rent_type(value) {
      console.log("value", value);
      this.house_detail.PropertyRentType = value.text;
    },
    confirm_rent_type(value) {
      console.log("value", value);
      this.house_detail.PropertyRentType = value.text;
      this.Show_rent_way = false;
    },
    cancel_rent_type() {
      this.Show_rent_way = false;
    },
    cancel_rent_type() {
      this.Show_rent_way = false;
    },
    //支付類型
    show_rent_payment_type() {
      this.Show_pay_type = true;
    },
    confirm_pay_type(value) {
      this.Show_pay_type = false;
      console.log("this.house_detail.RentPaymentType");
      console.log((this.house_detail.RentPaymentType = value.text));
    },
    cancel_pay_type() {
      this.Show_pay_type = false;
    },
    column_pay_change() {},
    confirm_PropertySituation(value) {
      this.Show_Property_Situation = false;
      this.house_detail.PropertySituation = value.text;
    },
    cancel_PropertySituation() {
      this.Show_Property_Situation = false;
    },
    change_PropertySituation() {},
    onClickSave() {
      console.log("this.house_detail");
      //根據 TrustType 類型進行判斷 1、出售 2、出租 3、租售
      if (this.house_detail.TrustType == 1) {
        aplush.apis
          .editListing({
            KeyID: this.$route.query.HouseKeyId,
            Square: this.house_detail.Square, //面積
            SquareUse: this.house_detail.SquareUse, //實用面積
            CountF: this.house_detail.CountF, //房型
            CountT: this.house_detail.CountT, //廳
            CountW: this.house_detail.CountW, //衛
            CountY: this.house_detail.CountY, //陽台
            // SalePrice: this.house_detail.SalePrice, // 售價
            SaleTrust: {
              //使用 replace 方法 區掉字符 萬

              SalePrice: this.house_detail.SalePrice,
            },
            SaleUnitPrice: this.house_detail.SaleUnitPrice, // 呎價
            PropertySituation: this.house_detail.PropertySituation, //房屋現狀
            StartRentDate: this.house_detail.StartRentDate, //起始租期
            RentToDate: this.house_detail.RentToDate, //結束租期
            PropertySaleReason: this.house_detail.PropertySaleReason, //出售原因
            TurnkeyDate: this.house_detail.TurnkeyDate, //交房時間
            LaunchCondition: this.house_detail.LaunchCondition, // 交房條件
            SquareGarden: this.house_detail.SquareGarden, //花園
            HouseDirectionKeyId: this.house_detail.HouseDirectionKeyId, //朝向
            CommonCondition: this.house_detail.CommonCondition, //業主數量
            PropertyUsageKeyId: this.house_detail.PropertyUsageKeyId, //註冊用途
            DecorationSituationKeyId:
              this.house_detail.DecorationSituationKeyId, //裝修情況
            ParkingTypeKeyId: this.house_detail.ParkingTypeKeyId, //車位
            PropertyTagKeyIds: this.house_detail.PropertyTagKeyIds, //標籤
            PropertyAttributeKeyIds: this.house_detail.PropertyAttributeKeyIds, //房源屬性
            Remark: this.house_detail.Remark, //備註
            TrustType: this.Trans_Type,
            SaleTrust: {
              SalePrice: this.house_detail.SalePrice,
            },
            RentTrust: {
              RentPrice: this.house_detail.RentPrice,
            },
          })
          .then((res) => {
            res.Flag == true ? Toast("編輯成功") : Toast(res.ErrorMsg);
          });
      }

      if (this.house_detail.TrustType == 2) {
        aplush.apis
          .editListing({
            KeyID: this.$route.query.HouseKeyId,
            RentTrust: {
              RentPrice: this.house_detail.RentPrice,
            },
            SaleTrust: {
              //使用 replace 方法 區掉字符 萬

              SalePrice: this.house_detail.SalePrice,
            },
            PropertyRentTypeKeyId: this.house_detail.PropertyRentTypeKeyId, //租賃方式
            PropertyRentPaymentTypeKeyId:
              this.house_detail.PropertyRentPaymentTypeKeyId, //支付類型
            PropertySituationKeyId: this.house_detail.PropertySituationKeyId, //房屋現狀
            StartRentDate: this.house_detail.StartRentDate, //起始租期
            StartRentDate: this.house_detail.StartRentDate, //租期至
            RentDetail: this.house_detail.RentDetail, //出租詳情
            TurnkeyDate: this.house_detail.TurnkeyDate, //交房時間
            LaunchCondition: this.house_detail.LaunchCondition, //交房條件
            PropertySourceKeyId: this.house_detail.PropertySourceKeyId, //來源
            CountF: this.house_detail.CountF, //房型
            CountT: this.house_detail.CountT, //廳
            CountW: this.house_detail.CountW, //衛
            CountY: this.house_detail.CountY, //陽台
            Square: this.house_detail.Square, //面積
            SquareUse: this.house_detail.SquareUse, //實用
            SquareGarden: this.house_detail.SquareGarden, //花園
            HouseDirection: this.house_detail.HouseDirection, //朝向
            CommonCondition: this.house_detail.CommonCondition, //業主數量
            PropertyUsageKeyId: this.house_detail.PropertyUsageKeyId, //註冊用途
            DecorationSituationKeyId:
              this.house_detail.DecorationSituationKeyId, //裝修情況
            ParkingTypeKeyId: this.house_detail.ParkingTypeKeyId, //車位
            PropertyTagKeyIds: this.house_detail.PropertyTagKeyIds, //標籤
            PropertyAttributeKeyIds: this.house_detail.PropertyAttributeKeyIds, //房源屬性
            Remark: this.house_detail.Remark,
            TrustType: this.house_detail.TrustType,
          })
          .then((res) => {
            console.log(res);
            res.Flag == true ? Toast("編輯成功") : Toast(res.ErrorMsg);
          });
      }
      if (this.house_detail.TrustType == 3) {
        aplush.apis
          .editListing({
            KeyID: this.$route.query.HouseKeyId,
            SaleTrust: {
              SalePrice: this.house_detail.SalePrice,
            },
            RentTrust: {
              RentPrice: this.house_detail.RentPrice,
            },
            StartRentDate: this.house_detail.StartRentDate, //起始租期
            RentToDate: this.house_detail.RentToDate, //租期至
            PropertyRentLimitKeyId: this.house_detail.PropertyRentLimitKeyId, //出租詳情
            PropertyRentTypeKeyId: this.house_detail.PropertyRentTypeKeyId, //租賃方式
            PropertyRentPaymentTypeKeyId:
              this.house_detail.PropertyRentPaymentTypeKeyId, //支付類型
            PropertyRentPaymentTypeKeyId:
              this.house_detail.PropertyRentPaymentTypeKeyId, //交房時間
            LaunchCondition: this.house_detail.LaunchCondition, //交房條件
            PropertySourceKeyId: this.house_detail.PropertySourceKeyId, //來源
            CountF: this.house_detail.CountF, //房型
            CountT: this.house_detail.CountT, //廳
            CountW: this.house_detail.CountW, //衛
            CountY: this.house_detail.CountY, //陽台
            Square: this.house_detail.Square, //面積
            SquareUse: this.house_detail.SquareUse, //實用
            SquareGarden: this.house_detail.SquareGarden, //花園
            HouseDirection: this.house_detail.HouseDirection, //朝向
            CommonCondition: this.house_detail.CommonCondition, //業主數量
            PropertyUsageKeyId: this.house_detail.PropertyUsageKeyId, //註冊用途
            DecorationSituationKeyId:
              this.house_detail.DecorationSituationKeyId, //裝修情況
            ParkingTypeKeyId: this.house_detail.ParkingTypeKeyId, //車位
            PropertyTagKeyIds: this.house_detail.PropertyTagKeyIds, //標籤
            PropertyAttributeKeyIds: this.house_detail.PropertyAttributeKeyIds, //房源屬性
            Remark: this.house_detail.Remark,
            TrustType: this.house_detail.TrustType,
          })
          .then((res) => {
            console.log(res);
            res.Flag == true ? Toast("編輯成功") : Toast(res.ErrorMsg);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#edit_house {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow-x: hidden;
  .lc_nav_bar {
    position: relative;
    height: 50px;
  }
  .lc_title {
    .lc_title_name {
      font-size: 16px;
      text-align: left;
      margin: 5px;
    }
    .lc_status {
      color: #f85151;
      margin: 5px;
    }
  }
  .lc_trnas_title {
    margin-left: 18px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #f21313;
    &::before {
      position: relative;
      display: inline-block;
      content: "";
      background: #eb1029;
      bottom: -1px;
      width: 3px;
      height: 10px;
      margin-right: 5px;
    }
  }
  .trans_types {
    position: relative;
    left: 10px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .lc_container {
    margin-left: 15px;
  }
  .lc_fixed_btn {
    height: 70px;
    .lc_button {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>