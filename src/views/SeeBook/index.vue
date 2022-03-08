<template>
  <div id="lc_seebook">
    <van-nav-bar fixed left-arrow @click-left="handleClickLeft" title="查冊" />
    <van-cell-group title="上傳時間">
      <van-cell>
        <van-field
          type="date"
          v-model="UploadTimeStart"
          placeholder="請輸入開始時間"
        />
        <van-field
          type="date"
          v-model="UploadTimeEnd"
          placeholder="請輸入結束時間"
        />
      </van-cell>
      <van-row justify="center" gutter="10" type="flex">
        <van-col>
          <van-button icon="search" type="primary" @click="submit_seebook"
            >查詢</van-button
          >
        </van-col>
        <van-col>
          <van-button icon="plus" type="primary" @click="e_addseebook"
            >新增查冊</van-button
          >
        </van-col>
      </van-row>
    </van-cell-group>
    <van-list v-model="loading" finished-text="没有更多了">
      <van-cell v-for="(item,index) in lc_seebook" :key="item.ImgPath" @click.stop="preview_show=true;change_preview(index);">
        <van-image width="90%" :src="item.ImgPath">
        <template v-slot:default>
          <div class="lc_pic_footer">
            <span>{{ item.CreateUserName }}</span>
            <span>{{ item.CreateTime }}</span>
          </div>
        </template>
      </van-image>
      </van-cell>
    </van-list>
    <!-- 圖片預覽組件 -->
    <van-image-preview
      @change="change_preview"
      v-model="preview_show"
      :start-position="lc_index"
      :images="images"
    >
      <template v-slot:cover>
        <div class="lc_pic_footer">
          <span>{{ lc_seebook[lc_index].CreateUserName }}</span>
          <span>{{ lc_seebook[lc_index].CreateTime }}</span>
        </div>
      </template>
    </van-image-preview>
    <!-- 新增查冊-->
    <van-dialog
      v-model="lc_add_seebook"
      title="新增查冊圖片"
      show-cancel-button
      @cancel="e_cancel_pic"
      @confirm="e_upload_pic"
    >
      <div style="display: flex; justify-content: center; padding-top: 5%">
        <van-uploader
          :after-read="afterRead"
          max-count="25"
          v-model="pic_upload"
        >
        </van-uploader>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import aplush from "@/api/A+";
import { Toast } from 'vant';
export default {
  data() {
    return {
      //上傳時間開始
      UploadTimeStart: "",
      //上傳時間結束
      UploadTimeEnd: "",
      lc_seebook: [],
      preview_show: false,
      images: [],
      lc_index: 0,
      //新增查冊
      lc_add_seebook: false,
      //圖片集合
      pic_upload: [],
      // 文件上傳
      fd: "",
      pic_reload:[],
      lc_AttachmentPath:"",
      loading: false,
      finished: false,
    };
  },
  beforeMount() {
    this.base_Data();
  },
  methods: {
    handleClickLeft() {
      this.$router.go(-1);
    },
    submit_seebook() {
      this.base_Data();
    },
    base_Data() {
      aplush.apis
        .seeBook({
          KeyId: this.$route.query.HouseKeyId,
          CreateTimeStart: this.UploadTimeStart,
          CreateTimeEnd: this.UploadTimeEnd,
        })
        .then((res) => {
          this.lc_seebook = res.Photos;
          this.show_preview();
        });
    },
    e_addseebook() {
      this.lc_add_seebook = true;
    },
    show_preview() {
      this.lc_seebook.forEach((item) => {
        this.images.push(item.ImgPath);
      });
    },
    change_preview(index) {
      this.lc_index = index;
    },
    // 文件上傳完畢事件
    afterRead(file, detail) {
      file.status = "uploading";
      file.message = "上傳中...";
      setTimeout(() => {
        file.status = "!failed";
        file.message = "上傳失敗";
      }, 10000);
      this.fd = new FormData();
      this.fd.append("file", file.file);
      this.fd.append("fileType", "file");
      console.log('file');
      console.log(file);
      //獲取 當前網頁地址

      aplush.apis.UploadFile(this.fd).then((res) => {
        this.lc_AttachmentPath = window.location.host +res;
        console.log(this.lc_AttachmentPath+'lc_luciano_test');
        this.pic_reload.push({
          PhotoTypeKeyId:"29bc4ebd-2e6f-c8df-0b2e-08d43c5194af",
          PhotoPath:this.lc_AttachmentPath
      }) 
      });
      
    },
    //上傳圖片
    e_upload_pic() {
      this.lc_add_seebook = false;
      aplush.apis
        .addSeeBook({
          KeyId:this.$route.query.HouseKeyId,
          Photos:this.pic_reload
        })
        .then((res) => {
          res.Flag==true ? Toast('添加成功'):Toast(res.ErrorMsg)
          console.log(res);
        });
    },
    // 取消上傳圖片
    e_cancel_pic() {
      this.lc_add_seebook = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#lc_seebook {
  width: 100%;
  height: 100%;
  background-color: #fff;
  ::v-deep .van-image {
    .lc_pic_footer {
      position: absolute;
      bottom: 5px;
      width: 90%;
      padding: 5px;
      background-color: rgba($color: #000000, $alpha: 0.25);
    }
  }
  ::v-deep .van-image-preview__cover {
    .lc_pic_footer {
      top: 40px;
      padding: 5px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba($color: #f0eded, $alpha: 0.25);
    }
  }
}
</style>