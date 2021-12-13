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

          <div class="collapse" v-for="(item, index) in KeyList_mock">
            <div style="width: 100%" @click="AddKeyShow = true">
              <span class="lc_btn_add">添加</span>
            </div>
            <div>
              <span class="first">部門:</span>
              <span>{{ item.DepartmentName }}</span>
            </div>
            <div>
              <span class="first">業務員:</span>
              <span>{{ item.Receiver }}</span>
            </div>
            <div>
              <span class="first">鑰匙數量:</span>
              <span>{{ item.KeyCount }}</span>
            </div>
            <div>
              <span class="first">鑰匙狀態:</span>
              <span>{{ item.PropKeyStatus }}</span>
            </div>
            <div>
              <span class="first">鑰匙類型:</span>
              <span>{{ item.Type }}</span>
            </div>
            <div>
              <span class="first">鑰匙箱名稱:</span>
              <span>{{ item.KeyBoxName }}</span>
            </div>
          </div>
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
              label="放盤時間起"
              placeholder="請輸入放盤開始時間"
            />
            <van-field
              v-model="PaperEndTime"
              type="text"
              label="放盤日期止"
              placeholder="請輸入放盤日期止"
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
              <van-cell title="是否獨家" @click="exclusive = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="可否出售廣告" @click="exclusive = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-radio-group>

            <van-field
              v-model="PaperNo"
              label="放盤紙編號"
              placeholder="請輸入放盤紙編號"
            ></van-field>
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
            <van-button icon="contact" round type="primary" block>
              添加聯繫人
            </van-button>
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
    <!-- //TODO:添加鑰匙接口、獲取鑰匙 -->
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
              @click-right-icon="KeyBoxKeyCountShow = true"
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
                <van-radio name="1" @click="KeyBoxLocation = '1'">
                  中原
                </van-radio>
                <van-radio name="2" @click="KeyBoxLocation = '2'">
                  行家
                </van-radio>
              </van-radio-group>
            </van-cell>

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
        title="收匙時間"
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
      <div class="lc_van_scroll">
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
              @click="toogle_follow(index)"
            >
              <template #right-icon>
                <van-radio :name="index" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
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
export { default } from "././House_d";
</script>
<style  lang="scss" scoped>
@import "house_d.scss";
</style>