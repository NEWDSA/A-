<template>
  <div class="contianer">
    <van-sticky>
      <van-nav-bar
        title="新增客戶"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </van-sticky>
    <!-- form表單 -->
    <div class="lc_title">主體信息</div>
    <!-- 客戶狀態 -->
    <van-row>
      <van-col span="24">
        <van-field
          readonly
          v-model="customerStatus"
          name="客戶狀態"
          label="客戶狀態"
          required
          placeholder="請選擇"
          right-icon="arrow-down"
          @click="scustomer_status = true"
        />
      </van-col>
    </van-row>
    <!-- 新增關係人 -->
    <!-- 客戶類型 -->
    <van-row type="flex">
      <van-col span="24">
        <van-field
          readonly
          v-model="customerType"
          name="客戶類型"
          label="客戶類型"
          placeholder="請選擇"
          right-icon="arrow-down"
          required
          @click="Custom_type_show = true"
        />
      </van-col>
    </van-row>
    <van-row type="flex">
      <van-col span="12">
        <van-field
          v-model="username"
          required
          label="姓名"
          name="姓名"
          required
          placeholder="請輸入"
        >
        </van-field>
      </van-col>
      <!-- 性別 -->
      <van-col span="12">
        <van-field
          class="lc_gender"
          v-model="gender"
          placeholder="請選擇"
          right-icon="arrow-down"
          readonly
          @click="gender_show = true"
        >
        </van-field>
      </van-col>
    </van-row>
    <!-- 手機 -->
    <van-row type="flex" justify="center">
      <van-col span="12">
        <van-field
          class="lc_prefix_phone"
          label="手提電話"
          placeholder="請選擇區號"
          required
          v-model="attribute"
          readonly
          right-icon="arrow-down"
          @click="area_show = true"
        >
        </van-field>
      </van-col>
      <van-col span="12">
        <van-field
          class="lc_phone"
          v-model="phone"
          type="tel"
          :rules="[
            { required: true, message: '請輸入電話號碼' },
            {
              pattern: /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^([6][8|6])\d{5}$/,
              message: '請檢查號碼',
            },
          ]"
          name=""
          placeholder="請輸入手機號"
        >
        </van-field>
      </van-col>
    </van-row>
    <!-- 座機 -->
    <van-row>
      <van-col span="24">
        <van-field
          label="座機"
          v-model="phone2"
          type="number"
          name=""
          placeholder="請輸入座機號"
        >
        </van-field>
      </van-col>
    </van-row>
    <!-- 生日 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="birthday"
          label="生日"
          placeholder="請輸入"
          right-icon="arrow-down"
          @click-right-icon="birthday_show = true"
        />
      </van-col>
    </van-row>
    <!-- 微信 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="wechat"
          label="微信"
          placeholder="請輸入"
        />
      </van-col>
    </van-row>
    <!-- QQ -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="QQ"
          name="QQ"
          label="QQ"
          placeholder="請輸入"
        />
      </van-col>
    </van-row>
    <!-- 備註 -->
    <van-row type="flex" align="center">
      <van-col span="24">
        <van-field
          v-model="remark"
          type="textarea"
          rows="2"
          autosize
          label="備註"
          placeholder="請輸入"
          maxlength="200"
          show-word-limit
        />
      </van-col>
    </van-row>
    <!-- 客戶需求 -->
    <van-row type="flex" justify="center" align="center">
      <van-col span="24">
        <div class="lc_title" style="margin-bottom: 20px">客戶需求</div>
      </van-col>
      <van-col span="24">
        <div style="display: flex">
          <span class="lc_tran_type">交易類型</span>
          <!-- 交易類型 -->
          <van-radio-group v-model="radio" direction="horizontal">
            <template v-for="(item, index) in transactionType">
              <van-radio :name="item.ItemNo" style="font-size: 12px">{{
                item.ItemName
              }}</van-radio>
            </template>
          </van-radio-group>
          <!-- 交易類型 -->
        </div>
      </van-col>
    </van-row>
    <!-- 心裡購價 -->
    <van-row
      v-show="radio === '10'"
      type="flex"
      justify="center"
      align="center"
    >
      <van-col span="12">
        <van-field
          v-model="mind_buy_price_start"
          label="心裡購價"
          name="心裡購價"
          @keydown="UpNumber"
          @keyup="UpNumber"
          type="text"
          required
          label-width="70"
          placeholder=""
        />
      </van-col>
      <van-col span="10">
        <van-field
          @keyup="UpNumber"
          @keydown="UpNumber"
          v-model="mind_buy_price_end"
          type="text"
          placeholder=""
        />
      </van-col>
      <van-col span="2">
        <span style="font-size: 12px">萬</span>
      </van-col>
    </van-row>
    <!-- 心裡租價 -->
    <van-row
      v-show="radio === '20'"
      type="flex"
      justify="center"
      align="center"
    >
      <van-col span="12">
        <van-field
          v-model="mind_rent_price_start"
          label="心裡租價"
          name="心裡租價"
          @keydown="UpNumber"
          @keyup="UpNumber"
          required
          type="text"
          label-width="70"
          placeholder=""
        />
      </van-col>
      <van-col span="10">
        <van-field
          @keydown="UpNumber"
          @keyup="UpNumber"
          v-model="mind_rent_price_end"
          type="text"
          placeholder=""
        />
      </van-col>
      <van-col span="2">
        <span style="font-size: 12px">元</span>
      </van-col>
    </van-row>
    <!-- 顯示租購價 -->
    <van-row
      v-show="radio === '30'"
      type="flex"
      justify="center"
      align="center"
    >
      <van-col span="12">
        <van-field
          v-model="mind_buy_price_start"
          @keydown="UpNumber"
          @keyup="UpNumber"
          label="心裡購價"
          name="心裡購價"
          type="text"
          required
          label-width="70"
          placeholder=""
        />
      </van-col>
      <van-col span="10">
        <van-field
          @keyup="UpNumber"
          @keydown="UpNumber"
          v-model="mind_buy_price_end"
          type="text"
          placeholder=""
        />
      </van-col>
      <van-col span="2">
        <span style="font-size: 12px">萬</span>
      </van-col>
      <van-col span="12">
        <van-field
          v-model="mind_rent_price_start"
          @keydown="UpNumber"
          @keyup="UpNumber"
          label="心裡租價"
          name="心裡租價"
          required
          type="text"
          label-width="70"
          placeholder=""
        />
      </van-col>
      <van-col span="10">
        <van-field
          @keydown="UpNumber"
          @keyup="UpNumber"
          v-model="mind_rent_price_end"
          type="text"
          placeholder=""
        />
      </van-col>
      <van-col span="2">
        <span style="font-size: 12px">元</span>
      </van-col>
    </van-row>
    <!-- 房型 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="room_type"
          readonly
          label="房型"
          type="text"
          placeholder="請選擇"
          right-icon="arrow-down"
          @click="showRoomType = true"
        />
      </van-col>
    </van-row>
    <!-- 面積 -->
    <van-row type="flex" justify="center" align="center">
      <van-col span="12">
        <van-field
          label="面積"
          v-model="area_start"
          @keydown="UpNumber"
          @keyup="UpNumber"
          type="text"
          placeholder=""
        />
      </van-col>
      <van-col span="12">
        <van-field
          @keyup="UpNumber"
          @keydown="UpNumber"
          v-model="area_end"
          type="text"
          placeholder=""
        />
      <span>㎡</span>
      </van-col>
    </van-row>
    <!-- 朝向 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="orientation_text"
          label="朝向"
          type="text"
          readonly
          placeholder="請選擇"
          right-icon="arrow-down"
          @click="orientation_show = true"
        />
      </van-col>
    </van-row>
    <!-- 樓層 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="floor"
          name="樓層"
          label="樓層"
          readonly
          type="text"
          placeholder="請選擇"
          label-width="70"
          right-icon="arrow-down"
          @click="floor_show = true"
        />
      </van-col>
    </van-row>
    <!-- 裝修情況 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="decoration"
          label="裝修情況"
          readonly
          type="text"
          placeholder="請選擇"
          right-icon="arrow-down"
          @click="decoration_show = true"
          label-width="70"
        />
      </van-col>
    </van-row>
    <!-- 購房原因 -->
    <van-row>
      <van-col span="24">
        <van-field
          label="購房原因"
          v-model="buy_reason"
          type="text"
          required
          readonly
          right-icon="arrow-down"
          @click="buy_show = true"
          placeholder="請選擇"
          label-width="70"
        />
      </van-col>
    </van-row>
    <!-- 來源 -->
    <van-row>
      <van-col span="24">
        <van-field
          label="來源"
          v-model="source_type"
          type="text"
          readonly
          required
          placeholder="請選擇"
          label-width="70"
          right-icon="arrow-down"
          @click="source_show = true"
        />
      </van-col>
    </van-row>
    <!-- 轉介信息 -->
    <van-row>
      <van-col>
        <div class="lc_title">轉介信息</div>
      </van-col>
    </van-row>
    <!-- 轉介人 -->
    <van-row>
      <van-col span="24">
        <van-field
          v-model="referrer_name"
          label="轉介人"
          name="轉介人"
          type="text"
          placeholder="請輸入"
          label-width="70"
        />
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="lc_other_btn_info">
      <van-col span="20">
        
          <van-button style="width:100% !important;"  block color="#f12945" native-type="submit"
           
            >提交</van-button
          >
        
      </van-col>
    </van-row>

    <!-- 客戶狀態 -->
    <van-popup position="bottom" v-model="scustomer_status">
      <van-picker
        show-toolbar
        :title="CustomerList.SysParameter.ParameterName"
        :columns="CustomColumn"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      >
      </van-picker>
    </van-popup>
    <!-- 客户类型弹窗 -->
    <van-popup position="bottom" v-model="Custom_type_show">
      <van-picker
        show-toolbar
        :title="CustomerList.SysParameter.ParameterName"
        :columns="CustomType"
        @confirm="type_confirm"
        @cancel="type_cancel"
        @change="Custom_TypeChange"
      >
      </van-picker>
    </van-popup>
    <!-- 客戶性別 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="gender_show"
      closeable
    >
      <div class="lc_subject_type">
        <span>主體類型</span>
      </div>
      <van-radio-group
        style="width: 95%"
        v-model="gender_radio"
        @change="gender_change"
      >
        <van-cell-group>
          <van-cell
            v-for="(item, index) in gender_title"
            :title="item.ItemName"
            :key="item.KeyId"
            @click="toogle_gender(index)"
          >
            <template #right-icon>
              <van-radio :name="item.KeyId" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 客戶生日 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="birthday_show"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @cancel="birthday_cancel"
        @confirm="birthday_confirm"
      />
    </van-popup>
    <!-- 區號 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="area_show"
    >
      <van-picker
        show-toolbar
        title="選擇區號"
        :columns="area_code"
        @confirm="area_confirm"
        @cancel="area_cancel"
        @change="area_change"
      >
      </van-picker>
    </van-popup>
    <!-- 客戶來源 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="source_show"
    >
      <van-picker
        show-toolbar
        title="選擇來源"
        :columns="customerSource"
        @confirm="source_confirm"
        @cancel="source_cancel"
        @change="source_change"
      >
      </van-picker>
    </van-popup>
    <!-- 朝向 -->
    <van-popup
      position="bottom"
      closeable
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="orientation_show"
    >
      <div class="lc_subject_type">
        <span>請選擇朝向</span>
      </div>
      <van-radio-group
        style="width: 95%"
        v-model="orientation_radio"
        @change="orientation_change"
      >
        <van-cell-group>
          <van-cell
            v-for="(item, index) in Orientation"
            :title="item.ItemName"
            :key="item.KeyId"
            @click="toogle_orientation(index)"
          >
            <template #right-icon>
              <van-radio :name="item.KeyId" ref="radio_keybox" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 房型 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="showRoomType"
    >
      <van-picker
        show-toolbar
        title="選擇房型"
        :columns="HouseType"
        @confirm="roomType_confirm"
        @cancel="roomType_cancel"
        @change="roomType_change"
      >
      </van-picker>
    </van-popup>
    <!-- 樓層 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="floor_show"
    >
      <van-picker
        show-toolbar
        title="選擇樓層"
        :columns="floor_list"
        @confirm="floor_confirm"
        @cancel="floor_cancel"
        @change="floor_change"
      >
      </van-picker>
    </van-popup>
    <!-- 裝修情況 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="decoration_show"
    >
      <van-picker
        show-toolbar
        title="選擇裝修情況"
        :columns="decoration_list"
        @confirm="decoration_confirm"
        @cancel="decoration_cancel"
        @change="decoration_change"
      >
      </van-picker>
    </van-popup>
    <!-- 購房原因 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="buy_show"
    >
      <van-picker
        show-toolbar
        title="選擇購房原因"
        :columns="buy_reasonList"
        @confirm="buy_confirm"
        @cancel="buy_cancel"
        @change="buy_change"
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
export { default } from "./add.js";
</script>

<style lang="scss" scoped>
@import "./add.scss";
</style>