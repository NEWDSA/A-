<template>
  <div class="container">
    <van-sticky>
      <van-nav-bar
        title="更多跟進"
        right-text="新增"
        left-arrow
        @click-left="onClickLeft"
        @click-right="AddFollow"
      />
    </van-sticky>
    <div class="lc_container">
      <div class="lc_nav">
        <span>全部(除系統跟進)</span>
        <van-icon name="arrow" />
      </div>
      <van-divider />
      <!-- 房源跟進 -->
      <van-steps
        direction="vertical"
        active-color="#646566"
        inactive-color="#646566"
      >
        <van-step
          v-for="(item, index) in FollowUp"
          :key="index"
          class="lc_step"
        >
          <template #active-icon>
            <van-icon size="10" class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <template #inactive-icon>
            <van-icon size="10" class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <span class="lc_main_title">{{ item.FollowContent }}</span>

          <div class="sub_title" style="display: flex; align-items: center">
            <article>{{ item.Follower }}</article>
            <article>{{ item.FollowType }}</article>
            <article>{{ item.FollowTime }}</article>
          </div>
        </van-step>
      </van-steps>
      <!-- end 房源跟進 -->
    </div>
    <!-- 底部彈出層 -->
    <van-popup position="bottom" v-model="show">
      <van-picker @cancel="show = false" show-toolbar :columns="columns" />
    </van-popup>
    <!-- end 底部彈出層 -->
  </div>
</template>

<script>
export {default} from './follow'
</script>

<style lang="scss" scoped >
 @import 'follow.scss'
</style>