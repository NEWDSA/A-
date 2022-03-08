/*
 * @Author: luciano 
 * @Date: 2022-02-20 11:10:32 
 * @Last Modified by: Abner
 *  上傳文件組件 封裝
 * @Last Modified time: 2022-03-03 12:30:19
 */
<template>
  <div>
    <van-uploader v-model="lc_paper"
      :max-coun="maxCount"
      :after-read="afterRead" :before-delete="beforeDelete">
        <template #preview-cover="{ file,index }">
          <div v-if="formDataTemp[index]" class="preview-cover van-ellipsis" style="padding-left:90px;width:200px">
            <van-field
          readonly
          v-model="selectImgType.text"
          required
          placeholder="請選擇"
          right-icon="arrow-down"
          @click.stop="img_type_status = true" />
            <van-field required
              @click.stop
              :old-file-name="file.name"
              v-model="formDataTemp[index].PhotoComment"
              placeholder="請輸入圖片描述"
              input-align="left"
            />
          </div>
        </template>
      </van-uploader>

      <!-- 類型選擇 -->
    <van-popup position="bottom" v-model="img_type_status">
      <van-picker
        show-toolbar
        title="類型選擇"
        :columns="imgTypeList"
        @confirm="onConfirm"
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
//導入 vant-upload 組件
export default {
  name: "lcupload",
  props: {
    formDataTemp:{
      type: Array,
      default: [],
    },
    maxCount: {
      type: Number,
      default: 1,
    },
    kind: {
      type: Number,
      default: 1,
    },
    imgType:{type:Object,default:{name:'',text:'戶型圖',value:56}}

  },
  data() {
    return {
        lc_paper:[],
        selectImgType:{text:'',value:''},
        imgTypeList:[],
        img_type_status:false
    };
  },
  mounted(){
    this.getImgTypeList();
  },
  methods: {
    getImgTypeList(){
      this.imgTypeList=[];
      aplush.apis.SystemType({
        Type: this.imgType.value
      }).then((res) => {
        res.Result.Items.forEach((item) => {
          if (item.ItemName) {
            this.imgTypeList.push({
              text: item.ItemName,
              value: item.KeyId
            })

          }
        });
        if(this.imgTypeList.length>0){
          this.selectImgType=this.imgTypeList[0]
        }
      })
    },
    onConfirm(value) {
      this.selectImgType=value;
      this.img_type_status=false;
    },
    // 刪除檔案
    beforeDelete(file, fileList) {
      if(fileList.index<this.formDataTemp.length){this.formDataTemp.splice(fileList.index, 1);}
      if(fileList.index<this.lc_paper.length){this.lc_paper.splice(fileList.index, 1);}
    },
    // 開始上傳
    afterRead(file, detail) {
      //改為文件流形式
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      aplush.apis.UploadFile(fd).then((res) => {
        this.formDataTemp.push({
          PhotoTypeKeyId: this.selectImgType.value, //圖片類型
          PhotoComment: "",
          PhotoPath: res,
          HasDefault: "N", //是否為封面
        });
      });
    },
    onError(error, file, fileList) {
      console.log(error)
    },
  },
};
</script>

<style>
</style>