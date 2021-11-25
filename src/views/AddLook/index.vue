<template>
  <div class="container">
    <van-sticky>
      <van-nav-bar
        title="錄入帶看"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </van-sticky>
    <div
      class="lc_mian_title"
      v-for="(item, index) in Follow_house"
      :key="index"
    >
      <div>
        <span class="lc_takinfo" :key="index">{{ item.title }}</span>
        <van-button
          type="primary"
          color="#f12945"
          size="small"
          @click="popup_house = true"
          >{{ item.sub_title }}</van-button
        >
        <span class="lc_title" @click="AddFollow(item.other_title)">{{
          item.other_title
        }}</span>
      </div>

      <div
        style="width: 100%; display: flex; margin-left: 10px; margin-top: 10px"
      >
        <span class="lc_taksee">帶看類型</span>
        <!-- <div class="lc_radio_group">
          <van-radio-group direction="horizontal" v-model="type">
            <van-radio name="20">
              看售
              <template #icon="props">
                <template v-if="props.checked">
                  <van-icon
                    class-prefix="my-icon"
                    name="radio-checked"
                    color="#d91616"
                    size="15.5"
                  />
                </template>
                <template v-else>
                  <van-icon
                    class-prefix="my-icon"
                    size="15.5"
                    name="radio-unchecked"
                  />
                </template>
              </template>
            </van-radio>
            <van-radio name="10">
              看租
              <template #icon="props">
                <template v-if="props.checked">
                  <van-icon
                    class-prefix="my-icon"
                    name="radio-checked"
                    color="#d91616"
                    size="15.5"
                  />
                </template>
                <template v-else>
                  <van-icon
                    class-prefix="my-icon"
                    size="15.5"
                    name="radio-unchecked"
                  />
                </template>
              </template>
            </van-radio>
          </van-radio-group>
        </div> -->
      </div>
    </div>

    <div class="lc_others_sales">
      <span class="lc_sales">售價</span>
      <van-field type="text" placeholder="請輸入"></van-field>
      <span>萬元</span>
    </div>
    <div class="lc_take">
      <div style="display: flex; align-items: center">
        <span style="white-space: nowrap; margin-left: 10px">帶看時間</span>
        <van-field
          v-model="take_time_data"
          type="text"
          placeholder="請選擇"
          right-icon="arrow-down"
          @click-right-icon="take_time = true"
        ></van-field>
      </div>
    </div>
    <!-- 睇樓紙 -->
    <div class="lc_other_paper">
      <span class="lc_taksee"> 睇樓紙 </span>
      <div style="width: 70%">
        <van-uploader v-model="lc_paper" :max-count="1" :after-read="afterRead">
          <div class="lc_box">
            <div class="lc_upload"></div>
            <div class="lc_house">上傳看房單</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <!-- 陪看人 -->
    <div class="lc_follow">
      <span class="lc_title">陪看人</span>
      <van-button
        type="primary"
        color="#f12945"
        size="small"
        @click="lc_Escort = true"
        >添加</van-button
      >
    </div>
    <div class="lc_foll_contianer">
      <template v-for="(item, index) in temp_follow">
        <span @click="remove_follow(index)" class="lc_foll_person" :key="index"
          >{{ item }}<van-icon size="14" class="lc_remove" name="cross"
        /></span>
      </template>
    </div>
    <!-- 客戶反饋 -->
    <div class="lc_cusback">
      <span class="lc_title">客戶反饋</span>
      <van-field
        v-model="lc_feedback"
        type="textarea"
        placeholder="請輸入反饋內容..."
        :rows="3"
        :maxlength="200"
        show-word-limit
      ></van-field>
    </div>
    <!-- 下步計劃 -->
    <div class="lc_next">
      <span class="lc_title">下步計劃</span>
      <van-field
        label-width="60"
        v-model="lc_next_plan"
        type="textarea"
        placeholder="請輸入下步計劃..."
        :rows="3"
        :maxlength="200"
        show-word-limit
      ></van-field>
    </div>
    <!-- 提醒ta -->
    <!-- <div class="lc_follow">
      <span class="lc_title">提醒Ta</span>
      <van-button
        type="primary"
        color="#f12945"
        size="small"
        @click="lc_Remind = true"
        >添加</van-button
      >
    </div> -->
    <!-- 提醒時間 -->
    <!-- <div class="lc_notime">
      <div class="lc_contianer">
        <span>提醒時間</span>
        <div>
          <van-field type="text" @click-right="notice_time = true">
            <template #right-icon>
              <img src="/icon/cander.png" />
            </template>
          </van-field>
        </div>
      </div>
    </div> -->
    <!-- 提交 -->
    <div class="lc_submit">
      <van-button
        type="primary"
        color="#f12945"
        size="small"
        @click="onClickSave"
        >提交</van-button
      >
    </div>
    <!-- 提醒時間彈出日曆 -->
    <van-popup position="bottom" v-model="notice_time">
      <van-datetime-picker
        v-model="lc_data"
        type="date"
        title="選擇提醒日期"
        placeholder="請選擇提醒時間"
        @confirm="confirmPicker"
      ></van-datetime-picker>
    </van-popup>
    <!-- 選擇房源彈窗 -->
    <van-dialog
      v-model="popup_house"
      :title="'選擇房源/樓盤'"
      :custom-style="{ width: '90%', height: '50%' }"
      show-cancel-button
    >
      <van-form>
        <van-radio-group
          v-model="lc_radio"
          @change="change_select"
          direction="horizontal"
        >
          <div
            style="
              width: 50%;
              display: flex;
              text-align: center;
              justify-content: center;
            "
          >
            <van-radio name="1">一手樓盤</van-radio>
          </div>
          <div
            style="
              width: 50%;
              display: flex;
              text-align: center;
              justify-content: center;
            "
          >
            <van-radio name="0">二手房源</van-radio>
          </div>
        </van-radio-group>
        <template v-if="lc_radio == 0">
          <div class="lc_house_two_hand">
            <van-field
              label-class="lc_label"
              label-width="70"
              :border="false"
              v-model="Propertyname"
              type="text"
              label="樓盤名稱"
            >
            </van-field>
            <van-field
              label-class="lc_label"
              label-width="70"
              :border="false"
              v-model="lc_block_unit"
              type="text"
              label="棟座單元"
            >
            </van-field>
            <van-row type="flex">
              <van-col span="12">
                <div class="lc_label_container">
                  <span>房號</span>
                  <van-field :border="false" v-model="lc_house_No" type="text">
                  </van-field>
                </div>
              </van-col>
              <van-col span="12">
                <div
                  class="lc_label_container"
                  style="display: flex; align-items: center"
                >
                  <span
                    style="
                      font-size: 16px;
                      white-space: nowrap;
                      margin-left: 10px;
                    "
                    >樓層</span
                  >
                  <van-field :border="false" v-model="lc_floor" type="text">
                    <template #right-icon>
                      <span class="lc_title_common">層</span>
                    </template>
                  </van-field>
                </div>
              </van-col>
            </van-row>

            <van-field
              label-width="70"
              label-class="lc_label"
              :border="false"
              v-model="lc_house_type"
              type="text"
              label="房型"
            >
            </van-field>
          </div>
        </template>
        <template v-else>
          <van-search
            v-model="lc_search"
            label="樓盤名稱"
            placeholder="請輸入楼盘名称"
            @search="onSearch"
            show-action
          >
            <template #action>
              <van-button
                type="primary"
                size="small"
                color="#f12945"
                @click="onSearch"
                >搜索</van-button
              >
            </template>
          </van-search>
          <van-sticky>
            <van-cell
              style="background-color: #dddddd"
              title="樓盤信息"
              value="操作"
            />
          </van-sticky>
          <van-pull-refresh
            v-model="pullLoading"
            @refresh="take_onRefresh"
            success-text="刷新成功"
            class="lc_pull_down"
          >
            <van-list
              v-model="take_loading"
              :finished="take_finished"
              finished-text="沒有更多了"
              @load="take_onLoad"
            >
              <template>
                <van-checkbox-group v-model="ck_house" ref="checkboxGroup">
                  <van-cell-group>
                    <van-cell
                      v-for="(item, index) in lc_Take_look"
                      :title="item.EstateName"
                      :key="index"
                      @click="toogle(index)"
                    >
                      <template #right-icon>
                        <van-checkbox
                          :name="item.EstateName"
                          ref="checkboxes"
                        />
                      </template>
                    </van-cell>
                  </van-cell-group>
                </van-checkbox-group>
              </template>
            </van-list>
          </van-pull-refresh>
        </template>
      </van-form>
    </van-dialog>
    <!-- 添加陪看人 -->
    <van-dialog
      v-model="lc_Escort"
      show-cancel-button
      @cancel="cancel_follow"
      @confirm="confrim_follow"
    >
      <van-sticky>
        <van-search
          placeholder="搜索陪看人信息"
          @search="onSearch_follow"
          v-model="lc_follow_search"
        ></van-search>
      </van-sticky>
      <div class="lc_van_scroll">
        <van-checkbox-group v-model="lc_follow_ck" @change="follow_change">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in PeopleInfo.UserDepartmentDatas"
              :title="item.ResultName"
              :key="index"
              @click="toogle_follow(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item.ResultName" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-dialog>
    <!-- 添加提醒人 -->
    <van-dialog
      v-model="lc_Remind"
      show-cancel-button
      @cancel="cancel_remind"
      @confirm="confrim_remind"
    >
      <template #title>
        <span>添加提醒人</span>
      </template>
      <template #default>
        <div class="lc_contact">
          <div
            class="lc_contact_container"
            @click="popup_contact_event('聯繫人')"
          >
            <span class="lc_title">聯繫人</span>
            <div class="lc_icon_container">
              <div>
                <van-icon
                  size="14"
                  class-prefix="my-icon"
                  color="#de4135"
                  name="plus-border"
                />
              </div>
            </div>
          </div>
          <div class="lc_contact_add">
            <template v-for="(item, index) in temp_contact">
              <div
                class="lc_contact_add_container"
                :key="index"
                @click="popup_contact_event(item)"
              >
                <span class="lc_title"
                  >{{ item }}
                  <van-icon size="14" class="lc_remove" name="cross" />
                </span>
              </div>
            </template>
          </div>
          <div
            class="lc_contact_container"
            @click="popup_contact_event('聯繫部門')"
          >
            <span class="lc_title">聯繫部門</span>
            <div class="lc_icon_container">
              <div>
                <van-icon
                  size="14"
                  class-prefix="my-icon"
                  color="#de4135"
                  name="plus-border"
                />
              </div>
            </div>
          </div>
          <div class="lc_contact_add">
            <template v-for="(item, index) in temp_department">
              <div
                class="lc_contact_add_container"
                :key="index"
                @click="popup_contact_event(item)"
              >
                <span class="lc_title"
                  >{{ item }}
                  <van-icon size="14" class="lc_remove" name="cross" />
                </span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </van-dialog>
    <!-- popuop 選擇聯繫人 -->
    <van-popup
      v-model="popup_contact"
      position="bottom"
      closeable
      close-icon-position="bottom-left"
      :custom-style="{ height: '50%' }"
    >
      <van-form>
        <van-search
          :placeholder="AddType == '聯繫人' ? '搜索聯繫人' : '搜索部門'"
          @search="onSearch_contact"
          v-model="lc_contact_search"
        ></van-search>
        <template v-if="AddType == '聯繫人'">
          <van-checkbox-group
            v-model="lc_conatact_ck"
            class="lc_contact_scroll"
            @change="contact_chage"
          >
            <van-cell-group>
              <van-cell
                v-for="(item, index) in lc_contact.UserDepartmentDatas"
                :title="item.ResultName"
                :key="index"
                @click="toogle_contact(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item.ResultName" ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </template>
        <template v-else>
          <van-checkbox-group
            v-model="lc_department_ck"
            class="lc_contact_scroll"
            @change="department_chage"
          >
            <van-cell-group>
              <van-cell
                v-for="(item, index) in lc_department.UserDepartmentDatas"
                :title="item.ResultName"
                :key="index"
                @click="toogle_department(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item.ResultName" ref="checkboxes1" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </template>

        <!-- 條件判斷 -->
        <!-- end 條件判斷 -->
      </van-form>
    </van-popup>
    <!-- 帶看時間 -->
    <van-popup position="bottom" v-model="take_time">
      <van-datetime-picker
        v-model="lc_data"
        type="datetime"
        title="選擇提醒日期"
        placeholder="請選擇提醒時間"
        @confirm="confirmPicker_take_see"
        @cancel="cancelPicker_take_see"
      ></van-datetime-picker>
    </van-popup>
  </div>
