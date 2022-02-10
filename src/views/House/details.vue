<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div ref="container" style="background: #fff">
      <van-sticky>
        <div class="navs">
          <!-- <div style="display:flex;align-items:center;"> -->
          <img
            @click="back"
            src="@/assets/icon/nav_back_transparent_icon.png"
            alt=""
          />
          <!-- 更多 -->
          <!--彈出內容、現場相、-->
          <van-popover
            class="lc_popover_more"
            v-model="showPopover"
            trigger="click"
            placement="bottom-end"
            :actions="actions"
            @select="onSelect"
          >
            <template #reference>
              <img
                style="margin: 0px"
                @click="more_i"
                src="@/assets/icon/nav_more_transparent_icon.png"
                alt=""
              />
            </template>
          </van-popover>
          <!-- 點讚 -->
          <img
            v-if="bool_good"
            @click="good_i"
            src="@/assets/icon/nav_good_transparent_icon.png"
            alt=""
          />
          <img
            v-else
            @click="good_i"
            src="@/assets/icon/nav_good_collected_icon.png"
            alt=""
          />
          <!-- 收藏 -->
          <img
            v-if="bool_collect"
            @click="collect_i"
            src="@/assets/icon/nav_collected_transparent_icon.png"
            alt=""
          />
          <img
            v-else
            @click="collect_i"
            src="@/assets/icon/nav_collect_transparent_icon.png"
            alt=""
          />
          <!-- </div> -->
        </div>
        <!-- end 顶部导航 -->
      </van-sticky>
    </div>
    <div class="lc_layout">
      <!-- 轮播图 -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        @change="onChange"
      >
        <van-swipe-item
          v-if="House_detail.Photos.length > 0"
          v-for="(item, index) in House_detail.Photos"
          :key="index"
        >
          <van-image
            fit="cover"
            @load="loadingImg"
            ref="img"
            :src="item.ImgPath + `?w=${imgWidth}&watermark=smallgroup_center`"
          />
        </van-swipe-item>
        <van-swipe-item v-if="House_detail.Photos.length==0">
          <van-image
            @load="loadingImg"
            ref="img"
            :src="require('@/assets/img/noImg@2x.png')"
          />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current }}/{{ imgCount }}</div>
        </template>
      </van-swipe>
      <!-- end 轮播图 -->

      <!-- 房源基本資料 -->
      <div class="property_info">
        <div class="content">
          <!-- 房源標籤 -->
          <div class="house_tag">
            <!-- <div> -->
            <van-button
              v-if="House_detail.HouseType"
              type="default"
              size="small"
              class="tag_btn3"
            >
              業
            </van-button>
            <van-button
              v-if="House_detail.HasOnlyTrust"
              type="default"
              size="small"
              class="tag_btn2"
            >
              獨
            </van-button>
            <van-button
              v-if="House_detail.PropertyKeyType != '1'"
              type="default"
              size="small"
              class="tag_btn2"
            >
              匙
            </van-button>
            <van-button type="default" size="small" class="tag_btn2">
              {{
                House_detail.TrustType === "1"
                  ? "售"
                  : House_detail.TrustType === "2"
                  ? "租"
                  : "租售"
              }}
            </van-button>
            <!-- </div> -->
          </div>
          <span class="lc_title">{{ House_detail.AllHouseInfo }}</span>
          <div class="price">
            <div v-if="House_detail.SalePrice">
              {{ House_detail.SalePrice }}
            </div>
            <div v-if="House_detail.SaleUnitPrice">
              {{ House_detail.SaleUnitPrice }}
            </div>
            <div v-if="House_detail.RentPrice">
              {{ House_detail.RentPrice }}
            </div>
            <div v-if="House_detail.RentUnitPrice">
              {{ House_detail.RentUnitPrice }}
            </div>
            <div v-if="House_detail.RoomType">{{ House_detail.RoomType }}</div>
          </div>
          <div class="price">
            <nav v-if="House_detail.SalePrice">售價</nav>
            <nav v-if="House_detail.SaleUnitPrice">售均價</nav>
            <nav v-if="House_detail.RentPrice">租價</nav>
            <nav v-if="House_detail.RentUnitPrice">租均價</nav>
            <nav v-if="House_detail.RoomType">房型</nav>
          </div>
          <div class="price" v-if="House_detail.Orientation">
            <article style="flex: 1">
              朝向:
              <span>{{ House_detail.Orientation }}</span>
            </article>
          </div>
          <div class="price" v-if="House_detail.Floor">
            <article style="flex: 1">
              樓層:
              <span>{{ House_detail.Floor }}</span>
            </article>
          </div>
        </div>
        <!-- 顯示更多內容 -->
        <div class="btn_content">
          <div class="btn">
            <van-button
              class="lc_btn1"
              @click="look_Scene"
              :icon="require('@/assets/icon/photo_icon.png')"
              >現場相</van-button
            >
            <van-button
              class="lc_btn2"
              @click="putPaper"
              :icon="require('@/assets/icon/paper_icon.png')"
              >放盤紙</van-button
            >
            <van-button
              class="lc_btn3"
              :icon="require('@/assets/icon/key_icon.png')"
              >鑰匙</van-button
            >
          </div>
        </div>

        <div class="end_content">
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
        </div>
      </div>
      <!-- 其它區域內容 -->
      <div class="property_info_other">
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
              <van-icon
                size="10"
                class-prefix="my-icon"
                name="circle"
                color="#f12945"
              />
            </template>
            <template #inactive-icon>
              <van-icon
                size="10"
                class-prefix="my-icon"
                name="circle"
                color="#f12945"
              />
            </template>
            <span class="lc_main_title">{{ item.FollowContent }}</span>

            <div class="sub_title">
              <article>{{ item.Follower }}</article>
              <article>{{ item.FollowType }}</article>
              <article>{{ item.FollowTime }}</article>
            </div>
          </van-step>
        </van-steps>
      </div>
    </div>
    <!-- 聯繫人 -->
    <div class="lc_contact">
      <div class="tel">
        <article>
          <img
            src="@/assets/icon/photo_defual_pic.png"
            style="width: 49px"
            alt=""
          />
        </article>
        <div>
          <p>{{ House_detail.PropertyChiefName }}</p>
          <p style="color: #666666">
            {{ House_detail.PropertyChiefDepartmentName }}
          </p>
        </div>

        <van-button
          type="primary"
          size="small"
          color="#f12945"
          @click="addFollow"
          >新增跟進</van-button
        >
        <!-- <van-button type="info" size="small" color="#54bd46" @click="call"
          >撥打電話</van-button
        > -->
        <van-button type="info" size="small" color="#54bd46" @click="call"
          >撥打電話</van-button
        >
      </div>
    </div>
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
      closeable
      :style="{ width: '90%', height: '400px', overflow: 'hidden' }"
      v-model="AddPaperShow"
    >
      <div class="lc_paper">
        <div
          style="
            position: relative;
            float: left;
            width: 100%;
            padding-left: 10px;
            padding: 10px 30px;
          "
        >
          <div class="lc_title">添加放盤紙</div>
        </div>
        <div class="container">
          <van-cell-group>
            <van-field
              v-model="PaperTime"
              type="text"
              readonly
              right-icon="arrow-down"
              label="放盤時間起"
              placeholder="請輸入放盤開始時間"
              @click-right-icon="listing_start"
            />
            <van-field
              v-model="PaperEndTime"
              type="text"
              label="放盤日期止"
              readonly
              right-icon="arrow-down"
              placeholder="請輸入放盤日期止"
              @click-right-icon="listing_end"
            />
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
              <van-cell title="是否獨家">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
            </van-radio-group>
            <van-radio-group v-model="ads">
              <van-cell title="可否出售廣告">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
            </van-radio-group>
            <div v-show="exclusive">
              <!-- 獨家日期起 -->
              <van-field
                v-model="exclusive_start"
                type="text"
                label="獨家日期起"
                readonly
                right-icon="arrow-down"
                placeholder="請輸入獨家日期起"
                @click-right-icon="exclusive_start_listing"
              />
              <!-- 獨家日期止 -->
              <van-field
                v-model="exclusive_end"
                type="text"
                label="獨家日期止"
                readonly
                right-icon="arrow-down"
                placeholder="請輸入獨家日期止"
                @click-right-icon="exclusive_end_listing"
              />
              <!-- 獨家類型 -->
              <van-radio-group v-model="exclusive_type">
                <van-cell title="上線獨家">
                  <template #right-icon>
                    <van-radio name="1" />
                  </template>
                </van-cell>
                <van-cell title="未上線獨家">
                  <template #right-icon>
                    <van-radio name="2" />
                  </template>
                </van-cell>
              </van-radio-group>
            </div>
            <van-field
              v-model="PaperNo"
              label="放盤紙編號"
              placeholder="請輸入放盤紙編號"
            ></van-field>
            <template v-if="PaperStatus == '1'">
              <van-field
                v-model="Saeles_Start"
                label="售價範圍開始"
                placeholder="請輸入售價"
              ></van-field>
              <van-field
                v-model="Saeles_End"
                label="售價範圍結束"
                placeholder="請輸入售價"
              ></van-field>
            </template>
            <template v-if="PaperStatus == '2'">
              <van-field
                v-model="Rent_Start"
                label="租金範圍開始"
                placeholder="請輸入租金"
              ></van-field>
              <van-field
                v-model="Rent_End"
                label="租金範圍結束"
                placeholder="請輸入租金"
              ></van-field>
            </template>
            <template v-if="PaperStatus == '3'">
              <van-field
                v-model="Saeles_Start"
                label="售價範圍開始"
                placeholder="請輸入售價"
              ></van-field>
              <van-field
                v-model="Saeles_End"
                label="售價範圍結束"
                placeholder="請輸入售價"
              ></van-field>
              <van-field
                v-model="Rent_Start"
                label="租金範圍開始"
                placeholder="請輸入租金"
              ></van-field>
              <van-field
                v-model="Rent_End"
                label="租金範圍結束"
                placeholder="請輸入租金"
              ></van-field>
            </template>
            <div class="lc_other_paper">
              <div
                style="
                  width: 70%;
                  margin-top: 5%;
                  margin-bottom: 5%;
                  margin-left: -5%;
                "
              >
                <van-uploader
                  v-model="lc_paper"
                  :max-count="1"
                  :after-read="afterRead"
                >
                  <div class="lc_box">
                    <div class="lc_upload"></div>
                    <div class="lc_house">上傳看房單</div>
                  </div>
                </van-uploader>
              </div>
            </div>
            <van-field
              v-model="remark"
              rows="2"
              autosize
              label="備註"
              type="textarea"
              maxlength="200"
              placeholder="請輸入備註"
              show-word-limit
            />
            <!-- 簽署人 -->
            <van-field
              v-model="signature"
              label="簽署人"
              placeholder="請輸入簽署人"
            ></van-field>
            <!-- 添加聯繫人 -->
            <van-button
              @click="add_contact"
              icon="contact"
              round
              type="primary"
              block
            >
              添加聯繫人
            </van-button>
            <template v-for="(item, index) in ContactList">
              <div class="lc_add_contact" @click="remove_contact(item)">
                {{ item }}
              </div>
            </template>
            <div style="height: 30px"></div>
            <van-button
              style="width: 100%"
              round
              type="primary"
              @click="AddPaper"
            >
              添加
            </van-button>
          </van-cell-group>
        </div>
        <!-- 上傳附件 上傳文件支持格式 jpeg，jpg,gif,png,pdf -->
      </div>
    </van-popup>
    <!-- 添加鑰匙 -->
    <van-popup
      position="center"
      round
      closeable
      :style="{ width: '90%', height: '400px', overflow: 'hidden' }"
      v-model="AddKeyShow"
    >
      <div class="lc_paper">
        <div
          style="
            position: relative;
            float: left;
            width: 100%;
            padding-left: 10px;
            padding: 10px 30px;
          "
        >
          <div class="lc_title">新增鑰匙</div>
        </div>
        <div class="container">
          <van-cell-group>
            <van-field
              v-model="KeyBoxName"
              type="text"
              label="鑰匙箱"
              readonly
              placeholder="請選擇鑰匙箱"
              right-icon="arrow-down"
              @click-right-icon="Key_Box_Click"
            />
            <van-field
              v-model="lc_KeyBoxReceivedTime"
              type="text"
              label="收匙時間"
              placeholder="請選擇收匙時間"
              right-icon="arrow-down"
              @click-right-icon="KeyBoxReceivedTimeShow = true"
            />
            <van-field
              v-model="KeyBoxKeyCount"
              type="text"
              label="鑰匙數量"
              placeholder="請選擇鑰匙數量"
              right-icon="arrow-down"
              @click-right-icon="Ke_CollectTime"
            />
            <van-field
              v-model="KeyBoxNo"
              type="text"
              label="鑰匙箱編號"
              readonly
              placeholder="請輸入鑰匙箱編號"
            />
            <van-cell title="密碼鑰匙" clickable @click="KeyBoxTrue = false">
              <template #right-icon>
                <van-checkbox v-model="KeyBoxTrue" />
              </template>
            </van-cell>
            <!-- 匙收編號 -->
            <van-field
              v-model="KeyRecepitNo"
              type="text"
              label="匙收據編號"
              placeholder="請輸入匙收編號"
            />
            <!-- 鑰匙位置 -->
            <van-field
              v-model="KeyLocation"
              type="text"
              label="鑰匙位置"
              placeholder="請輸入鑰匙位置"
              @input="KeyBoxLocation_change"
            />
            <!-- 存放地 -->
            <van-cell>
              <van-radio-group v-model="KeyBoxLocation" direction="horizontal">
                <span class="storage_palce">存放地</span>
                <van-radio name="1" @click="KeyBoxLocation = '1'">
                  中原
                </van-radio>
                <van-radio name="2" @click="KeyBoxLocation = '2'">
                  行家
                </van-radio>
              </van-radio-group>
            </van-cell>
            <!--聯繫電話-->
            <van-field
              v-model="Phone"
              type="number"
              label="聯繫電話"
              placeholder="請輸入聯繫電話"
            />
            <van-field
              v-model="remark"
              rows="2"
              autosize
              label="備註"
              type="textarea"
              maxlength="200"
              placeholder="請輸入備註"
              show-word-limit
            />
            <!-- 收匙人 -->
            <van-field
              v-model="KeyReceiver"
              label="收匙人"
              round
              @input="Get_KeyReceiver"
              placeholder="請輸入收匙人"
            />
            <!-- 確定 -->
            <van-button type="primary" @click="Add_Key" block>
              確認新增
            </van-button>
          </van-cell-group>
        </div>
      </div>
    </van-popup>
    <!-- 鑰匙箱彈窗 -->
    <van-popup
      position="bottom"
      round
      :style="{ height: '30%', overflow: 'hidden' }"
      v-model="KeyBoxShow"
    >
      <van-picker
        show-toolbar
        :columns="KeyBoxList"
        @confirm="Key_Box_Select"
      />
    </van-popup>
    <!-- 收匙時間彈窗 -->
    <van-popup
      position="bottom"
      :style="{ height: '30%', overflow: 'hidden' }"
      v-model="KeyBoxReceivedTimeShow"
    >
      <van-datetime-picker
        v-model="KeyBoxReceivedTime"
        type="date"
        :title="title"
        placeholder="請選擇收匙時間"
        @confirm="Time_Select"
      />
    </van-popup>
    <!-- 鑰匙數量選取彈窗 -->
    <van-popup
      position="bottom"
      :style="{ height: '30%', overflow: 'hidden' }"
      v-model="KeyBoxKeyCountShow"
    >
      <van-picker
        show-toolbar
        :columns="KeyBoxKeyCountList"
        @confirm="Key_Box_Key_Count_Select"
      />
    </van-popup>
    <!-- 收匙人 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="KeyReceiverShow"
      closeable
    >
      <van-sticky>
        <form action="/">
          <div
            style="
              position: relative;
              top: 40px;
              margin-bottom: 30px;
              z-index: 3333;
            "
          >
            <van-cell-group>
              <van-search
                class="lc_search_person"
                v-model="KeyReceiver"
                show-action
                placeholder="请输入搜索关键词"
                @search="Get_KeyReceiver"
                @cancel="Cancel_Search"
              />
            </van-cell-group>
          </div>
        </form>
      </van-sticky>
      <!-- 多選 -->
      <template v-show="contact_Type">
        <div class="lc_van_scroll">
          <van-checkbox-group
            v-model="SearchPersonList"
            @change="KeyReceiver_change"
          >
            <van-cell-group>
              <van-cell
                v-for="(item, index) in PeopleInfo.UserDepartmentDatas"
                :key="index"
                :title="item.ResultName"
                @click="contact_Select(index)"
              >
                <template #right-icon>
                  <van-checkbox :name="item.ResultName" ref="checkboxes" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </template>

      <!-- 單選 -->
      <template v-show="lc_recevier">
        <div style="border: 1px solid pink" class="lc_van_scroll">
          <van-radio-group
            style="width: 95%"
            v-model="SearchPerson"
            @change="KeyReceiver_change"
          >
            <van-cell-group>
              <van-cell
                v-for="(item, index) in PeopleInfo.UserDepartmentDatas"
                :title="item.ResultName"
                :key="index"
                @click="KeyReceiver_Select(index)"
              >
                <template #right-icon>
                  <van-radio :name="index" ref="radiochecks" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </template>
    </van-popup>
    <!-- 鑰匙位置彈窗 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="KeyBoxLocationShow"
    >
      <van-sticky>
        <form action="/">
          <div
            style="
              position: relative;
              top: 40px;
              margin-bottom: 30px;
              z-index: 3333;
            "
          >
            <van-cell-group>
              <van-search
                class="lc_search_person"
                v-model="KeyLocation"
                show-action
                placeholder="请输入搜索关键词"
                @search="Get_KeyBox_Location"
                @cancel="Cancel_Get_KeyBox_Location"
              />
            </van-cell-group>
          </div>
        </form>
      </van-sticky>
      <div class="lc_van_scroll">
        <van-radio-group
          style="width: 95%"
          v-model="KeyLocation_radio"
          @change="KeyBoxLocation_change_change"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in PeopleInfo.UserDepartmentDatas"
              :title="item.ResultName"
              :key="index"
              @click="toogle_keybox(index)"
            >
              <template #right-icon>
                <van-radio :name="index" ref="radio_keybox" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
export { default } from "./details";
</script>
<style  lang="scss" scoped>
@import "details.scss";
</style>