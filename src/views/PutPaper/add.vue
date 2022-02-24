<template>
  <div class="lc_paper">
    <!-- 返回 -->
    <van-nav-bar left-arrow @click-left="handleClickLeft" title="新增放盤紙" />
    <div class="lc_container">
      <span>新增放盤紙</span>
      <van-form @submit="onSubmit">
        <van-cell-group style="white-space: nowrap">
          <van-cell title="放盤日期起" is-link>
            <van-field
              v-model="DepartmentName"
              placeholder="請輸入部門"
              @click="handleClick"
            />
          </van-cell>
          <van-cell title="簽署人" is-link>
            <van-field
              v-model="OnlyTrustPerson"
              placeholder="請輸入簽署人"
              @click="handleClick"
            />
          </van-cell>
          <van-cell title="放盤類型" is-link>
            <van-field
              v-model="papertype"
              placeholder="請輸入放盤類型"
              @click="handleClick"
            />
          </van-cell>
          <van-cell title="放盤日期起" is-link>
            <van-field
              v-model="EffectiveDate"
              placeholder="請輸入放盤日期起"
              @click="handleClick"
            />
          </van-cell>
          <van-cell title="放盤日期止" is-link>
            <van-field
              v-model="EffectiveDate"
              placeholder="請輸入放盤日期止"
              @click="handleClick"
            />
          </van-cell>
          <van-cell title="放盤紙編號" is-link>
            <van-field
              v-model="TrustBookNo"
              placeholder="請輸入放盤紙編號"
              @click="handleClick"
            />
          </van-cell>
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PaerList: {
        //放盤日期起
        EffectiveDate: "",
        //放盤日期止
        EffectiveDate: "",
        //租售類型
        papertype: "",
        //是否獨家
        OnlyTrustPerson: "",
        //放盤紙編號
        TrustBookNo: "",
        //售價起
        SalerBegin: "",
        //售價止
        SalerEnd: "",
        //附件路徑
        AttachmentPath: "",
        //備註
        Remark: "",
        //簽署人
        OnlyTrustPerson: "",
        

      },
    };
  },
  methods: {
    handleClickLeft() {
      this.$router.go(-1);
    },
    handleClickRight() {
      // this.$router.push("/PutPaper/PutPaper");
    },
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.lc_paper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .lc_container {
    width: 100%;
    height: 100%;
    backgorund: #fff;
  }
}
</style>