<template>
  <div class="upload">
    <van-nav-bar fixed left-arrow @click-left="goback" title="上傳現場相" />
    <div class="lc_sub_title">房屋現狀</div>
    <van-field
      v-model="house_type"
      label="裝修情況"
      placeholder="請選擇"
      readonly
      right-icon="arrow"
      @click="getType"
    />
    <van-field
      v-model="house_decoration"
      label="裝修日期"
      placeholder="請選擇"
      readonly
      right-icon="arrow"
      @click="getlc_date"
    />
    <!-- 格局变动 -->
    <van-cell-group>
      <van-cell center title="格局变动">
        <template #right-icon>
          <van-radio-group v-model="lc_radio">
            <van-radio name="1" ref="radio_keybox" />
          </van-radio-group>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 备注 -->
    <van-field
      type="textarea"
      v-model="lc_Remark"
      label="备注"
      placeholder="請輸入"
    />
    <!-- 現場相點評人 -->
    <van-field
      type="textarea"
      v-model="lc_Evaluation"
      label="現場相點評人"
      placeholder="請選擇"
    />
    <div class="lc_sub_title">相片</div>

    <div class="lc_other_paper">
      <div class="lc_other_title">戶型圖</div>
      <!-- <van-uploader
        upload-icon="plus"
        v-model="lc_paper"
        :max-count="10"
        :preview-full-image="false"
        :after-read="afterRead"
        :before-delete="beforeDelete"
      >
      </van-uploader> -->
      <lcupload
        :max-count="10"
        ref="lcuload"
        @beforeRead="beforeRead"
        @afterRead="afterRead"
        @beforeDelete="beforeDelete"
      />
    </div>

    <div class="lc_other_paper">
      <div class="lc_other_title">室內圖</div>
      <van-uploader id="lchouse_in" upload-icon="plus" v-model="lc_door" :max-count="10" :after-read="IndoorUp">
      </van-uploader>
      <!--TODO:遇到了一些問題以後繼續處理 -->
      <div class="lc_other_preview">
        <span
          ref="lcindoor"
          @lc_changes="lc_setAuto"
          :index="index"
          :items="item"
          :is="item.component"
          v-for="(item, index) in form_Data_temp"
        ></span>
      </div>
    </div>

    <!-- 房屋類型彈窗選擇 -->
    <van-popup position="bottom" v-model="popup_house_type">
      <van-picker
        title="裝修情況"
        show-toolbar
        :columns="House_Column"
        v-model="selected"
        @change="getTypeSelected"
        @confirm="confirmTypeSelected"
        @cancel="lc_cancle"
      >
      </van-picker>
    </van-popup>
    <van-popup position="bottom" v-model="popup_lc_date">
      <van-datetime-picker
        :min-date="minDate"
        :max-date="maxDate"
        type="date"
        v-model="lc_date"
        title="裝修日期"
        @confirm="lc_data_confirm"
        @change="lc_data_change"
        @cancel="lc_data_cancle"
      />
    </van-popup>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
