/*
 * @Author: luciano 
 * 搜索
 * @Date: 2021-12-17 16:25:11 
 * @Last Modified by:   luciano 
 * @Last Modified time: 2021-12-17 16:25:11 
 */
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
