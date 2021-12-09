<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div class="navs">
      <img @click="back" src="/icon/nav_back_transparent_icon.png" alt="" />
      <!-- 更多 -->
      <img @click="more_i" src="/icon/nav_more_transparent_icon.png" alt="" />
      <!-- 點讚 -->
      <img
        v-if="bool_good"
        @click="good_i"
        src="/icon/nav_good_transparent_icon.png"
        alt=""
      />
      <img
        v-else
        @click="good_i"
        src="/icon/nav_good_collected_icon.png"
        alt=""
      />
      <!-- 收藏 -->
      <img
        v-if="bool_collect"
        @click="collect_i"
        src="/icon/nav_collect_transparent_icon.png"
        alt=""
      />
      <img
        v-else
        @click="collect_i"
        src="/icon/nav_collected_transparent_icon.png"
        alt=""
      />

      <div
        v-if="showPopover"
        class="van-popup van-popover van-popover--light"
        data-popper-placement="left-start"
        style="
          position: absolute;
          left: 215px;
          top: 50px;
          margin: 0px;
          z-index: 2001;
        "
      >
        <div class="van-popover__arrow"></div>
        <div role="menu" class="van-popover__content">
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增現場相/查冊
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增放盤紙
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              新增鑰匙
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              編輯房源
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              中原成交
            </div>
          </div>
          <div role="menuitem" class="van-popover__action">
            <div class="van-popover__action-text van-hairline--bottom">
              發佈房源
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end 顶部导航 -->
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item
        v-if="House_detail.Photos"
        v-for="(item, index) in House_detail.Photos"
        :key="index"
      >
        <van-image :src="item.ImgPath + '?w=800&watermark=smallgroup_center'">
        </van-image>
      </van-swipe-item>
      <van-swipe-item v-if="House_detail.Photos">
        <img height="500px" src="img/noImg@2x.png" alt="" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <!-- end 轮播图 -->

    <!-- 房源標籤 -->
    <div class="house_tag">
      <div>
        <van-button type="default" size="small" class="tag_btn">業</van-button>
        <van-button type="default" size="small" class="tag_btn1">匙</van-button>
        <van-button type="default" size="small" class="tag_btn2">獨</van-button>
      </div>
    </div>
    <!-- end 房源標籤 -->
    <div class="content">
      <span>泉裕豪庭 5A</span>
      <div class="price">
        <div>1,288 萬</div>
        <div>17,500 元/月</div>
        <div>4-2-3-2</div>
      </div>

      <div class="price">
        <nav>售價</nav>
        <nav>租價</nav>
        <nav>房型</nav>
      </div>

      <div class="price">
        <article style="flex: 1">朝向：<span>東北</span></article>
        <!-- <article style="flex:0.9"></article> -->
        <article style="flex: 1">建築面積：<span>1,979 呎</span></article>
      </div>

      <div class="price">
        <aside>裝修情況：<span>地下車位</span></aside>
        <aside>房屋形狀：<span>暫無</span></aside>
      </div>
      <!-- 業主信息 -->
      <van-collapse
        v-model="activeName"
        :close-on-click-mask="false"
        @change="getOwner"
      >
        <van-collapse-item title="業主信息">
          <div class="collapse" v-for="(item, index) in House_Owner">
            <div>
              <span class="first">類型:</span
              ><span>{{ item.TrustorType }}</span>
            </div>
            <div v-if="item.Mobile">
              <span class="first">手機:</span><span>{{ item.Mobile }}</span>
            </div>
            <div v-if="item.Tel">
              <span>座機:</span><span class="first">{{ item.Tel }}</span>
            </div>
            <div v-if="item.WeChat">
              <span class="first">微信:</span><span>{{ item.WeChat }}</span>
            </div>
            <div v-if="item.CompanyName">
              <span class="first">公司名稱:</span
              ><span>{{ item.CompanyName }}</span>
            </div>
            <div v-if="item.CreateTime">
              <span class="first">錄入時間:</span
              ><span>{{ item.CreateTime }}</span>
            </div>
            <div v-if="item.Remark">
              <span class="first">備註:</span><span>{{ item.Remark }}</span>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <van-tabs v-model="active" @click="lc_vant_click">
        <van-tab title="現場相">
          <template #title>
            <van-button class="lc_btn1" icon="/icon/photo_icon.png"
              >現場相</van-button
            >
          </template>
          <van-swipe-cell :before-close="beforeClose">
            <template #left>
              <van-button square type="primary" text="编辑" />
            </template>
            <div class="collapse">
              <div>
                <span class="first"> 部門: </span>
                <span>MB</span>
              </div>
              <div>
                <span class="first"> 業務員: </span>
                <span>Sandy HO</span>
              </div>
              <div>
                <span class="first"> 錄入日期: </span>
                <span>2021-12-07</span>
              </div>
              <div>
                <span class="first"> 照片數量: </span>
                <span>6</span>
              </div>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" />
            </template>
          </van-swipe-cell>
          <div class="collapse">
            <div class="title">房源圖片</div>
            <div style="width: 100%">
              <select name="build" v-model="selected" @change="getTypeSelected">
                <option value="">全部</option>
                <!-- 戶型圖 -->

                <option
                  v-for="(item, index) in House_Type"
                  :value="item.SysParameter.ParameterType"
                >
                  {{ item.SysParameter.ParameterName }}
                </option>
                <!-- 室內圖 -->
                <option
                  v-for="(item, index) in lc_IndoorMap"
                  :value="item.SysParameter.ParameterType"
                >
                  {{ item.SysParameter.ParameterName }}
                </option>
                <!-- 小區圖 -->

                <option
                  v-for="(item, index) in Polt"
                  :value="item.SysParameter.ParameterType"
                >
                  {{ item.SysParameter.ParameterName }}
                </option>

                <!-- 景觀圖 -->
                <option
                  v-for="(item, index) in Landscape"
                  :value="item.SysParameter.ParameterType"
                >
                  {{ item.SysParameter.ParameterName }}
                </option>
              </select>

              <select
                @change="other_change"
                v-model="other_select"
                v-show="selectType.length > 0"
                name="built"
              >
                <option value="">全部</option>
                <option v-for="(item, index) in selectType" :value="item.KeyId">
                  {{ item.ItemName }}
                </option>
              </select>
              <div style="font-size: 14px; margin-left: 9px">上傳時間</div>
              <div style="display: flex">
                <input v-model="start_time" id="date" type="date" />
                <input
                  @change="select_change"
                  v-model="end_time"
                  id="date"
                  type="date"
                />
              </div>
              <template v-if="IndoorMap.length > 0">
                <div
                  v-for="(item, indx) in IndoorMap"
                  style="width: 100%; display: flex; justify-content: center"
                >
                  <van-image
                    width="95%"
                    radius="0.20rem"
                    round
                    :src="item.PhotoPath"
                  >
                    <template v-slot:error>加载失败</template>
                  </van-image>
                </div>
              </template>

              <div v-if="IndoorMap.length == 0">
                <div style="font-size: 14px">暫無數據</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="放盤紙">
          <template #title>
            <van-button class="lc_btn2" icon="/icon/paper_icon.png"
              >放盤紙</van-button
            >
          </template>

          <van-swipe-cell :before-close="beforeClose">
            <template #left>
              <van-button square type="primary" text="编辑" />
            </template>

            <div
              v-if="PaperList.length > 0"
              class="collapse"
              v-for="(item, index) in PaperList"
            >
              <div style="width: 100%" @click="AddPaperShow = true">
                <span class="lc_btn_add">添加</span>
              </div>

              <div v-if="item.DepartmentName">
                <span class="first">部門:</span>
                <span>{{ item.DepartmentName }}</span>
              </div>
              <div v-if="item.OnlyTrustPerson">
                <span class="first">簽署人:</span>
                <span>{{ item.OnlyTrustPerson }}</span>
              </div>
              <div v-if="item.papertype">
                <span class="first">放盤類型:</span>
                <span>{{ item.papertype }}</span>
              </div>
              <div v-if="item.EffectiveDate">
                <span class="first">放盤日期起:</span>
                <span>{{ item.EffectiveDate }}</span>
              </div>
              <div v-if="item.EffectiveDate">
                <span class="first">放盤日期止:</span>
                <span>{{ item.EffectiveDate }}</span>
              </div>
              <div v-if="item.TrustBookNo">
                <span class="first">放盤紙編號:</span>
                <span>{{ item.TrustBookNo }}</span>
              </div>

              <!-- <div v-if="item.IsOnlyTrust">
              <span class="first">是否獨家:</span>
              <span>{{ item.IsOnlyTrust }}</span>
            </div>
            <div v-if="item.isadvertising">
              <span class="first">可否出廣告:</span>
              <span>{{ item.isadvertising }}</span>
            </div>
            <div v-if="item.submitdate">
              <span class="first">提交日期:</span>
              <span>{{ item.submitdate }}</span>
            </div> -->
            </div>
            <template #right>
              <van-button square type="danger" text="删除" />
            </template>
          </van-swipe-cell>

          <div class="collapse" v-if="PaperList.length == 0">
            <div class="no_data">暫無數據</div>
          </div>
        </van-tab>
        <van-tab title="鑰匙">
          <template #title>
            <van-button class="lc_btn3" icon="/icon/key_icon.png"
              >鑰匙</van-button
            >
          </template>
          <div>鑰匙</div>
        </van-tab>
      </van-tabs>
      <!-- 房源跟进 -->
      <div class="nav_follow">
        <span>房源跟进</span><van-icon name="arrow" @click="full_Follow" />
      </div>
      <van-steps
        direction="vertical"
        active-color="#646566"
        inactive-color="#646566"
      >
        <van-step
          v-for="(item, index) in FollowUp"
          :key="index"
          class="lc_step"
        >
          <template #active-icon>
            <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <template #inactive-icon>
            <van-icon class-prefix="my-icon" name="circle" color="#f12945" />
          </template>
          <span class="lc_main_title">{{ item.FollowContent }}</span>

          <div class="sub_title">
            <article>{{ item.Follower }}</article>
            <article>{{ item.FollowType }}</article>
            <article>{{ item.FollowTime }}</article>
          </div>
        </van-step>
      </van-steps>
      <!-- end 房源跟进 -->
    </div>
    <!-- 聯繫人 -->
    <div class="lc_contact">
      <div class="tel">
        <article>
          <img src="/icon/photo_defual_pic.png" style="width: 49px" alt="" />
        </article>
        <div>
          <p>Jane Wong</p>
          <p style="color: #666666">MB</p>
        </div>

        <van-button
          type="primary"
          size="small"
          color="#f12945"
          @click="addFollow"
          >新增跟進</van-button
        >
        <van-button type="info" size="small" color="#54bd46" @click="call"
          >撥打電話</van-button
        >
      </div>
    </div>
    <!-- end 聯繫人 -->
    <van-dialog
      id="lc_dialog"
      v-model="show"
      :show-confirm-button="false"
      closeOnClickOverlay
    >
      <template #title>
        <span class="call_title">撥打電話</span>
      </template>
      <div class="dialog_content">
        <div class="lc_title">蔡小姐（業主）</div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
        <div class="lc_title">洪先生（租客）</div>
        <div class="lc_items">
          <div class="lc_normal">
            <van-icon size="20" name="phone" color="#ed0c19" />
            <span>手機正常撥</span>
          </div>
          <div class="lc_special">
            <van-icon size="20" name="phone" color="#1e9cd0" />
            <span>手機加撥0</span>
          </div>
        </div>
      </div>
    </van-dialog>
    <!-- 放盤紙 -->
    <van-popup
      position="center"
      round
      :style="{ width: '90%', height: '400px', overflow: 'hidden' }"
      v-model="AddPaperShow"
    >
      <div class="lc_paper">
        <div style="position: relative">
          <div class="lc_title">添加放盤紙</div>
        </div>
        <div class="container">
          <van-cell-group>
            <van-field
              v-model="PaperTime"
              type="text"
              placeholder="放盤日期起"
            />
            <van-field
              v-model="PaperEndTime"
              type="text"
              placeholder="放盤日期止"
            />
            <!-- <van-radio-group v-model="PaperStatus">
              <van-radio name="1"> 售 </van-radio>
              <van-radio name="2"> 租 </van-radio>
              <van-radio name="3">租售</van-radio>
            </van-radio-group> -->
            <van-radio-group v-model="PaperStatus">
              <van-cell title="售" clickable @click="PaperStatus = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="租" clickable @click="PaperStatus = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
              <van-cell title="租售" clickable @click="PaperStatus = '3'">
                <template #right-icon>
                  <van-radio name="3" />
                </template>
              </van-cell>
            </van-radio-group>
            <van-radio-group v-model="exclusive">
              <van-cell title="是否獨家" @click="exclusive = '1'">
                <van-radio name="1" />
              </van-cell>
              <van-cell title="可否出售廣告" @click="exclusive = '2'">
                <van-radio name="2" />
              </van-cell>
            </van-radio-group>

            <van-field
              v-model="PaperNo"
              label="放盤紙編號"
              placeholder="請輸入放盤紙編號"
            ></van-field>
            <van-field v-model="Saeles_Start" label="售價範圍開始"></van-field>
            <van-field v-model="Saeles_End" label="售價範圍結束"></van-field>
            
          </van-cell-group>

          <div
            style="position: fixed; bottom: 0; width: 100%; margin-left: -10px"
          >
            <van-button
              type="primary"
              size="large"
              @click="AddPaper"
              style="width: 100%"
            >
              添加
            </van-button>
          </div>
          <!-- </div> -->
        </div>

        <!-- 上傳附件 上傳文件支持格式 jpeg，jpg,gif,png,pdf -->
      </div>
    </van-popup>
  </div>
