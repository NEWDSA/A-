<template>
  <div class="container">
    <van-search
      show-action
      v-model="lc_search"
      @input="onSearch"
      @cancel="onCancel"
      placeholder="请输入搜索内容"
      :autofocus="true"
    >
      <template #action @click="bac">
        <span>取消</span>
      </template>
    </van-search>
    <van-tabs v-model="active" animated @change="Tabs_chage">
      <van-tab title="樓盤名稱" name="EstateName">
        <van-pull-refresh
          v-model="pullLoading"
          @refresh="onPullRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="沒有更多了"
            @load="lc_onLoad"
          >
            <div
              class="lc_content"
              v-for="(item, index) in SearchSmart_Notice.PropPrompts"
              :key="index"
            >
              <span @click="go_House(item.ItemText)" class="lc_title">{{
                item.ItemText
              }}</span>
              <van-divider></van-divider>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="棟座單元" name="BuildingName"></van-tab>
      <van-tab title="房號" name="HouseNo"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export {default} from "./index";
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>