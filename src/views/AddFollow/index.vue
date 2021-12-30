<template>
  <div class="container">
    <!-- navbar 導航 -->
    <van-nav-bar @click-left="onClickLeft" @click-right="" class="lc_bar" title="新增跟進" right-text="提交" left-arrow />
    <!-- 跟進類型 -->
    <van-radio-group @change="ChangeCheck" v-model="exclusive">
      <span class="lc_title_">跟進類型:</span>
      <van-cell-group>
        <template v-for="(item, index) in Follow_Type">
          <van-cell :title="item.text">
            <template #right-icon>
              <van-radio :name="item.value" />
            </template>
          </van-cell>
        </template>
      </van-cell-group>
    </van-radio-group>
    <!-- 信息補充為真則顯示房源狀態 -->
    <van-cell-group>
      <van-cell
        center
        v-show="exclusive"
        title="房源狀態"
        v-if="exclusive == 'b83a80da-adaf-4eed-94ea-3534a3491a02'"
      >
        <van-field
          readonly
          v-model="status_text"
          type="text"
          placeholder="請選擇房源狀態"
          right-icon="arrow-down"
          @click-right-icon="Show_Listing_Status = true"
        />
      </van-cell>
    </van-cell-group>
    <!-- 租價 -->
    <van-cell-group>
      <van-cell
        center
        title="租價"
        v-show="
          status_keyId == '61748b2a-79f2-4482-98fb-ab331c6614fe' ||
          status_keyId === '43d15344-a09d-48c9-af93-b244a68b8247'
          || status_keyId==='d1cb2c72-4c6e-4f5c-a9e3-b763cefa87b8'
        "
      >
        <van-field v-model="price_text" type="text" placeholder="請輸入" />
        <template #extra>
          <span>元</span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 已售顯示行家成交、資料來源、交易類型、是否連車位、成交價、成交時間 -->
    <template v-if="status_keyId === '854a685f-e6a9-4389-aa04-886ae8b5107f'">
      <van-radio-group v-model="Expertdeal_Status">
        <van-cell-group>
          <span class="lc_title_">行家成交狀態:</span>
          <van-cell
            center
            :title="item.text"
            v-for="(item, index) in Expertdeal"
          >
            <template #right-icon>
              <van-radio :name="item.value" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-radio-group v-model="lc_DealType">
        <van-cell-group>
          <span class="lc_title_">資料來源:</span>
          <van-cell center title="真實成交">
            <template #right-icon>
              <van-radio name="1" ref="radio_keybox" />
            </template>
          </van-cell>
          <van-cell center title="估計成交">
            <template #right-icon>
              <van-radio name="2" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-radio-group v-model="lc_TransactionType">
        <van-cell-group>
          <span class="lc_title_">交易類型:</span>
          <van-cell center title="一手成交">
            <template #right-icon>
              <van-radio name="1" ref="radio_keybox" />
            </template>
          </van-cell>
          <van-cell center title="二手成交">
            <template #right-icon>
              <van-radio name="2" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 連車位 -->
      <van-radio-group v-model="lc_Carport">
        <van-cell-group>
          <van-cell center title="連車位">
            <template #right-icon>
              <van-radio name="1" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 成交價 -->
      <van-cell-group>
        <van-cell center title="成交價">
          <van-field v-model="Deal_Price" type="text" placeholder="請輸入" />
          <template #extra>
            <span>萬元</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 成交時間 -->
      <van-cell-group>
        <van-cell center title="成交時間">
          <van-field
            v-model="DealTime"
            readonly
            type="text"
            placeholder="請選擇成交時間"
            right-icon="arrow-down"
            @click-right-icon="Show_Deal_Time = true"
          />
        </van-cell>
      </van-cell-group>
    </template>

    <!-- 已租 -->
    <template v-if="status_keyId === '39e1a2ed-2d1e-4703-bee1-c84f8984a680'">
      <!-- 資料來源 -->
      <van-radio-group v-model="lc_DealType">
        <van-cell-group>
          <span class="lc_title_">資料來源:</span>
          <van-cell center title="真實成交">
            <template #right-icon>
              <van-radio name="1" ref="radio_keybox" />
            </template>
          </van-cell>
          <van-cell center title="估計成交">
            <template #right-icon>
              <van-radio name="2" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 成交價 -->
      <van-cell-group>
        <van-cell center title="成交價">
          <van-field v-model="Deal_Price" type="text" placeholder="請輸入" />
          <template #extra>
            <span>萬元</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 成交時間 -->
      <van-cell-group>
        <van-cell center title="成交時間">
          <van-field
            v-model="DealTime"
            readonly
            type="text"
            placeholder="請選擇成交時間"
            right-icon="arrow-down"
            @click-right-icon="Show_Deal_Time = true"
          />
        </van-cell>
      </van-cell-group>
      <!-- 租期至 -->
      <van-cell-group>
        <van-cell center title="租期至">
          <van-field v-model="Rent_Time" readonly type="text" placeholder="請選擇租期至" right-icon="arrow-down"  />
        </van-cell>
      </van-cell-group>
    </template>
    <!-- 跟進內容 -->
    <div class="lc_items" style="display: flex">
      <div class="lc_star_content" style="flex: 30%; white-space: nowrap">
        <span class="lc_star">*</span>
        <span class="lc_title">跟進內容</span>
      </div>

      <div
        class="lc_content_area"
        style="
          flex: 70%;
          font-size: 14px;
          height: auto;
          line-height: 30px;
          margin-top: 18px;
        "
      >
        <div style="flex: 70%">
          <template v-for="(item, index) in content">
            <span
              @click="ChangeCheck_Tag(item)"
              v-if="item != '0'"
              class="lc_block"
              style="flex: 20%; margin: 10px"
              >{{ item }}</span
            >
          </template>
          <van-field
            v-model="Follow_Content"
            style="flex: 20%; margin: 10px"
            type="textarea"
            maxlength="500"
            show-word-limit
            placeholder="請輸入"
          ></van-field>
        </div>
      </div>
    </div>
    <!-- 提醒TA -->
    <!-- <van-cell-group>
      <van-cell center title="提醒TA">
        <div class="lc_other_paper">
              <div
                style="
                  width: 70%;
                  margin-top: 5%;
                  margin-bottom: 5%;
                  margin-left: -5%;
                "
              >
                <van-uploader
                  v-model="lc_paper"
                  :max-count="1"
                  :after-read="afterRead"
                >
                  <div class="lc_box">
                    <div class="lc_upload"></div>
                    <div class="lc_house">上傳看房單</div>
                  </div>
                </van-uploader>
              </div>
            </div>
        <!-- <van-field v-model="Remind_TA" type="text" placeholder="請輸入" /> -->

      </van-cell>
    </van-cell-group> -->
    <!-- 更改房源狀態彈窗 -->
    <van-popup
      v-model="Show_Listing_Status"
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <van-picker
        show-toolbar
        v-model="Listing_Text"
        title="更改房源狀態"
        :columns="Listing_Stauts"
        @change="Listing_Change"
        @confirm="Listing_Confirm"
        @cancel="Listing_Cancel"
      />
    </van-popup>
    <!-- 成交時間彈出窗 -->
    <van-popup
      v-model="Show_Deal_Time"
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <van-datetime-picker
        type="date"
        v-model="Deal_Time"
        title="成交時間"
        @confirm="Deal_Time_Confirm"
        @cancel="Deal_Time_Cancel"
      />
    </van-popup>
  </div>
</template>
<script>
export { default } from "./index";
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>