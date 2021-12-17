/*
 * @Author: luciano 
 * 更多更進
 * @Date: 2021-12-17 16:21:20 
 * @Last Modified by: luciano
 * @Last Modified time: 2021-12-17 16:22:32
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
      show: false,
    };
  },
  mounted() {
    let lc_keyId = this.$route.query.KeyId;
    console.log("打印KeyId");
    console.log(lc_keyId);
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "25",
      IsDetails: "true",
      PropertyKeyId: lc_keyId,
    };

    aplush.apis.ListiongFollow(params).then((res) => {
      this.FollowUp = res.PropFollows;
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
      this.show = true;
    },
    // end 新增跟進
  },
};