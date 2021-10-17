<template>
  <div>
    <van-cell
      arrow-direction="down"
      is-link
      @click="on_showDialog"
      v-if="!hasPhoneData"
      title="获取资料"
      value="点击获取"
    ></van-cell>
    <van-popup
      v-model="showGetNewDataDialog"
      position="top"
      :style="{ height: '45%' }"
    >
      <van-cell />
      <van-cell
        title="省"
        is-link
        arrow-direction="down"
        :value="provinceValue.value"
        @click="showProvince = true"
      />
      <van-popup v-model="showProvince" round position="bottom">
        <van-picker
          show-toolbar
          :columns="provinceData"
          @cancel="showProvince = false"
          @confirm="onProvinceConfirm"
        />
      </van-popup>
      <van-cell
        title="市"
        is-link
        arrow-direction="down"
        :value="cityValue.value"
        @click="showCity = true"
      />
      <van-popup v-model="showCity" round position="bottom">
        <van-picker
          show-toolbar
          :columns="cityData"
          @cancel="showCity = false"
          @confirm="onCityConfirm"
        />
      </van-popup>

      <van-cell
        title="小区"
        is-link
        arrow-direction="down"
        :value="projectValue.value"
        @click="showProject = true"
      />
      <van-popup v-model="showProject" round position="bottom">
        <van-picker
          show-toolbar
          :columns="projectData"
          @cancel="showProject = false"
          @confirm="onProjectConfirm"
        />
      </van-popup>
      <van-field name="checkboxGroup">
        <template #input>
          <van-checkbox v-model="isVip" shape="square">银行VIP</van-checkbox>
          <van-checkbox v-model="isCompany" shape="square"
            >企业法人</van-checkbox
          >
          <van-checkbox v-model="isCarOwner" shape="square">车主</van-checkbox>
        </template>
      </van-field>
      <van-cell
        title="获取方式"
        is-link
        arrow-direction="down"
        :value="dataModeValue"
        @click="showDataMode = true"
      />
      <van-popup v-model="showDataMode" round position="bottom">
        <van-picker
          show-toolbar
          :columns="getDataModeOptions"
          @cancel="showDataMode = false"
          @confirm="onDataModeConfirm"
        />
      </van-popup>
      <van-field name="checkboxGroup">
        <template #input>
          <van-button
            hairline
            type="primary"
            size="large"
            @click="on_getNewContactList"
            >获取新资料</van-button
          >
        </template></van-field
      >
    </van-popup>
    <van-cell-group inset v-for="(item, index) in coldCallList" :key="index">
      <van-cell title="姓名" :value="item.name" />
      <van-field name="checkboxGroup">
        <template #input>
          <van-checkbox v-model="item.isVIP" :disabled="true" shape="square"
            >银行VIP</van-checkbox
          >
          <van-checkbox v-model="item.isCompany" :disabled="true" shape="square"
            >企业法人</van-checkbox
          >
          <van-checkbox
            v-model="item.isCarOwner"
            :disabled="true"
            shape="square"
            >车主</van-checkbox
          >
        </template>
      </van-field>
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
      <van-cell :value="item.Remark" />
      <van-divider />
    </van-cell-group>
    <van-popup
      v-model="showCallPhoneDialog"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-divider />
      <van-cell title="姓名" :value="phoneData.name" />
      <van-cell title="电话" :value="phoneData.phoneNumber" />
      <van-radio-group v-model="status" direction="horizontal">
        <van-radio name="电话无效">无效</van-radio>
        <van-radio name="有兴趣">有兴趣</van-radio>
        <van-radio name="无兴趣">无兴趣</van-radio>
        <van-radio name="无人接听">无人接听</van-radio>
      </van-radio-group>
      <van-field
        v-model="status_msg"
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
  getLocationLookUpData,
  getNewContactList,
  getContactList,
  modifyColdCall,
  callPhone,
} from "@/api/ColdCall/index";
import { mapGetters } from "vuex";
export default {
  name: "RecordList",
  data() {
    return {
      showGetNewDataDialog: false,
      showCallPhoneDialog: false,
      hasPhoneData: false,
      showProvince: false,
      status: "无兴趣",
      status_msg: "",
      provinceValue: {},
      showCity: false,
      cityValue: {},
      showProject: false,
      projectValue: {},
      showDataMode: false,
      dataModeValue: "按日期最新获取",
      isVip: false, // 银行VIP
      isCompany: false, // 企业法人
      isCarOwner: false, // 车主
      locationData: [],
      provinceData: [], // 省下拉
      cityData: [], // 市下拉
      projectData: [], // 小区下拉
      getDataModeOptions: ["按日期最新获取", "按最少次数获取"],
      coldCallList: [],
      phoneData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 根据省，获取市的数据，如果没省则返回全部市数据
    getCityData(province) {
      let self = this;
      if (province != "") {
        let citylist = self.locationData.find(
          (val) => val.title == province
        ).list;
        self.cityData = citylist.map(function (item) {
          return (
            item.title +
            " <span style='color:red'>" +
            item.used +
            "</span> / " +
            item.total
          );
        });
      } else {
        // 市 下拉框
        self.cityData.push(
          self.locationData[0].title +
            " <span style='color:red'>" +
            self.locationData[0].used +
            "</span> / " +
            self.locationData[0].total
        );
        self.locationData.forEach(function (item) {
          item.list.forEach(function (cityItem) {
            if (cityItem.title != "全部") {
              self.cityData.push(
                cityItem.title +
                  " <span style='color:red'>" +
                  cityItem.used +
                  "</span> / " +
                  cityItem.total
              );
            }
          });
        });
      }
    },
    // 根据市，获取小区的数据，如果没市则返回全部小区数据
    getProjectData(city) {
      let self = this;
      // 省数据
      //let province = '';//self.provinceValue.substring(0, self.provinceValue.indexOf(" "));
      if (city != "" && city != "全部") {
        let citylist = self.locationData.find(
          (val) => val.title == (self.provinceValue.key ?? "全部")
        ).list;
        let projectlist = citylist.find((val) => val.title == city).list;
        self.projectData = projectlist.map(function (item) {
          return (
            item.title +
            " <span style='color:red'>" +
            item.used +
            "</span> / " +
            item.total
          );
        });
      } else {
        // 小区 下拉框
        self.projectData.push(
          self.locationData[0].title +
            " <span style='color:red'>" +
            self.locationData[0].used +
            "</span> / " +
            self.locationData[0].total
        );
        self.locationData.forEach(function (item) {
          item.list.forEach(function (cityItem) {
            cityItem.list.forEach(function (projectItem) {
              if (projectItem.title != "全部") {
                self.projectData.push(
                  projectItem.title +
                    " <span style='color:red'>" +
                    projectItem.used +
                    "</span> / " +
                    projectItem.total
                );
              }
            });
          });
        });
      }
    },
    // 省下拉框选中事件
    onProvinceConfirm(value) {
      let self = this;
      self.provinceValue = this.getValue(value);
      self.getCityData(self.provinceValue.key);
      self.cityValue = {};
      self.projectValue = {};
      self.showProvince = false;
    },
    // 市下拉框选中事件
    onCityConfirm(value) {
      let self = this;
      self.cityValue = self.getValue(value);
      self.getProjectData(self.cityValue.key);
      //self.projectValue = "";
      self.projectValue = {};
      self.showCity = false;
    },
    // 小区下拉框选中事件
    onProjectConfirm(value) {
      let self = this;
      self.projectValue = this.getValue(value);
      self.showProject = false;
    },
    // 获取方式下拉框选中事件
    onDataModeConfirm(value) {
      this.dataModeValue = value;
      this.showDataMode = false;
    },
    // 获取新记录
    on_getNewContactList(values) {
      let self = this;
      let params = {
        province: self.provinceValue.key ?? "全部",
        city: self.cityValue.key ?? "全部",
        project: self.projectValue.key ?? "全部",
        staffNo: self.userInfo.StaffNo,
        OrderBy: self.dataModeValue == "按日期最新获取" ? "desc" : "asc",
        OrderField: self.dataModeValue == "按日期最新获取" ? "id" : "ColdCallCount",
        isCompany: self.isCompany,
        isVIP: self.isVip,
        isCarOwner: self.isCarOwner,
      };

      self.$toast({
        duration: 0,
        message: "加载中...",
        type: "loading",
        forbidClick: true,
      });

      getNewContactList(params).then((result) => {
        self.$toast.clear(); //清除加载效果
        if (result.length > 0) {
          self.on_load();
          self.showGetNewDataDialog = false;
        } else {
          self.$toast({
            message: "数据获取失败，请确认号码池号码是否足够！",
          });
        }
      });
    },
    getValue(val) {
      let self = this;
      //过滤HTML标签
      var reg = /<[^<>]+>/g;
      let value = val.replace(reg, "");
      let key = val.substring(0, val.indexOf(" "));
      return { key: key, value: value };
    },
    // 获取电话 窗口显示事件
    async on_showDialog() {
      let self = this;
      if(self.locationData.length > 0){
        self.showGetNewDataDialog = true;
        return;
      }
       self.$toast({
        duration: 0,
        message: "加载中...",
        type: "loading",
        forbidClick: true,
      });

      self.locationData = await getLocationLookUpData();
      self.showGetNewDataDialog = true;
      // 省 下拉框
      self.provinceData = self.locationData.map(function (item) {
        return (
          item.title +
          " <span style='color:red'>" +
          item.used +
          "</span> / " +
          item.total
        );
      });

      self.getCityData("");
      self.getProjectData("");
      self.$toast.clear(); //清除加载效果
    },
    // 页面加载事件
    async on_load() {
      let self = this;
      self.coldCallList = await getContactList(self.userInfo.StaffNo);
      self.hasPhoneData = self.coldCallList.length > 0;
    },
    // 存储拨号后的状态与备注
    async on_modifyColdCall() {
      let self = this;
      let params = {
        detailsId: self.phoneData.id,
        status: self.status,
        remark: self.status_msg,
      };
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
      self.status_msg = "";
      let params = {
        staffNo: self.userInfo.StaffNo,
        tel: item.phoneNumber,
      };
      callPhone(params);
    },
  },
  mounted() {
    this.on_load();
  },
};
</script>