</template>
<script>
// 搜索帶看樓盤
import aplush from "@/api/A+";
export default {
  data() {
    return {
      PageIndex: 1,
      PageSize: 20,
      type: "10",
      // date: "",
      message: "",
      currentDate: new Date(),
      lc_data: "",
      lc_radio: "1",
      notice_time: false,
      popup_house: false,
      lc_search: "",
      //   樓盤信息
      lc_house: [],
      ck_house: [],
      finishedList: false, //上滑列表加載完了所有數據（沒有更多了)
      pullLoading: false, //下拉刷新加載動畫
      loading: false,
      finished: false,
      take_finished: false,
      take_loading: false,
      // 客戶反饋
      lc_feedback: "",
      // 下步計劃
      lc_next_plan: "",
      // 陪看人
      lc_Escort: false,
      lc_follow_search: "", //搜索陪看人
      PeopleInfo: [],
      lc_follow_ck: [],
      list: ["a", "b"],
      result: [],
      temp_follow: [],
      lc_Remind: false,
      popup_contact: false,
      lc_contact_search: "",
      lc_contact: [],
      lc_conatact_ck: [],
      temp_contact: [],
      temp_department: [],
      AddType: "",
      lc_department: [],
      lc_department_ck: [],
      lc_Take_look: [],
      // 睇樓紙
      lc_paper: [],
      Follow_house: [
        {
          title: "帶看信息",
          sub_title: "選擇樓盤房源",
          other_title: "添加帶看樓盤",
        },
      ],
      lc_floor: "", //樓層
      lc_house_No: "", //房號
      lc_block_unit: "", //棟座單元
      Propertyname: "", //樓盤名稱
      lc_house_type: "", //房型
      take_time: false, //帶看時間布爾
      take_time_data: "", //帶看時間

    };
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    // 提交
    onClickSave() {
      aplush.apis
        .AddLookRecord({
          HouseType: this.lc_radio,
          SeePropertyType: this.type,
          SrouceKeyId: "",  //樓盤id
          ReserveTime: this.take_time_data,
          InquiryKeyId: "", //
          FollowTypeKeyId: "", //跟進類型Id
          FollowTypeCode: "", //跟進類型Code
          Content:this.lc_feedback,
          ContentNext:this.lc_next_plan,
          AttachmentName:"",//附件名稱
          AttachmentPath:""//附件路徑
        })
        .then((res) => {
          if (res.data.StatusCode == 200) {
            this.$toast.success(res.data.Message);
            // this.$router.push({
            //   path: "/addLook/select",
            //   query: {
            //     type: this.type,
            //     date: this.date,
            //   },
            // });
          } else {
            this.$toast.fail(res.data.Message);
          }
          //  console.log(res);
        });
    },
    confirmPicker(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.lc_data = `${year}-${month}-${day} ${hour}:${minute}`;

      this.notice_time = false;
    },
    // 提醒時間
    Notime() {
      //   this.notice_time = true;
      //   console.log('你點擊了我');
      //   console.log(this.notice_time);
    },
    onClickSave(e) {
      console.log("彈出時間");
      console.log(e);
    },
    //獲取一手樓盤 0:二手樓盤 1:一手房源
    get_one_house() {
      // 搜索帶看樓盤
      aplush.apis
        .SearchLookRecordFloor({
          FangH: 1,
          EstateNames: "",
          BuildingNames: "",
          HouseTypes: "",
          HouseNo: "",
          Floor: "",
        })
        .then((res) => {
          console.log("一手");
          console.log(res);
        });
    },
    // 獲取二手房源
    get_two_house() {
      aplush.apis
        .SearchLookRecordFloor({
          FangH: 0,
          EstateNames: "",
          BuildingNames: "",
          HouseTypes: "",
          HouseNo: "",
          Floor: "",
        })
        .then((res) => {
          console.log("二手");
          console.log(res);
        });
    },
    // 搜索樓盤
    onSearch(e) {
      aplush.apis
        .SearchLookRecordFloor({
          FangH: this.lc_radio,
          EstateNames: this.lc_search,
          BuildingNames: "",
          HouseTypes: "",
          HouseNo: "",
          Floor: "",
        })
        .then((res) => {
          console.log("二手");
          console.log(res);
        });
    },
    change_select(e) {
      console.log("改變選擇");
      console.log(e);
      this.lc_radio = e;
    },
    // 刷新
    onRefresh(event) {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    // 加載
    onLoad() {
      console.log("加載");
      aplush.apis
        .Listinglist({
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
          PropType: 1,
          EstateSelectType: 4,
        })
        .then((res) => {
          let lc_temp = res.PropertysModel;
          lc_temp.forEach((item) => {
            this.lc_house.push(item);
          });
          this.PageIndex++;
          this.loading = false;
          this.pullLoading = false;
          if (lc_temp.length > this.PageSize) {
            this.finished = true;
          }
          //   lc_temp.forEach((item) => {
          //     this.CustomList.push(item);
          //   });
        });
    },
    toogle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    // 搜索人員信息
    onSearch_follow(e) {
      console.log("搜索人員信息");
      console.log(e);
      aplush.apis
        .SelectPerson({
          KeyWords: this.lc_follow_search,
          AutoCompleteType: "1",
        })
        .then((res) => {
          this.PeopleInfo = res;
          console.log(res);
        });
    },
    // 選擇陪看人
    add_follperson(index) {
      console.log("選擇陪看人");
      this.$refs.checkboxes[index].toggle();
    },
    confrim_follow(e) {
      console.log("確定陪看人");
      console.log(e);
    },
    toogle_follow(index) {
      this.$refs.checkboxes[index].toggle();
      console.log(index);
    },
    follow_change(e) {
      console.log("改變選擇");
      console.log(e);
      this.temp_follow = e;
      console.log(this.temp_follow);
    },
    cancel_follow(e) {
      console.log("取消選擇");
      console.log(e);
      this.temp_follow = [];
    },
    remove_follow(index) {
      console.log("刪除陪看人");
      console.log(index);
      this.temp_follow.splice(index, 1);
    },
    cancel_remind(e) {
      console.log("取消提醒");
      console.log(e);
      this.notice_time = false;
    },
    // 提醒
    confrim_remind() {
      console.log("確定提醒");
    },
    onSearch_contact() {
      aplush.apis
        .SelectPerson({
          KeyWords: this.lc_contact_search,
          AutoCompleteType: this.AddType == "聯繫人" ? "1" : "2",
        })
        .then((res) => {
          this.AddType == "聯繫人"
            ? (this.lc_contact = res)
            : (this.lc_department = res);
          console.log(res);
        });
    },

    toogle_contact(index) {
      this.$refs.checkboxes[index].toggle();
      console.log(index);
    },
    toogle_department(index) {
      this.$refs.checkboxes1[index].toggle();
      console.log(index);
    },
    contact_chage(e) {
      this.temp_contact = e;
    },
    department_chage(e) {
      this.temp_department = e;
    },
    popup_contact_event(type) {
      this.AddType = type;
      console.log(type);
      // this.type=='聯繫人'?
      this.popup_contact = true;
    },
    take_onRefresh(event) {
      this.take_finished = false;
      this.take_loading = true;
      this.take_onLoad();
    },
    take_onLoad() {
      aplush.apis
        .SearchLookRecordFloor({
          FangH: this.lc_radio,
          EstateNames: this.lc_search,
          BuildingNames: "",
          HouseTypes: "",
          HouseNo: "",
          Floor: "",
        })
        .then((res) => {
          console.log("二手");
          console.log(res);
          let lc_temp = res.Result;
          lc_temp.forEach((item) => {
            this.lc_Take_look.push(item);
          });
          this.take_loading = false;
          this.take_pullLoading = false;

          this.take_finished = true;

          // this.lc_Take_look = res.TakeSeeLists;
        });
    },
    AddFollow(e) {
      let lc_remove = e;
      console.log("添加樓盤");
      console.log(e);
      if (e == "添加帶看樓盤") {
        this.Follow_house.push({
          title: "帶看信息",
          sub_title: "選擇樓盤房源",
          other_title: "刪除帶看樓盤",
        });
      } else {
        this.Follow_house.splice(
          this.Follow_house.findIndex((item) => item.other_title == lc_remove),
          1
        );
      }
    },
    // 上傳文件至服務器
    afterRead(file) {
      //改為文件流形式
      const fd = new FormData();
      fd.append("file", file.file);
      fd.append("fileType", "file");
      console.log(file.name);
      aplush.apis.UploadFile(fd).then((res) => {
        console.log(res);
      });
    },
    cancelPicker_take_see() {
      this.take_time = false;
    },
    confirmPicker_take_see(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.take_time_data = `${year}-${month}-${day} ${hour}:${minute}`;

      this.take_time = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  .lc_mian_title {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    // height: 50px;
    width: 100%;
    font-size: 14px;
    ::v-deep .van-button {
      margin-left: 30px;
    }
    .lc_title {
      position: relative;
      // margin-right: 20px;
      left: 90px;
      color: #2777ee;
      font-size: 14px;
    }
    .lc_takinfo {
      position: relative;
      margin-left: 10px;
      &:after {
        content: "*";
        position: absolute;
        right: -8px;
        top: 50%;
        color: #f12945;
        transform: translateY(-50%);
      }
    }
    .lc_taksee {
      position: relative;
      // margin-left: auto;
      margin-right: 20px;
      // color: #2777ee;
    }
  }
  .lc_other {
    position: relative;
    display: flex;
    width: 100%;
    font-size: 14px;

    ::v-deep .van-radio__label {
      margin-left: 0;
    }
    .lc_taksee {
      position: relative;
      margin-left: 10px;
      white-space: nowrap;
      font-size: 14px;
    }
    .lc_radio_group {
      width: 100%;
      margin-left: 10px;
    }
  }
  .lc_others {
    display: flex;
    font-size: 14px;
    width: 100%;
    .lc_taksee {
      font-size: 14px;
      margin-left: 20px;
      margin-right: 20px;
      width: fit-content;
      flex: 30%;
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
  }
  .lc_others_sales {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: 100%;
    .lc_sales {
      position: relative;
      margin-left: 10px;
      margin-right: 27px;
      font-size: 14px;
    }
    ::v-deep .van-cell {
      width: fit-content;
      &::after {
        border-bottom: none;
      }
    }
    ::v-deep .van-field__body {
      height: 32px;
      border: solid 0.5px #cccccc;
      border-radius: 4px;
      width: 228px;
    }
  }
  .lc_other_paper {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: 100%;
    .lc_taksee {
      font-size: 14px;
      margin-left: 10px;
      margin-right: 20px;
      width: fit-content;
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
  }
  .lc_follow {
    position: relative;
    display: flex;
    align-items: center;
    height: 70px;
    line-height: 70px;
    margin-left: 10px;
    font-size: 14px;
    .lc_title {
      margin-right: 10px;
      font-size: 14px;
    }
  }
  .lc_cusback {
    position: relative;
    display: flex;
    align-items: flex-start;
    // height: 70px;
    line-height: 70px;
    margin-left: 10px;
    font-size: 14px;
    // ::v-deep .van-cell {
      
    // }
    .lc_title {
      position: relative;
      top: -5px;
      margin-right: 10px;
      font-size: 14px;
      white-space: nowrap;
      &::before {
        content: "*";
        position: absolute;
        // left: -8px;
        right: -10px;
        top: 50%;
        color: #f12945;
        transform: translateY(-50%);
      }
    }
    ::v-deep .van-field__control {
      box-sizing: border-box;
      border-radius: 4px;
      border: solid 0.5px #cccccc;
    }
  }
  .lc_notime {
    ::v-deep .van-cell__value {
      height: 34px;
      border-radius: 4px;
    }
    .lc_contianer {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        margin-left: 10px;
      }
      img {
        position: relative;
        width: 24px;
        height: 23px;
        top: 2px;
        right: 20px;
      }
    }
    ::v-deep .van-field__body {
      height: 34px;
      border: solid 0.5px #cccccc;
      border-radius: 4px;
      width: 265px;
    }
    ::v-deep .van-cell {
      width: fit-content;
    }
  }
  .lc_submit {
    position: relative;
    display: flex;
    align-items: center;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    width: 100%;
    padding: 0 10px;
    ::v-deep .van-button {
      width: 100%;
      height: 47px;
    }
  }
  .lc_next {
    position: relative;
    display: flex;
    align-items: flex-start;
    line-height: 70px;
    margin-left: 10px;
    font-size: 14px;
    .lc_title {
      margin-right: 10px;
      font-size: 14px;
      white-space: nowrap;
    }
    ::v-deep .van-field__control {
      box-sizing: border-box;
      border-radius: 4px;
      border: solid 0.5px #cccccc;
    }
  }
  .lc_take {
    position: relative;
    display: flex;
    width: 100%;
    font-size: 14px;
    ::v-deep .van-field__body {
      height: 32px;
      border: solid 0.5px #cccccc;
      border-radius: 4px;
      width: 266.5px;
    }
  }
  .van-dialog_header {
    position: relative;
    top: 28px;
    margin-bottom: 50px;
    font-size: 18px;
  }
  .van-pull-refresh {
    height: 100px;
    overflow-y: scroll;
  }
  .lc_van_scroll {
    height: 100px;
    overflow-y: scroll;
  }
  .lc_foll_contianer {
    width: 95%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    font-size: 14px;
    .lc_foll_person {
      position: relative;
      display: flex;
      align-items: center;
      background-color: #f4f4f4;
      border-radius: 14.5px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 20px;
      padding-right: 20px;
      margin-left: 10px;
      margin-bottom: 10px;
      ::v-deep .van-icon {
        margin-left: 10px;
      }
    }
  }
  .lc_contact {
    position: relative;
    width: 100%;
    .lc_contact_container {
      width: 100%;
      display: flex;
      margin-left: 20px;
      margin-bottom: 10px;
      align-items: center;
      .lc_title {
        font-size: 14px;
        width: 60px;
        margin-right: 10px;
      }
      .lc_icon_container {
        width: 200px;
        height: 34px;
        border: solid 0.5px #cccccc;
        border-radius: 4px;
        div {
          float: right;
          padding: 5px;
        }
      }
    }
    .lc_contact_add {
      position: relative;
      width: 95%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      .lc_contact_add_container {
        position: relative;
        display: flex;
        align-items: center;
        background-color: #f4f4f4;
        border-radius: 14.5px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 10px;
        margin-bottom: 10px;
        ::v-deep .van-icon {
          margin-left: 10px;
        }
      }
    }
  }
  .lc_contact_scroll {
    height: 100px;
    overflow-y: scroll;
  }
  ::v-deep .van-field__control {
    padding-left: 5px;
  }

  .lc_house_two_hand {
    ::v-deep .van-field__body {
      height: 32px;
      border: solid 0.5px #cccccc;
      border-radius: 4px;
    }
  }
  .lc_label {
    font-size: 16px;
    color: #333333;
  }
  .lc_label_container {
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      white-space: nowrap;
      margin-left: 20px;
      color: #333333;
    }
  }
  .lc_title_common {
    font-size: 16px;
    color: #333333;
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
