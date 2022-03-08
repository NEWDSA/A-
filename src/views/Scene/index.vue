<template>
  <div class="lc_scene">
    <van-sticky>
    <van-nav-bar
      left-arrow
      :left-text="navbar_left_text"
      :title="navbar_title"
      :right-text="navbar_right_text"
      @click-left="navbar_left_click"
      @click-right="navbar_right_click"
    />
    </van-sticky>
    <van-swipe-cell
      v-for="item in scee_list"
      :key="item.KeyId"
      :before-close="beforeClose"
    >
      <template #left>
        <van-button
          style="margin: 40px auto"
          square
          type="primary"
          text="编辑"
          @click.stop="$router.push({path:'/EditScene',query:{real_id:item.KeyId}})"
        />
      </template>
      <div class="collapse">
        <div class="lc_collapse_items" @click.stop="getPhotosByrealId(item.KeyId)">
          <div class="lc_collapse_items_box">
            <span class="first"> 部門: </span>
            <span>{{ item.DepartmentName }}</span>
          </div>
          <div class="lc_collapse_items_box">
            <span class="first"> 業務員: </span>
            <span>{{ item.RealSurveyPerson }}</span>
          </div>
          <div class="lc_collapse_items_box">
            <span class="first"> 照片數量: </span>
            <span>{{ item.PhotoCount }}</span>
          </div>
          <div class="lc_collapse_items_box">
            <span class="first"> 錄入日期: </span>
            <span>{{ item.RealSurveyTime }}</span>
          </div>
        </div>
      </div>
      <template #right>
        <van-button
          style="margin: 40px auto"
          square
          type="danger"
          text="删除"
        />
      </template>
    </van-swipe-cell>
    <div class="lc_sub_title">戶型圖</div>
    <div class="collapse">
      <div class="lc_collapse_items">
        <p v-if="housePhotos==undefined || housePhotos.length<1" style="text-align:center">無照片記錄</p>
        <ul class="photo-ul" v-else>
          <li v-for="(item,index) in housePhotos" :key="item.ImgPath">
            <van-image @click.stop="showImagePreview(housePhotos,index)" fit="cover" :src="item.ImgPath" />
          </li>
        </ul>
      </div>
    </div>
    <div class="lc_sub_title">室內圖</div>
    <div class="collapse">
      <div class="lc_collapse_items">
        <p v-if="inDoorPhotos==undefined || inDoorPhotos.length<1" style="text-align:center">無照片記錄</p>
        <ul class="photo-ul" v-else>
          <li v-for="(item,index) in inDoorPhotos" :key="item.ImgPath">
            <van-image @click.stop="showImagePreview(inDoorPhotos,index)" fit="cover" :src="item.ImgPath" />
          </li>
        </ul>
      </div>
    </div>
    <div class="lc_sub_title">小區圖</div>
    <div class="collapse">
      <div class="lc_collapse_items">
        <p v-if="xiaoquPhotos==undefined || xiaoquPhotos.length<1" style="text-align:center">無照片記錄</p>
        <ul class="photo-ul" v-else>
          <li v-for="(item,index) in xiaoquPhotos" :key="item.ImgPath">
            <van-image @click.stop="showImagePreview(xiaoquPhotos,index)" fit="cover" :src="item.ImgPath" />
          </li>
        </ul>
      </div>
    </div>
    <van-image-preview v-model="image_preview.show" :start-position="image_preview.index" :images="imageUrls" @change="onChangeImagePreview">
      <template v-slot:index>{{ image_preview.images[image_preview.index].ImgDescription }}</template>
    </van-image-preview>
    <van-dialog v-model="scee_dialog_show" :showCancelButton="false" confirmButtonText="关闭" show-cancel-button>
      <van-swipe :autoplay="3000" indicator-color="white" :vertical="true" style="margin:15px 15px 0px 15px;max-height: 200px;" @change="onChangeSwipe">
        <van-swipe-item v-for="(item,index) in scee_dialog_image" :key="item.ImgPath">
          <van-image @click.stop="showImagePreview(scee_dialog_image,index)" fit="cover" :src="item.ImgPath" />
        </van-swipe-item>
      </van-swipe>
    </van-dialog>
    <van-overlay :show="loading" @click="loading = false">
    <div style="display: flex;align-items: center;justify-content: center;height: 100%;" @click.stop>
      <van-loading style="width: 80px;height: 80px;display: flex;align-items: center;justify-content: center;background-color: #fff;border-radius: 5px;" color="#1989fa" />
    </div>
  </van-overlay>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
