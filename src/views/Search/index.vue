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
import aplus from "@/api/A+/index";
export default {
  data() {
    return {
      // 搜索智能提示
      SearchSmart_Notice: [],
      lc_search: this.$route.query.word,
      active: 0,
      pullLoading: false,
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.SearchSmart();
  },
  methods: {
    onCancel() {
      this.lc_search = "";
      this.$router.go(-1);
    },
    // 搜索智能提示
    SearchSmart() {
      aplus.apis
        .searchSuggest({
          Name: this.lc_search,
          EstateSelectType: 3,
        })
        .then((res) => {
          this.SearchSmart_Notice = res;
          console.log(this.SearchSmart_Notice);
        });
    },
    onSearch() {
      this.SearchSmart();
    },
    lc_onLoad() {
      console.log("點擊加載");
      this.loading = false;
      this.pullLoading = false;
    },
    onPullRefresh() {
      console.log("點擊下拉");
    },
    Tabs_chage(name, title) {},
    go_House(itemText) {
      this.$router.push({
        path: "/House",
        query: {
          word: itemText,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .van-pull-refresh {
    position: relative;
    top: 20px;
    height: 100%;
  }

  .lc_content {
    font-size: 14px;
    .lc_title {
      margin-left: 15.5px;
    }
  }
}
</style>