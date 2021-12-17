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
    <van-form @submit="onSubmit">
      <div class="lc_title">主體信息</div>
      <!-- 客戶狀態 -->
      <van-row type="flex">
        <van-col span="24">
          <van-field
            readonly
            v-model="username"
            name="客戶狀態"
            label="客戶狀態"
            required
            placeholder="請選擇"
            right-icon="arrow-down"
            label-width="70"
            @click="scustomer_status = true"
          />
        </van-col>
      </van-row>
      <!-- 客戶類型 -->
      <van-row type="flex">
        <van-col>
          <van-field
            v-model="username"
            name="客戶類型"
            label="客戶類型"
            placeholder="請選擇"
            right-icon="arrow-down"
            label-width="70"
            required
            @click="Custom_type_show = true"
          />
        </van-col>
      </van-row>
      <!-- 姓名 -->
      <div style="display: flex">
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          required
          label-width="70"
          placeholder="請輸入"
        >
          <template #input>
            <input
              type="text"
              v-model="username"
              placeholder="請輸入"
              @input="onInput"
               style="width:70%"
            />
          </template>
        </van-field>
        <van-field
          v-model="username2"
          placeholder="請選擇"
          
          readonly
          @click="contact_show = true"
        >
          <template #input>
            <input
              type="text"
              v-model="username2"
              placeholder="請選擇"
    
            />
          </template>
        </van-field>
      </div>
      <van-row>
        <van-col span="12">
          <van-field
            v-model="username"
            name="座機電話1"
            label="座機電話1"
            placeholder="請選擇"
            label-width="70"
            right-icon="arrow-down"
          />
        </van-col>
        <van-col span="12">
          <van-field v-model="username" type="text" />
        </van-col>
      </van-row>
      <!-- 手提電話2 -->
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field
            v-model="username"
            name="手提電話2"
            label="手提電話2"
            placeholder="請選擇"
            label-width="70"
            right-icon="arrow-down"
          />
        </van-col>
        <van-col span="6">
          <van-field v-model="username" type="text" />
        </van-col>
        <van-col span="6">
          <van-icon
            size="24"
            class-prefix="my-icon"
            name="remove"
            color="#de4135"
          />
        </van-col>
      </van-row>
      <!-- 座機電話2 -->
      <van-row>
        <van-col span="12">
          <van-field
            v-model="username"
            name="座機電話2"
            label="座機電話2"
            placeholder="請選擇"
            right-icon="arrow-down"
            label-width="70"
          />
        </van-col>
        <van-col span="12">
          <van-field v-model="username" placeholder="" />
        </van-col>
      </van-row>
      <!-- 生日 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            name="生日"
            label="生日"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 微信 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            name="微信"
            label="微信"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- QQ -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            name="QQ"
            label="QQ"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 備註 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="備註"
            type="textarea"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 客戶需求 -->
      <van-row type="flex" justify="center" align="center">
        <van-col span="24">
          <div class="lc_title" style="margin-bottom: 20px">客戶需求</div>
        </van-col>
        <van-col span="6">
          <span style="font-size: 12px">交易類型</span>
        </van-col>
        <van-col>
          <!-- 交易類型 -->
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1" style="font-size: 12px">求購</van-radio>
            <van-radio name="2" style="font-size: 12px">求租</van-radio>
            <van-radio name="2" style="font-size: 12px">租購</van-radio>
          </van-radio-group>
          <!-- 交易類型 -->
        </van-col>
      </van-row>
      <!-- 心裡購價 -->
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field
            v-model="username"
            label="心裡購價"
            name="心裡購價"
            type="text"
            required
            label-width="70"
            placeholder=""
          />
        </van-col>
        <van-col span="10">
          <van-field v-model="username" type="text" placeholder="" />
        </van-col>
        <van-col span="2">
          <span style="font-size: 12px">萬</span>
        </van-col>
      </van-row>
      <!-- 心裡租價 -->
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field
            v-model="username"
            label="心裡租價"
            name="心裡租價"
            required
            type="text"
            label-width="70"
            placeholder=""
          />
        </van-col>
        <van-col span="10">
          <van-field v-model="username" type="text" placeholder="" />
        </van-col>
        <van-col span="2">
          <span style="font-size: 12px">元</span>
        </van-col>
      </van-row>
      <!-- 房型 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            label="房型"
            type="text"
            placeholder="請選擇"
            right-icon="arrow-down"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 面積 -->
      <van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <van-field
            label="面積"
            v-model="username"
            type="text"
            placeholder=""
            label-width="70"
          />
        </van-col>
        <van-col span="10">
          <van-field v-model="username" type="text" placeholder="" />
        </van-col>
        <van-col span="2">
          <span style="font-size: 12px">㎡</span>
        </van-col>
      </van-row>
      <!-- 朝向 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            label="朝向"
            type="text"
            placeholder="請選擇"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 樓層 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            name="樓層"
            label="樓層"
            type="text"
            placeholder="請選擇"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 裝修情況 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="username"
            label="裝修情況"
            type="text"
            placeholder="請選擇"
            label-width="70"
          />
        </van-col>
      </van-row>
      <!-- 購房原因 -->
      <van-row>
        <van-col span="24">
          <van-field
            label="購房原因"
            v-model="username"
            type="text"
            required
            placeholder="請選擇"
            label-width="70"
          />
        </van-col>
      </van-row>

      <!-- end 購房原因 -->
      <!-- 來源 -->
      <van-row>
        <van-col span="24">
          <van-field
            label="來源"
            v-model="username"
            type="text"
            required
            placeholder="請選擇"
            label-width="70"
          />
        </van-col>
      </van-row>

      <!-- end 來源 -->
      <!-- 備註 -->
      <van-row>
        <van-col span="24">
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="備註"
            type="textarea"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>

      <!-- end 備註 -->
      <!-- end 客戶需求 -->
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
            v-model="message"
            label="轉介人"
            name="轉介人"
            type="text"
            placeholder="請輸入"
            label-width="70"
          />
        </van-col>
      </van-row>

      <!-- end 轉介人 -->
      <!-- end 轉介信息 -->
      <div style="margin: 16px">
        <van-button block color="#f12945" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- end form表單 -->
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
    <!-- end 客戶狀態 -->
    <!-- 客户类型弹窗 -->
    <van-popup position="bottom" v-model="Custom_type_show">
      <van-picker
        show-toolbar
        :title="CustomerList.SysParameter.ParameterName"
        :columns="CustomType"
        @confirm="type_confirm"
        @cancel="type_cancel"
        @change="onChange"
      >
      </van-picker>
    </van-popup>
    <!-- end 客户类型弹窗 -->
    <!-- 客戶聯繫人 -->
    <van-popup position="bottom" v-model="contact_show">
      <van-sticky>
        <van-nav-bar title="選擇客戶" @click-left="customerLeft" left-arrow />
        <van-search
          v-model="search_custom"
          placeholder="請輸入搜索關鍵詞"
          @search="lc_search_custom"
        ></van-search>
      </van-sticky>
      <van-index-bar :sticky="false">
        <van-index-anchor
          :index="index.length > 0 ? index : ''"
          v-for="(item, index) in ContactList"
          :key="index"
        >
          <span>{{ index.length > 0 ? index : "" }}</span>
          <van-cell
            v-for="(citem, cindex) in item"
            :key="cindex"
            :title="citem"
            @click="click_customer(citem)"
          ></van-cell>
        </van-index-anchor>
      </van-index-bar>
    </van-popup>
    <!-- end 客戶聯繫人 -->
  </div>
</template>

<script>
  export {default} from "./add";
</script>

<style lang="scss" scoped>
@import "add.scss";
</style>