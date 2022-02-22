<template>
  <div style="height:100%;">
    <van-nav-bar title="" cross>
      <template #left>
        <van-icon class="cross" name="cross" size="18" @click="back" />
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="main_title">首頁應用</span>
        <span class="main_sub">按住拖動調整順序</span>
      </template>
      <template #right>
        <div class="btn_eidt" @click="EditApplication">{{ AppStatus }}</div>
      </template>
    </van-nav-bar>

    <div class="lc_title">
      <van-grid>
        <draggable
          v-model="HomeApp"
          :disabled="disabled"
          class="van-grid van-hairline--top"
          @change="dragChange"
        >
          <template v-for="(item, index) in HomeApp">
            <van-grid-item
              class="lc_grid_item"
              id="lc_grid_item"
              :icon="item.Icon"
              :text="item.Name"
              :badge="item.bage"
              @click="RemoveApp(item)"
            ></van-grid-item>
          </template>
        </draggable>
      </van-grid>

      <van-nav-bar title="" left-text="推薦應用" @click-right="onClickRight">
        <template #left>
          <span class="main_title">推薦應用</span>
          <span
            class="sub_title"
            style="font-size: 9px; padding-top: 4px; color: #999999"
            >點擊添加到首頁應用</span
          >
        </template>
      </van-nav-bar>
      <van-grid>
        <template v-if="RecoApplication.length > 0">
          <template v-for="(item, index) in RecoApplication">
            <van-grid-item
              class="lc_bage"
              badge="+"
              :icon="item.Icon"
              :text="item.Name"
              @click="AddAplicaton(item)"
            />
          </template>
        </template>
        <template v-else>
          <div style="width:100%;height:100%;">
             <van-empty description="沒有推薦應用" />
          </div>
          
        </template>
      </van-grid>
    </div>
  </div>
</template>

<script>
export { default } from "./index";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