</template>

<script>
import aplush from "@/api/A+"; // 獲取樓詳情
export default {
  mounted() {
    let keyId = this.$route.query.KeyId;
    // 房源详情接口
    this.Get_House_Detail(keyId);
    this.House_detail;
    // 房源跟进接口
    let params = {
      PageIndex: this.pageIndex,
      PageSize: this.pageSize,
      FollowTypeKeyId: "0EEF0532-7AAD-4B52-8BCB-AB1B67987AAF",
      IsDetails: "true",
      PropertyKeyId: keyId,
    };
    aplush.apis.ListiongFollow(params).then((res) => {
      this.FollowUp = res.PropFollows;
    });
    // end 房源跟进接口
    this.M_live_Pohto();
    //獲取系統類型
    this.base_system();
  },
  data() {
    return {
      show: false,
      showPopover: false,
      Picdefault: 0,
      PicType: [
        {
          text: "室內圖",
          value: "室內圖",
          index: 0,
        },
        {
          text: "小區圖",
          value: "小區圖",
          index: 1,
        },
        {
          text: "戶型圖",
          value: "戶型圖",
          index: 2,
        },
        {
          text: "景觀圖",
          value: "景觀圖",
          index: 3,
        },
      ],
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "新增現場相/查冊" },
        { text: "新增放盤紙" },
        { text: "新增鑰匙" },
        { text: "編輯房源" },
        { text: "中原成交" },
        { text: "發佈房源" },
      ],
      //
      bool_collect: true,
      bool_good: true,
      current: 0,
      list: [],
      loading: false,
      finished: false,
      House_detail: {},
      FollowUp: [], //房源跟进
      pageIndex: 1, //起始页
      pageSize: 3, //显示页数
      Live_Photo_Show: false, // 顯示現場相
      Live_Photo: "", // 現場相圖片
      soucrce_keyId: "bb649e23-fcdf-44a1-9420-52769a129de1", //現場相圖片類型
      House_Owner: [], // 業主
      activeName: ["1"], // 業主信息
      active: "现场相",
      // 业绩申明
      PaperName: ["1"], //放盤紙
      PaperList: [], // 放盤紙
      Scene_keyId: "全部", // 現場相圖片類型keyId
      Type: "",
      House_Type: [], //戶型圖
      IndoorMap: [], // 室內圖
      lc_IndoorMap: [],
      Polt: [], //小區圖
      Landscape: [], //景觀圖
      selected: "",
      selectType: [], //右側選項
      start_time: "", // 上傳開始時間
      end_time: "", // 上傳結束時間
      other_select: "", // 其他選項
      AddPaperShow: false,
      // 放盤開始時間
      PaperTime: "",
      // 放盤結束時間
      PaperEndTime: "",
      //  銷售類型
      PaperStatus: "1",
      exclusive: "1",
      // 放盤紙編號
      PaperNo: "",
      // 售價開始
      Saeles_Start: "",
      // 售價結束
      Saeles_End: "",
    };
  },
  filters: {
    formatt: function (value) {},
  },
  methods: {
    back() {
      this.$router.push("/House");
    },
    // 系統類型
    base_system() {
      this.Type = 56; //戶型圖
      aplush.apis.SystemType({ Type: this.Type }).then((res) => {
        this.House_Type.push(res.Result);
        console.log("打印戶型圖");
        console.log(this.House_Type);
        this.Type = 2; //室內圖
        aplush.apis.SystemType({ Type: this.Type }).then((res) => {
          this.lc_IndoorMap.push(res.Result);
          this.Type = 1; //小區圖
          aplush.apis.SystemType({ Type: this.Type }).then((res) => {
            this.Polt.push(res.Result);
            this.Type = 133; //景觀圖
            aplush.apis.SystemType({ Type: this.Type }).then((res) => {
              this.Landscape.push(res.Result);
            });
          });
        });
      });
    },
    onChange(index) {
      this.current = index;
    },
    collect_i() {
      let keyId = this.$route.query.KeyId;
      console.log(keyId);
      this.bool_collect = !this.bool_collect;
      // this.House_detail.KeyId
      console.log("打印选中楼盘");
      console.log();
      aplush.apis
        .AddCollection({
          KeyId: this.$route.query.KeyId,
        })
        .then((res) => {
          if (res.Flag) {
            this.$toast("收藏成功");
          } else {
            this.$toast("收藏失败");
          }
        });
    },
    good_i() {
      this.bool_good = !this.bool_good;
      console.log("as");
    },
    // 撥打電話
    call() {
      this.show = true;
    },
    // 收藏
    more_i() {
      this.showPopover = !this.showPopover;
    },
    onSelect(action) {
      Toast(action.text);
    },
    // 新增跟進
    addFollow() {
      this.$router.push("AddFollow");
    },
    // 跟进详情
    FollowDetail(index) {},
    // 房源跟进
    full_Follow() {
      let lc_keyId = this.$route.query.KeyId;
      this.$router.push({ path: "/MoreFollow", query: { KeyId: lc_keyId } });
    },
    // 現場相
    M_live_Pohto() {
      this.Pic_base();
    },
    Pic_base() {
      let that = this;
      aplush.apis
        .ListingPhoto({
          propertyKeyId: this.$route.query.KeyId,
          PhotoTypeKeyId: this.Scene_keyId,
        })
        .then((res) => {
          // this.Live_Photo = res._Photos;
          // var result = this.Live_Photo.filter(
          //   (item) => item.PhotoTypeKeyId === this.soucrce_keyId
          // );
          this.IndoorMap = res._Photos;
          console.log("現場相44444");
          console.log(this.IndoorMap);
        });
    },
    // 切換圖片
    Chage_Pic(item) {
      // 切換默認選中
      this.Picdefault = item.index;
      item.value == "室內圖"
        ? this.soucrce_keyId
        : (this.soucrce_keyId = "8457527f-9269-4d8e-9c06-714f7c276421");
      // ? (this.Live_Photo_Show = true)
      // : (this.Live_Photo_Show = false);
      // console.log(item);
    },
    // 獲取房源詳情
    Get_House_Detail(keyId) {
      aplush.apis.ListingDetail(keyId).then((res) => {
        this.House_detail = res;
        console.log("打印房源详情");
        console.log(this.House_detail);
      });
    },
    getOwner() {
      this.Get_Owner_Detail();
    },
    // 獲取業主信息
    Get_Owner_Detail() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingOwner({
          keyId: keyId,
        })
        .then((res) => {
          this.Owner_Info_Show = true;
          this.House_Owner = res.Trustors;
          console.log("打印業主信息");
          console.log(this.House_Owner);
        });
    },
    // 獲取放盤紙
    Get_Paper() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingPaper({
          keyId: keyId,
        })
        .then((res) => {
          this.PaperList = res.PropOnlyTrusts;
          console.log("打印放盤紙");
          console.log(res);
        });
    },
    //獲取鑰匙
    Get_Key() {
      let keyId = this.$route.query.KeyId;
      aplush.apis
        .ListingKey({
          keyId: keyId,
        })
        .then((res) => {
          console.log("打印鑰匙");
          console.log(res);
        });
    },
    lc_vant_click(name, title) {
      console.log("現場相復合內容");
      // console.log(name);
      console.log(title);
      title == "現場相"
        ? this.M_live_Pohto()
        : title == "放盤紙"
        ? this.Get_Paper()
        : title == "鑰匙"
        ? this.Get_Key()
        : "";
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          // 跳轉到編輯頁面
          this.$router.push({
            path: "/EditScene",
          });
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？",
          }).then(() => {
            instance.close();
            // 刪除對應頁面
          });
          break;
      }
    },
    getTypeSelected() {
      switch (this.selected) {
        case 56:
          this.House_Type.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 2:
          this.lc_IndoorMap.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 1:
          this.Polt.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        case 133:
          this.Landscape.forEach((item) => {
            this.selectType = item.Items;
          });
          break;
        default: {
          this.selectType = [];
        }
      }
    },
    select_change() {
      // 獲取房源現場相
      this.Pic_base();
    },
    other_change() {
      console.log("其他選項改變");
      // console.log(this.other_select);
      this.Scene_keyId = this.other_select;
      this.Pic_base();
    },
    // 添加放盤紙
    AddPaper() {},
  },
};
</script>


<style  lang="scss" scoped>
@import "house_d.scss";
</style>