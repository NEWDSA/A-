<template>
  <div id="cus">
    <div class="fixed">
      <img src="/icon/new-customers_icon.png" @click="AddCustomer()" alt="" />
      <img src="/icon/poll_float_icon.png" alt="" />
      <img src="/icon/look_icon.png" @click="AddLook()" alt="" />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        margin: auto;
        width: 100%;
        justify-content: end;
        background-color: #fff;
      "
    >
      <div style="height: auto; flex: 8">
        <van-search
          class="search"
          style="width: 100%"
          placeholder="輸入姓名／手機/目標樓盤"
          v-model="lc_sccustom"
          @search="onSearch"
        />
      </div>
      <div style="flex: 1" @click="lc_filter">
        <img class="lc_search" src="/icon/screen_icon.png" alt="" />
      </div>
    </div>

    <article class="lc_article" v-if="CustomList.length>0">
      <section>
        <template v-for="(item, index) in Custom_Status.Items">
          <div
            :class="item.isSelected ? 'div_active' : 'div_unactive'"
            @click="Customer_status(item.KeyId)"
          >
            {{ item.ItemName }}
          </div>
        </template>
      </section>
    </article>
    <van-pull-refresh
      v-model="pullLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="沒有更多了"
        @load="onLoad"
      >
        <!-- 沒有數據描述 -->
        <van-empty v-if="CustomList.length === 0" description="沒有相關數據" />
        <nav v-for="(item, index) in CustomList" :key="index">
          <div class="fx">
            <div class="avater">
              <template v-if="item.Male && item.IsVip">
                <img src="/icon/man_vip_pictur.png" alt="" />
              </template>

              <template v-else-if="item.Male && item.IsVip != 'true'">
                <img src="/icon/member_man_picture.png" alt="" />
              </template>

              <template v-else-if="item.Male != 'true' && item.IsVip">
                <img src="/icon/woman_vip_pictur.png" />
              </template>
              <template v-else>
                <img src="/icon/nonmember_woman_picture.png" />
              </template>
              <button>{{ item.InquiryStatus }}</button>
            </div>
            <div style="background-color: #f7f7f7; border-radius: 1px">
              <div class="daikan">
                <span>{{ item.TakeSeeCount }}</span>
                <div>帶看</div>
              </div>
              <div class="chengjiao">
                <span>{{ item.ReserveCount }}</span>
                <div>成交</div>
              </div>
            </div>
          </div>
          <div class="fx">
            <aside>
              <div style="font-weight: 700; font-size: 16px">
                {{ item.CustomerName }}
              </div>
              <van-button type="primary" class="btn_f" size="mini">
                {{ item.InquiryTradeType }}
              </van-button>
              <van-button
                type="primary"
                class="btn_s"
                size="mini"
                v-if="item.HouseType"
              >
                {{ item.HouseType }}
              </van-button>
            </aside>
            <aside style="font-size: 14px">
              <div>{{ item.InquiryTradeType }}價：</div>
              <template v-if="item.InquiryTradeType == '租购'">
                {{ item.RentPrice }}元
              </template>
              <template v-else>
                <div>{{ item.SalePrice }}萬</div>
              </template>
            </aside>
            <aside style="font-size: 14px">
              <div>所屬人:</div>
              <div>{{ item.RegPerson }}</div>
            </aside>
            <aside style="font-size: 14px">
              <div>最後跟進:</div>
              <div>{{ item.LastFollowDate }}</div>
            </aside>
            <aside style="font-size: 14px">
              <div>{{ item.Remark }}</div>
            </aside>
          </div>
        </nav>
      </van-list>
    </van-pull-refresh>

    <!-- 客户内容 -->
    <van-popup
      v-model="show_filter"
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      round
    >
      <van-sticky>
        <div class="lc_filter">篩選條件</div>
      </van-sticky>

      <van-divider />
      <div class="lc_layout">
        <!-- 交易類型 -->
        <div class="lc_title" v-if="TransType.SysParameter.ParameterName">
          {{ TransType.SysParameter.ParameterName }}
        </div>
        <div style="display: flex; margin-left: 10px">
          <template v-for="(item, index) in TransType.Items">
            <div
              :class="TransIndex === index ? 'lc_type_active' : 'lc_type'"
              @click="e_tranType(index)"
            >
              {{ item.ItemName }}
            </div>
          </template>
        </div>
        <!-- end 交易類型 -->
        <!-- 租價 -->
        <div class="lc_title">心裡租價</div>
        <div class="lc_container">
          <input class="lc_input" v-model="start_mindRent" type="text" />
          <div class="lc_divider" />
          <input type="text" v-model="end_mindRent" class="lc_input" />
          <div class="lc_unit">元</div>
        </div>
        <!-- end 租價 -->
        <!-- 購價 -->
        <div class="lc_title">心裡購價</div>
        <div class="lc_container">
          <input class="lc_input" v-model="start_mindBuy" type="text" />
          <div class="lc_divider" />
          <input class="lc_input" v-model="end_mindBuy" type="text" />
          <div class="lc_unit">萬</div>
        </div>
        <!-- end 購價 -->
        <!-- 房型 -->
        <div class="lc_title" v-if="RoomType.SysParameter.ParameterName">
          {{ RoomType.SysParameter.ParameterName }}
        </div>
        <div class="lc_h_layout">
          <div
            style="display: flex; justify-content: center"
            v-for="(item, index) in RoomType.Items"
            :key="index"
          >
            <div
              :class="RoomIndex === index ? 'lc_type_active' : 'lc_type'"
              @click="e_RoomType(index)"
            >
              {{ item.ItemName }}
            </div>
          </div>
        </div>
        <!-- end 房型 -->
        <div class="lc_title">客源歸屬</div>
        <div style="display: flex">
          <input
            type="text"
            v-model="depart_name"
            class="lc_department"
            placeholder="請輸入部門名稱"
            @input="e_depart_name(depart_name,2)"
          />

          <input
            type="text"
            v-model="sales_man"
            class="lc_sales_man"
            @change="e_depart_name(sales_man,1)"
            placeholder=" 請輸入業務員姓名"
          />
        </div>
        <div class="lc_title" v-if="Floor.SysParameter.ParameterName">
          {{ Floor.SysParameter.ParameterName }}
        </div>
        <div
          style="display: flex; justify-content: space-evenly; flex-wrap: wrap"
        >
          <template v-for="(item, index) in Floor.Items">
            <div
              style="display: flex; justify-content: center"
              @click="e_Floor(index)"
            >
              <div :class="FloorIndex === index ? 'lc_type_active' : 'lc_type'">
                {{ item.ItemName }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div
        style="
          position: relative;
          height: 60px;
          width: 100%;
          display: flex;
          justify-content: center;
          bottom: -0.14rem;
        "
      >
        <div style="width: 50%; display: flex; justify-content: center">
          <van-button
            style="display: inline-block; justify-content: center; flex: 1"
            >重置</van-button
          >
        </div>
        <div
          style="width: 50%; display: flex; justify-content: center"
          @click="Custom_filter"
        >
          <van-button
            style="display: inline-block; justify-content: center; flex: 1"
            >確定</van-button
          >
        </div>
      </div>
    </van-popup>
    <!-- end 内容筛选弹出层 -->

    <!-- 智能提示彈出層 -->
    <van-popup
      position="bottom"
      :style="{ height: '70%', overflow: 'hidden' }"
      v-model="show_tips"
      closeable
      @click-close-icon="close_item"

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
                v-model="search_content"
                show-action
                placeholder="请输入搜索关键词"
                @search="Get_KeyReceiver(search_content,1)"
                @cancel="Cancel_Search"
              />
            </van-cell-group>
          </div>
        </form>
      </van-sticky>
      <!-- 單選 -->
      <div  class="lc_van_scroll">
        <van-radio-group
          style="width: 95%"
          v-model="SearchPerson"
          @change="KeyReceiver_change"
        >
          <van-cell-group>
            <van-cell
              v-for="(item, index) in suggest.UserDepartmentDatas"
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
    </van-popup>
  </div>
</template>
<script>
export { default } from "././index";
</script>
<style scoped lang="scss">
@import "index.scss";
</style>
