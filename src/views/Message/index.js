/*
 * @Author: luciano 
 * 消息
 * @Date: 2021-12-17 16:16:48 
 * @Last Modified by: luciano
 * @Last Modified time: 2022-02-11 14:11:07
 */
import aplush from "@/api/A+";
export default {
  data() {
    return {
      //消息列表
      mgsList: [],
      SecondMessagerName: "",
      PageSize: 20,
      PageIndex: 1,
      search: "",

    }
  },
  //   過濾器
  filters: {
    time(time) {

      //獲取今天日期
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let today_date = year + "-" + month + "-" + day;
      //判斷獲取的時間是否為今天
      if (time.substring(0, 10) == today_date) {
          //返回時間加自定義字符
            return '今天'+time.substring(11, 16);
        // return time.substring(11, 16);
      } else {
          return time.substring(0, 10);
      }
    }

  },
  mounted() {
    this.getMsg();
  },
  methods: {
    details(item) {
      console.log('i want to see details');
      this.$router.push({
        path: '/Message/details',
        query: {
          id: item.KeyId, //消息對象KeyID
          name: item.SecondMessagerName
        }
      })
    },
    //獲取消息內容
    getMsg(){
      aplush.apis.getMsg({
        SecondMessagerName: this.SecondMessagerName,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      }).then(res => {
        this.mgsList = res.Messages;
        console.log('show ');
        console.log(res)
  
      })
    },
    search_traget(){
      aplush.apis.getMsg({
        SecondMessagerName: this.SecondMessagerName,
        PageIndex: this.PageIndex,
        PageSize: this.PageSize
      }).then(res => {
        this.mgsList = res.Messages;
        console.log('show ');
        console.log(res)
  
      })
    }
  }
}
