<template>
    <div id="mine">
    <van-nav-bar title="我的">
  <template #right>
    <van-button plain type="info" size="mini" style="border:0;color:red;font-size:13px">保存</van-button>
    <van-button plain type="info" size="mini" @click="modify" style="border:0;color:#53a7fb;font-size:13px">修改密碼</van-button>
  </template>
</van-nav-bar>


<div id="list_m">
     <article v-for="item,index in list" :key="index" style="height:54px">
     <nav>{{item.title}}</nav>

     <nav v-if="index!=0">{{item.content}}</nav>
     <nav v-if="index===0"><img src="/icon/photo_defual_pic.png" style="width:40px;height:40px" alt=""></nav>
     </article>
</div>
    </div>
</template>



<script>
import { Toast } from 'vant';

export default {
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    modify(){
        this.$router.push('/Modify')
    }
  },
  data(){
      return{
          list:[
              {
                  title:"頭像",
                  content:"/icon/photo_defual_pic.png"
              }, {
                  title:"姓名",
                  content:"manager"
              }, {
                  title:"角色",
                  content:"電腦管理員"
              }, {
                  title:"部門",
                  content:"系統管理組"
              }, {
                  title:"部門電話",
                  content:"--"
              }, {
                  title:"郵箱",
                  content:"--"
              }, {
                  title:"手機",
                  content:"--"
              }, {
                  title:"短號",
                  content:"3018"
              }, {
                  title:"內線號碼",
                  content:"3018"
              }, {
                  title:"簽名",
                  content:"可輸入200字"
              },
          ]
      }
  }

};
</script>

<style scoped>
#mine{
    background-color: #fff;
}
#list_m article{
    align-items: center;
    margin: 0 16px;
    justify-content: space-between;
    display: flex;
}
</style>
