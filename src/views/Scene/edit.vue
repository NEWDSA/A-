<template>
  <div class="upload">
    <van-sticky>
      <div class="lc_navbar">
        <van-nav-bar fixed left-arrow @click-left="goback" title="編輯現場相片" />
      </div>
    </van-sticky>
    <div class="lc_sub_title">裝修情況</div>
    <van-field v-model="house_type" label="裝修情況" placeholder="請選擇" readonly required right-icon="arrow" @click="getType" />
    <van-field v-model="house_decoration" label="裝修日期" placeholder="請選擇" readonly right-icon="arrow" @click="getlc_date" />
    <!-- 格局变动 -->
    <van-field label="格局變動" required>
      <template #input>
        <van-radio-group v-model="lc_radio" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="0">否</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <!-- 备注 -->
    <van-field type="textarea" v-model="lc_Remark" label="备注" placeholder="請輸入" />
    <!-- 現場相點評人 -->
    <van-field type="textarea" v-model="lc_Evaluation" label="現場相點評" placeholder="請輸入點評" />
    <div class="lc_sub_title">相片</div>

    <div class="lc_other_paper">
      <div class="lc_other_title">戶型圖</div>
      <lcupload :max-count="10" :img-type="{name:'house',text:'戶型圖',value:56}" :form-data-temp="form_Data.house" />

    </div>

    <div class="lc_other_paper">
      <div class="lc_other_title">室內圖</div>
      <lcupload :max-count="10" :img-type="{name:'indoor',text:'室內圖',value:2}" :form-data-temp="form_Data.indoor" />
    </div>

    <div class="lc_other_paper">
      <div class="lc_other_title">小区圖</div>
      <lcupload :max-count="10" :img-type="{name:'xiaoqu',text:'小区圖',value:1}" :form-data-temp="form_Data.xiaoqu" />
    </div>

    <!-- 提交按鈕 -->
    <div style="position: relative; width: 100%; height: 50px">
      <van-button style="position: fixed; width: 100%; bottom: 0" type="primary" class="lc_submit" :disabled="submitIng" @click="lc_submit">提交</van-button>
    </div>

    <!-- 房屋類型彈窗選擇 -->
    <van-popup position="bottom" v-model="popup_house_type">
      <van-picker title="裝修情況" show-toolbar :columns="House_Column" v-model="selected" @change="getTypeSelected" @confirm="confirmTypeSelected" @cancel="lc_cancle"></van-picker>
    </van-popup>
    <van-popup position="bottom" v-model="popup_lc_date">
      <van-datetime-picker :min-date="minDate" :max-date="maxDate" type="date" v-model="lc_date" title="裝修日期" @confirm="lc_data_confirm" @change="lc_data_change" @cancel="lc_data_cancle" />
    </van-popup>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
import formattime from "@/utils/format_time";
//引入自定義組件
import lcupload from "@/components/lcUpload/index.vue";
import { CountDown, Toast } from "vant";
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
      house_type_value: "",
      lc_date: "",
      house_decoration: "",
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2050, 0, 1),
      lc_Remark: "",
      lc_Evaluation: "",
      lc_door: [],
      form_Data: { house: [], indoor: [], xiaoqu: [] },
      form_Data_temp: [],
      lc_radio: "0",
      lc_index: 1,
      submitIng: false,
    };
  },
  beforeMount() {
    //获取户型
    //this.getHouseType();
  },
  mounted() {this.onLoadRealData();},
  components: {
    lcupload: lcupload,
  },
  methods: {
    onLoadRealData() {
      aplush.apis.ListingPhotosByrealId({ KeyId: this.$route.query.real_id }).then((res) => {
        console.log(res)
      });
    },
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
      this.house_type_value = value.value;
      console.log(value);
    },
    lc_data_change(value) {
      this.house_decoration = formattime.format_time(value).substring(0, 10);
    },
    confirmTypeSelected(value) {
      this.house_type = value.text;
      this.house_type_value = value.value;
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
      this.house_type_value = "";
    },
    lc_data_cancle() {
      this.popup_lc_date = false;
    },
    IndoorUp(file) {
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      aplush.apis.UploadFile(fd).then((res) => {
        //請求現場相接口
        aplush.apis
          .SystemType({
            Type: "2",
          })
          .then((res) => {});
      });
    },
    beforeDelete_IndoorUp() {},
    beforeRead_IndoorUp() {},
    lc_submit() {
      if (
        this.$route.query.KeyId == undefined ||
        this.$route.query.KeyId.length < 10
      ) {
        Toast.fail("無效房源ID，不能提交");
        return;
      }
      if (
        this.$route.query.KeyId == undefined ||
        this.$route.query.KeyId.length < 10
      ) {
        Toast.fail("無效房源ID，不能提交");
        return;
      }
      this.submitIng = true;
      aplush.apis
        .ListingPhotoAdd({
          KeyId: this.$route.query.KeyId, //房源ID
          DecorationSituationKeyId: this.house_type_value, //裝修情況
          DecorationDate: this.house_decoration, //裝修日期
          RealSurveyComment: this.lc_Remark, //備註
          RoomTypeChangeComment: this.lc_Evaluation, //現場點評
          HasRoomTypeChange: this.lc_radio, //是否格局變動
          Photos: [
            ...this.form_Data.house,
            ...this.form_Data.indoor,
            ...this.form_Data.xiaoqu,
          ],
        })
        .then((res) => {
          res.Flag == true ? Toast("提交成功") : Toast("提交失敗");
          this.submitIng = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped >
.upload {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .lc_navbar {
    height: 70px;
  }
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