export default {
  data() {
    return {
      navbar_left_text: "",
      navbar_right_text: "上傳",
      navbar_title: "現場相記錄",
      active: "现场相",
      scee_list: [], //現場相記錄数据集合
      photos_list:[],//現場所有相處集合
      image_preview:{
        show: false,
        index: 0,
        images: [],
      },
      scee_real_image:{

      },
      scee_dialog_show:false,
      scee_dialog_image:[],
      current:0,
      loading:true
    };
  },
  created() {
    this.getSceneList();
    this.getAllPhotos();
  },
  computed:{
    imageUrls:function(){
      return this.image_preview.images.map((item) =>{return item.ImgPath});
    },
    housePhotos:function(){
      return this.photos_list.filter((v)=>{return v.ImgClassId==1;});
    },
    inDoorPhotos:function (){
      return this.photos_list.filter((v)=>{return v.ImgClassId==2;});
    },
    xiaoquPhotos:function(){
      return this.photos_list.filter((v)=>{return v.ImgClassId==3;});
    }
  },
  methods: {
    onChangeSwipe(index) {
      this.current = index;
    },
    onChangeImagePreview(index) {
      this.image_preview.index = index;
    },
    navbar_left_click() {
      this.$router.go(-1);
    },
    navbar_right_click() {
      // this.$router.go(-1);
      this.$router.push({
        path: "/AddScene",
        query: { KeyId: this.$route.query.KeyId },
      });
    },
    showImagePreview(temList,temIndex){
      this.image_preview.show=true;
      this.image_preview.images=temList;
      this.image_preview.index=temIndex;
    },
    getSceneList() {
      //獲取房源實勘列表
      aplush.apis
        .ListingSurvey({ KeyId: this.$route.query.KeyId })
        .then((res) => {
          //獲取戶型
          this.scee_list = res.RealSurveys;
        });
    },
    getPhotosByrealId(temRealId){
      //根据实勘ID获取实勘图片
      this.loading=true;
      if(this.scee_real_image[temRealId]==undefined){
        aplush.apis.ListingPhotosByrealId({ KeyId: temRealId }).then((res) => {
          this.scee_real_image[temRealId] = res.Photos;
          this.showImagePreview(this.scee_real_image[temRealId],0)
          this.loading=false;
          this.current=0;
        });
      }else{
        this.showImagePreview(this.scee_real_image[temRealId],0)
        this.loading=false;
        this.current=0;
      }
      
    },
    getAllPhotos(){
      //獲取房源現場所有相處集合
      aplush.apis
        .ListingAllPhoto({ KeyId: this.$route.query.KeyId })
        .then((res) => {
          this.photos_list = res.Photos;
          this.loading=false;
        });
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          // 跳轉到編輯頁面
          this.$router.push({
            path: "/EditScene",
          });
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          }).then(() => {
            instance.close();
            // 刪除對應頁面
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
.photo-ul{
  display: flex;
  justify-content:space-between;
  flex-direction:row;
  flex-wrap: wrap;
}
.photo-ul li{
    width: 32%;
  }
.photo-ul li img{max-width: 100%;max-height: 100%;cursor: pointer;}
.lc_scene {
  background-color: #f3f3f3;
  ::v-deep .van-swipe-cell__wrapper {
    display: flex;
    justify-content: center;
  }
  .lc_sub_title {
    position: relative;
    font-size: 16px;
    color: #f12945;
    padding: 10px 10px 10px 20px;
    background: #ffffff;
    &::before {
      position: absolute;
      display: block;
      content: "";
      width: 3px;
      height: 16px;
      background-color: #f12945;
      border-radius: 2px;
      margin-left: -10px;
      margin-top: 3px;
    }
  }
  .collapse {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    margin: 10px auto 10px auto;
    background-color: #ffffff;
    border-radius: 10px;
    .title {
      font-size: 16px;
      padding: 10px;
    }
    .lc_container {
      width: 100%;
      padding: 10px;
    }
    .lc_collapse_items {
      position: relative;
      width: 100%;
      margin: 5px;
      display: flex;
      text-align: left;
      align-items: center;
      flex-wrap: wrap;
      .lc_collapse_items_box {
        width: 50%;
        display: flex;
        line-height: 36px;
      }
      .first {
        font-weight: 700;
        color: #333;
      }
      span {
        font-size: 14px;
        margin: 5px;
      }
    }
  }
}
</style>