import formattime from "@/utils/format_time";
//引入自定義組件
import lcupload from "@/components/lcUpload/index.vue";
import { CountDown } from 'vant';
export default {
  //VUE.SET

  data() {
    return {
      House_Type: {
        SysParameter: {
          ParameterName: "",
        },
      },
      lc_Hose_Type: {
        SysParameter: {
          ParameterName: "",
        },
      },
      House_Column: [],
      popup_house_type: false,
      popup_lc_date: false,
      selected: "",
      house_type: "",
      lc_date: "",
      house_decoration: "",
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2050, 0, 1),
      lc_Remark: "",
      lc_Evaluation: "",
      lc_paper: [],
      lc_door: [],
      form_Data: {},
      form_Data_temp: [],
      lc_radio: "",
      lc_index: 1,
    };
  },
  beforeMount() {
    //获取户型
    this.getHouseType();
  },
  mounted(){
  },
  components: {
    lcupload:lcupload,
  },
  methods: {
    // 獲取戶型
    getHouseType() {
      aplush.apis.SystemType({}).then((res) => {
        //獲取戶型
        this.lc_Hose_Type = res.Items;
      });
    },
    //返回
    goback() {
      this.$router.go(-1);
    },
    //獲取戶型
    //裝修情況點擊事件
    getType() {
      aplush.apis
        .SystemType({
          type: "38",
        })
        .then((res) => {
          this.House_Type = res.Result;
          this.House_Type.Items.forEach((item, index) => {
            this.House_Column.push({
              text: item.ItemName,
              ItemNo: item.ItemNo,
              ItemValue: item.ItemValue,
              FlagDefault: item.FlagDefault,
              ItemStatus: item.ItemStatus,
              AssociatedItemKeyIds: item.AssociatedItemKeyIds,
              Seq: item.Seq,
              CanDelete: item.CanDelete,
              Style: item.Style,
              KeyId: item.KeyId,
            });
          });
          this.popup_house_type = true;
        });
    },
    getlc_date() {
      this.popup_lc_date = true;
    },
    getTypeSelected(picker, value, index) {
      this.house_type = value.text;
      console.log(value);
    },
    lc_data_change(value) {
      this.house_decoration = formattime.format_time(value).substring(0, 10);
    },
    confirmTypeSelected(value) {
      this.house_type = value.text;
      this.popup_house_type = false;
    },
    lc_confirm(value) {
      console.log(value);
      this.popup_lc_date = false;
    },
    lc_data_confirm(value) {
      this.house_decoration = formattime.format_time(value).substring(0, 10);
      this.popup_lc_date = false;
    },
    lc_cancle() {
      this.popup_house_type = false;
      this.house_type = "";
    },
    lc_data_cancle() {
      this.popup_lc_date = false;
    },
    // 上傳文件至服務器
    afterRead(file,detail,lc_file) {
      //將事件傳遞給子組件
      // this.$emit("afterRead");//
      console.log(file);
      const dom = document.createElement("div");
      dom.innerHTML = `
      <input style="height:80px;" placehodler="請輸入圖片描述" type="text" id='lc${detail.index}' name="fileType" value="">
      `;
      this.$nextTick(() => {
        const input = document
          .querySelectorAll(".van-uploader__preview")
          .forEach((item, index) => {
            this.$nextTick(() => {
              item.appendChild(dom);
              // 添加 class
              item.classList.add("lc_home_file");
            });
          });

      });
      this.lc_paper=lc_file;
    },
    beforeRead(file,detail,lc_filed) {
      //改為文件流形式
      console.log(file);
      console.log(detail);
      this.lc_paper=lc_filed;

      
    },
    beforeDelete(file, detail) { 
      this.form_Data.splice(detail.index, 1);
      this.lc_paper.splice(detail.index, 1);
    },
    IndoorUp(file) {
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      //js 創建一個文本框
      

    },
  },
};
</script>
<style lang="scss" scoped >
.upload {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.preview-cover {
  position: absolute;
  top: 0;
  left: 80px;
}
.lc_other_paper {
  display: flex;
  align-items: center;
  .lc_other_title {
    margin-left: 10px;
    margin-right: 10px;
  }
}

::v-deep .van-uploader {
  margin-top: 20px;
  position: relative;
  display: flex;
  align-items: center;
}
::v-deep .van-uploader__wrapper {
  /* display: -webkit-box; */
  /* display: -webkit-flex; */
  /* display: flex; */
  /* -webkit-flex-wrap: wrap; */
  /* flex-wrap: wrap; */
  display: block !important;
}
::v-deep .van-uploader__preview-image {
  overflow: initial;
}
::v-deep .van-uploader__preview {
  display: flex;
  align-items: center;
}

.lc_sub_title {
  position: relative;
  font-size: 16px;
  color: #f12945;
  margin-left: 25px;
  margin-top: 10px;
  &::before {
    position: absolute;
    display: block;
    content: "";
    width: 3px;
    height: 16px;
    background-color: #f12945;
    border-radius: 2px;
    margin-left: -10px;
    margin-top: 2px;
  }
}
.lc_paper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  .lc_title {
    font-size: 14px;
    text-align: left;
    font-weight: bold;
  }

  .container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    height: 300px;
    overflow-y: scroll;
    background: #999999;
    // justify-content: center;
    justify-content: start;
    font-size: 14px;

    span {
      position: relative;
      display: flex;
    }

    .lc_box {
      width: fit-content;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;

      .lc_upload {
        position: relative;
        width: 106px;
        height: 107px;
        background: url(../../assets/icon/select-img.png) no-repeat;
        background-size: cover;
      }

      .lc_house {
        position: relative;
        margin-left: 10px;
        font-size: 14px;
        width: 100%;
        color: #cccccc;
      }
    }
  }
}
.lc_box {
  width: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;

  .lc_upload {
    position: relative;
    width: 50px;
    height: 50px;
    background: url("~@/assets/icon/select-img.png") no-repeat;
    background-size: cover;
  }

  .lc_house {
    position: relative;
    margin-left: 10px;
    font-size: 14px;
    width: 100%;
    color: #cccccc;
  }
}
</style>