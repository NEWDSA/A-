<template>
  <div id="message">
    <div class="lc_nav_bar">
      <van-nav-bar fixed title="消息" />
    </div>
    <van-search
      fixed
      class="search"
      style="width: 100%"
      v-model="SecondMessagerName"
      @click="search_traget"
      placeholder="輸入姓名／手機/目標樓盤"
    />
    <template v-if="mgsList.length > 0" v-for="(item, index) in mgsList">
      <div class="message-item">
        <div class="message_container" @click="details(item)">
          <div class="message_list">
            <van-badge
              v-show="item.NotReadCount == 0 ? false : true"
              :content="item.NotReadCount"
            >
              <van-image
                class="message_head"
                round
                :src="item.SecondMessagerImageUrl"
                style="border-radius: 50%"
              />
            </van-badge>
            <van-image
              v-show="item.NotReadCount == 0 ? true : false"
              class="message_head"
              round
              style="border-radius: 50%"
            />
          </div>

          <div class="message_list_main">
            <div class="message_list_content">
              <div class="message_list_other">
                {{ item.SecondMessagerName }}
              </div>
              <div class="message_list_content_text">
                <!-- 時間判斷、判斷是否為今天 -->
                {{ item.LastMsgTime | time }}
              </div>
            </div>
            <div class="message_list_time">
              {{ item.LastMsgContent }}
            </div>
          </div>
        </div>
      </div>
      <!-- 显示暂无消息 -->
    </template>
    <template v-if="mgsList.length==0">
      <!-- <div v-if="mgsList.length == 0"> -->
        <van-empty image="search" description="沒有相關結果" />
      <!-- </div> -->
    </template>
  </div>
</template>
<script>
export { default } from "./index";
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>