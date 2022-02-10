<template>
  <div class="upload">
    <van-nav-bar left-arrow @click-left="goback" title="上傳現場相" />
    <div>房屋現狀</div>
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
          <van-radio name="1" ref="radio_keybox" />
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
    <div>相片</div>
    <div class="lc_other_paper">
      <div
        style="width: 70%; margin-top: 5%; margin-bottom: 5%; margin-left: -5%"
      >
        <van-uploader v-model="lc_paper" :max-count="1" :after-read="afterRead">
          <div class="lc_box">
            <div class="lc_upload"></div>
            <div class="lc_house">上傳看房單</div>
          </div>
        </van-uploader>
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
export default {
  data() {
    return {
      House_Type: {
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
      lc_paper: []
    };
  },
  methods: {
    //返回
    goback() {
      this.$router.go(-1);
    },
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
    afterRead(file) {
      //改為文件流形式
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      console.log(file.name);
      aplush.apis.UploadFile(fd).then((res) => {
        this.lc_AttachmentPath=res;
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
        width: 50px;
        height: 50px;
        background: url("/assets/icon/select-img.png") no-repeat;
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
        background: url("/icon/select-img.png") no-repeat;
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