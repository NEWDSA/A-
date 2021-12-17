<template>
  <div class="customer-detail">
    <van-sticky>
      <van-nav-bar
        title="客戶詳情"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </van-sticky>
    <van-card>
      <template #title>
        <div
          v-for="(item, index) in customer.Contacts"
          :key="index"
          style="
            display: flex;
            align-items: center;
            background-color: #ffffff;
            padding-left: 30px;
          "
        >
          <div style="width: 50%">
            <div
              style="width: fit-content; margin-left: 10px; margin-top: 10px"
            >
              <template
                v-if="
                  item.Gender == '女士' ||
                  item.Gender == '小姐' ||
                  (item.Gender == '太太' && customer.IsVip)
                "
              >
                <img style="width: 70px" src="/icon/woman_vip_pictur.png" />
              </template>
              <template
                v-else-if="
                  item.Gender == '女士' ||
                  item.Gender == '小姐' ||
                  (item.Gender == '太太' && customer.IsVip == false)
                "
              >
                <img
                  style="width: 40px"
                  src="/icon/nonmember_woman_picture.png"
                />
              </template>
              <template v-else-if="item.Gender == '先生' && customer.IsVip">
                <img style="width: 40px" src="/icon/man_vip_pictur.png" />
              </template>
              <template v-else>
                <img style="width: 40px" src="/icon/member_man_picture.png" />
              </template>
              <div
                style="
                  width: fit-content;
                  box-sizing: border-box;
                  border-radius: 8px;
                  box-shadow: 0px 0px 3px 1px rgba(110, 26, 26, 0.28);
                  background-color: #ffffff;
                  margin: 0px 0px 0px 10px;
                  padding: 0 10px 0 10px;
                  position: relative;
                  top: -13px;
                  left: 3px;
                  color: #de4135;
                  font-size: 12px;
                "
              >
                {{ item.Gender }}
              </div>
            </div>
            <div style="width: 100%" v-if="customer.Flag">
              <span>有效</span>
            </div>
          </div>

          <div style="margin-left: 5px; width: 50%">
            <div v-if="item.Mobile">手機:{{ item.Mobile }}</div>
            <div v-if="item.Tel">座機:{{ item.Tel }}</div>
            <div v-if="item.QQ">QQ:{{ item.QQ }}</div>
            <div v-if="item.Wechat">微信:{{ item.Wechat }}</div>
            <div v-if="item.DoB">生日:{{ item.DoB }}</div>
            <div v-if="item.Address">地址:{{ item.Address }}</div>
            <div v-if="item.Remark">備註:{{ item.Remark }}</div>
          </div>
        </div>
      </template>
    </van-card>
    <div class="lc_title">客戶需求</div>
    <van-divider />

    <div class="lc_house_container">
      <div class="lc_content">
        <span class="lc_trans">交易類型: </span>
        {{ customer.Parameter.InquiryTradeType }}
      </div>
      <div class="lc_content">
        <span class="lc_trans">心裡租價</span>
        {{ customer.Parameter.RentPrice }}
      </div>
      <div class="lc_content">
        <span class="lc_trans"> 房型 </span>

        {{ customer.Parameter.HouseType }}
      </div>
      <div class="lc_content">
        <span class="lc_trans"> 面積 </span>

        {{ customer.Parameter.Area }}
      </div>

      <div class="lc_content">
        <span class="lc_trans"> 朝向 </span>
        {{ customer.Parameter.HouseDirection }}
      </div>
      <!-- 樓層 -->
      <div class="lc_content">
        <span class="lc_trans"> 樓層 </span>
        {{ customer.Parameter.HouseFloor }}
      </div>
      <!-- 裝修情況 -->
      <div class="lc_content">
        <span class="lc_trans"> 裝修 </span>
        {{ customer.Parameter.DecorationSituation }}
      </div>
      <!-- 購房原因 -->
      <div class="lc_content">
        <span class="lc_trans"> 購房原因 </span>
        {{ customer.Parameter.BuyReason || "" }}
      </div>
      <!-- 來源 -->
      <div class="lc_content" v-if="customer.ParameterInquirySource">
        <span class="lc_trans">來源</span>
        {{ customer.ParameterInquirySource }}
      </div>
    </div>
    <!-- 跟進記錄 、帶看記錄 -->
    <van-tabs title-inactive-color="#333333" title-active-color="#de4135">
      <van-tab title="跟進記錄">
        <div class="lc_table_container">
          <table class="lc_table">
            <tr>
              <th>跟進內容</th>
              <th>業務員</th>
              <th>跟進時間</th>
            </tr>
            <tr v-for="(item, index) in CustomFollowUp.InqFollows" :key="index">
              <td>{{ item.FollowContent }}</td>
              <td>{{ item.FollowPerson }}</td>
              <td>{{ item.FollowDate }}</td>
            </tr>
          </table>
        </div>
      </van-tab>
      <van-tab title="帶看記錄">
        <div class="lc_table_container">
          <table class="lc_table">
            <tr>
              <th>房源樓盤</th>
              <th>帶看時間</th>
              <th>帶看人員</th>
              <th>帶看內容</th>
            </tr>
            <tr
              v-for="(item, index) in CustomTakeLook.TakeSeeLists"
              :key="index"
            >
              <td>{{ item.EstateName }}</td>
              <td>{{ item.TakeSeeTime | formatDate }}</td>
              <td>{{ item.LookWithUserName }}</td>
              <td>{{ item.Content }}</td>
            </tr>
          </table>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 新增跟進、錄入帶看 -->
    <div class="lc_follow">
      <img src="/icon/float_follow-up_icon.png" />
      <img src="/icon/float_seeing-look_icon.png" @click="onClickLookRecord" />
    </div>
  </div>
</template>

<script>
 export {default} from './details'
</script>

<style lang="scss" scoped>
@import './details.scss';
</style>