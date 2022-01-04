<template>
  <div class="contianer">
    <van-sticky>
      <van-nav-bar title="带看记录" left-arrow @click-left="onClickLeft" />
    </van-sticky>

    <van-tabs
      title-inactive-color="#333333"
      title-active-color="#de4135"
      sticky
      @click="lc_click"
    >
      <van-tab title="帶看房源記錄">
        <van-search
          v-model="search"
          placeholder="請輸入樓盤名稱/帶看時間"
          @search="onSearch"
        />
        <van-pull-refresh
          v-model="refresh"
          @refresh="onRefresh"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="沒有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in lookRecord" :key="index">
              <template slot="default">
                <div class="lc_container">
                  <div class="lc_container2">
                    <div class="lc_box1">
                      <span class="lc_span">客</span>
                      <div class="lc_box2">6</div>
                    </div>
                    <span class="lc_build_name">{{ item.EstateName }}</span>
                  </div>
                </div>
                <div class="lc_number">
                  {{ item.HouseNo }}
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="帶看客源記錄">
        <van-search
          v-model="search_customer"
          placeholder="請輸入客戶名稱/帶看時間"
          @search="onSearchCustomer"
        />
        <van-pull-refresh
          v-model="refresh_customer"
          @refresh="onRefreshCustomer"
          success-text="刷新成功"
        >
          <van-list
            v-model="loading_customer"
            :finished="finished_customer"
            finished-text="沒有更多了"
            @load="onLoadCustomer"
          >
            <van-cell v-for="(item, index) in lookCustomer" :key="index">
              <template slot="default">
                <div class="lc_customer_container" @click="onCustomerDetail(item)">
                  <template
                    v-if="
                      item.CustomerName.includes('女士') ||
                      item.CustomerName.includes('小姐') ||
                      item.CustomerName.includes('太太')
                    "
                  >
                    <img
                      class="lc_customer_img"
                      src="@/assets/icon/nonmember_woman_picture.png"
                    />
                  </template>
                  <template v-else>
                    <img
                      class="lc_customer_img"
                      src="@/assets/icon/member_man_picture.png"
                    />
                  </template>

                  <div class="lc_customer_container2">
                    <span class="lc_custom_name">{{ item.CustomerName }}</span>
                    <div class="lc_Estatename">{{ item.EstateName }}</div>
                  </div>
                  <div class="lc_seetime">
                    {{ item.TakeSeeTime | formatDate }}
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export {default} from './index'
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>