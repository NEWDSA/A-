/*
 * @Author: luciano 
 * @Date: 2022-02-20 11:10:32 
 * @Last Modified by: luciano
 *  上傳文件組件 封裝
 * @Last Modified time: 2022-02-20 22:01:06
 */
<template>
  <div>
    <van-uploader
      v-model="lc_paper"
      :max-coun="maxCount"
      :after-read="afterRead"
    />
  </div>
</template>

<script>
//導入 vant-upload 組件
export default {
  name: "lcupload",
  props: {
    maxCount: {
      type: Number,
      default: 1,
    },
    kind: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
        lc_paper:[]
    };
  },
  computed: {},
  methods: {
    // 刪除檔案
    beforeDelete(file, fileList) {
      this.$emit("beforeDelete", file, fileList);
    },
    // 開始上傳
    afterRead(file, detail) {
      //改為文件流形式
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      console.log(detail);

      //創建 dom

      this.$emit("afterRead", file, detail, this.lc_paper);
    },
    // beforeDelete(file, detail) {
    //   this.form_Data.splice(detail.index, 1);
    //   this.lc_paper.splice(detail.index, 1);
    // },
    // 上傳成功
    // afterRead(file, fileList) {
    //   this.$emit("afterRead", file, fileList);
    // },
    // 上傳失敗
    onError(error, file, fileList) {
      this.$emit("onError", error, file, fileList);
    },
  },
};
</script>

<style>
</style>