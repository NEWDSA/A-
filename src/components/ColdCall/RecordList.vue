<template>
  <div>
    <van-cell
      title="拨号日期"
      is-link
      arrow-direction="down"
      :value="selectDate"
      @click="showCalendar = true"
      label="请选择拨号日期"
    />
    <van-calendar
      v-model="showCalendar"
      type="range"
      @confirm="onSelectDate"
      :min-date="selectMinDate"
      :max-date="new Date()"
      :allow-same-day="true"
    />
    <van-divider />

    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group inset v-for="(item, index) in list" :key="index">
        <van-cell title="姓名" :value="item.name" />
        <van-cell
          :title="item.phoneNumber"
          is-link
          title-style="color:blue"
          @click="on_callPhone(item)"
          arrow-direction="top"
        >
          <template #right-icon>
            <van-icon name="phone" class="search-icon"></van-icon>
          </template>
        </van-cell>
        <van-cell title="拨号日期" :value="item.ModifiedDate" />
        <van-cell title="状况" :value="item.Status" />
        <van-cell :value="item.Remark" />
        <van-divider />
      </van-cell-group>
    </van-list>

    <van-popup
      v-model="showCallPhoneDialog"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-divider />

      <van-cell title="姓名" :value="phoneData.name" />
      <van-cell title="电话" :value="phoneData.phoneNumber" />

      <van-radio-group v-model="phoneData.Status" direction="horizontal">
        <van-radio name="电话无效">无效</van-radio>
        <van-radio name="有兴趣">有兴趣</van-radio>
        <van-radio name="无兴趣">无兴趣</van-radio>
        <van-radio name="无人接听">无人接听</van-radio>
      </van-radio-group>

      <van-field
        v-model="phoneData.Remark"
        rows="5"
        autosize
        label="备注"
        type="textarea"
        placeholder="请输入备注"
      />

      <van-button hairline type="info" size="large" @click="on_modifyColdCall"
        >储存</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import {
  getColdCallList,
  callPhone,
  modifyColdCall,
} from "@/api/ColdCall/index";
import { mapGetters } from "vuex";
export default {
  name: "RecordList",
  data() {
    return {
      selectMinDate: new Date(2020, 0, 1),
      selectMaxDate: new Date(),
      showCalendar: false,
      showCallPhoneDialog: false,
      selectDate: "",
      phoneData: {},
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 1,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onSelectDate(date) {
      let self = this;
      const [start, end] = date;
      self.showCalendar = false;
      self.selectDate = `${self.formatDate(start)} - ${self.formatDate(end)}`;
      self.finished = false;
      self.list = [];
      self.pageIndex = 1;
      self.onLoad();
    },
    async onLoad() {
      let self = this;
      let pageSize = 20;
      self.loading = true;
      let startDate = self.selectDate.split(" - ")[0];
      let endDate = self.selectDate.split(" - ")[1];
      let params = {
        staffNo: self.userInfo.StaffNo,
        startTime: startDate,
        endTime: endDate,
        PageSize: pageSize,
        PageIndex: self.pageIndex,
        Orderby: "desc",
        OrderField: "ModifiedDate",
      };

      const coldcallList = await getColdCallList(params);
      if (coldcallList) {
        if (self.list && self.list.length > 0) {
          coldcallList.result.forEach((item) => {
            self.list.push(item);
          });
        } else {
          self.list = coldcallList.result;
        }
      }
      // 加载状态结束
      self.loading = false;
      if (coldcallList.total <= self.pageIndex++ * pageSize) {
        // 数据全部加载完成
        self.finished = true;
      }
    },
    // 存储拨号后的状态与备注
    async on_modifyColdCall() {
      let self = this;
      let params = {
        detailsId: self.phoneData.id,
        status: self.status,
        remark: self.status_msg,
      };
      // 存储后重新刷新待拨号列表
      modifyColdCall(params).then(()=> {
        self.on_load();
        self.showCallPhoneDialog = false;
        self.phoneData = {};
      });
    },
    // 拨号
    on_callPhone(item) {
      let self = this;
      self.showCallPhoneDialog = true;
      self.phoneData = item;
      let params = {
        staffNo: self.userInfo.StaffNo,
        tel: item.phoneNumber,
      };
      callPhone(params);
    },
  },
  // mounted() {
  //     this.onLoad();
  // },
};
</script>