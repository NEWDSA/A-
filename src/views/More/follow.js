/*
 * @Author: luciano 
 * 更多更進
 * @Date: 2021-12-17 16:21:20 
 * @Last Modified by: Abner
 * @Last Modified time: 2022-03-04 10:21:18
 */
import aplush from "@/api/A+"; // 獲取樓詳情 //引入樓盤跟進
export default {
  data() {
    return {
      PageIndex: 1,
      PageSize: 20,
      FollowUp: [],
      columns: [
        {
          text: "全部（除系統跟進）",
        },
        {
          text: "成交結盤",
        },
        {
          text: "信息補充",
        },
      ],
    followLoading: true,
    };
  },
  mounted() {
    let lc_keyId = this.$route.query.KeyId;
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "25",
      IsDetails: "true",
      PropertyKeyId: lc_keyId,
    };
    this.followLoading=true;
    aplush.apis.ListiongFollow(params).then((res) => {
      this.FollowUp = res.PropFollows;
      this.followLoading=false;
    });
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // end 返回
    // 新增跟進
    AddFollow() {
      this.$router.push({
        path: "/AddFollow",
        query: {
          KeyId: this.$route.query.KeyId
        }
      });
    },
    // end 新增跟進
  },
};