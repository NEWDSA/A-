import lc_request from '@/utils/request'
import axios from 'axios'
import {
  param
} from 'jquery'

export default {
  apis: {
    // 搜索智能提示
    searchSuggest(params) {
      // url: 'api/Property/find-estate-auto',
      // method: 'post',
      // data:params
      return lc_request({
        url: 'api/Property/find-estate-auto',
        method: 'post',
        data: params
      })
    },
    // 首页轮播
    getBanner() {

      return lc_request({
        // url: '/moaplusapi/System/GetSystemBannerList',
        url: '/GetSystemBannerList',
        method: 'get',
        headers: {

          'Content-Type': 'application/json;charset=UTF-8'
        },

      })
    },
    //获取房源列表
    Listinglist(params) {
      return lc_request({
        url: '/api/Property/war-zone',
        method: 'post',
        data: params
      })
    },
    //獲取房源詳情
    ListingDetail(keyId) {
      return lc_request({
        url: `/api/Property/details?KeyId=${keyId}`,
        method: 'get'
      })

    },
    // 房源狀態篩選
    ListingStatus(params) {
      return lc_request({
        url: '/api/Property/find-property-status',
        method: 'get',
        params: params
      })
    },
    //獲取系統類型
    SystemType(Type) {
      return lc_request({
        url: '/api/System/find-sys-items',
        params: Type,
        method: 'get'
      })
    },
    //房源跟进
    ListiongFollow(params) {
      return lc_request({
        url: '/api/Property/follows',
        method: 'get',
        params: {
          PageIndex: params.PageIndex,
          PageSize: params.PageSize,
          FollowTypeKeyId: params.FollowTypeKeyId,
          IsDetails: params.IsDetails,
          PropertyKeyId: params.PropertyKeyId
        }
      })
    },
    //客戶管理
    CustomList(params) {
      return lc_request({
        url: '/api/Customer/All-Inquirys',
        method: 'post',
        data: params
      })
    },
    // 添加客户
    AddCustom(params) {
      return lc_request({
        url: '/api/Customer/add_inquiry',
        method: 'post',
        data: params
      })
    },
    // 帶看記錄 客源
    LookRecord(params) {
      return lc_request({
        url: '/api/Customer/Take-See-Inquiry-Follows',
        method: 'post',
        data: params
      })
    },
    // 帶看樓盤
    LookRecordFloor(params) {
      return lc_request({
        url: '/api/Customer/find-property-take-see',
        method: 'post',
        data: params
      })
    },
    //帶看客戶詳情
    LookRecordDetail(KeyId) {
      return lc_request({
        url: '/api/Customer/Detail',
        method: 'get',
        params: KeyId
      })
    },
    //客戶跟進
    CustomFollow(params) {
      return lc_request({
        url: '/api/Customer/Inquiry-follows',
        method: 'post',
        data: params
      })
    },
    //客戶帶看記錄
    CustomLookRecord(params) {
      return lc_request({
        url: '/api/Customer/Take-See-Inquiry-Follows',
        method: 'post',
        data: params
      })
    },
    // 搜索帶看樓盤
    SearchLookRecordFloor(params) {
      return lc_request({
        url: '/api/Customer/find-property-take-see',
        method: 'post',
        data: params
      })
    },
    // 選擇人員或部門
    SelectPerson(params) {
      return lc_request({
        url: '/api/Common/Get-User-Depart-Auto-Complete',
        method: 'post',
        data: params
      })
    },
    // 開通vip
    OpenVip(params) {
      return lc_request({
        url: '/api/Customer/open-inquirys-member',
        method: 'post',
        data: params
      })
    },
    // 添加帶看記錄
    AddLookRecord(params) {
      return lc_request({
        url: '/api/Customer/Inquiry-take-see-follow-add',
        method: 'post',
        data: params
      })
    },
    // 添加收藏
    AddCollection(params) {
      return lc_request({
        url: '/api/Customer/add-collection',
        method: 'post',
        data: params
      })
    },

    // 上傳文件至服務器接口
    UploadFile(params) {
      return lc_request({
        url: '/upload',
        method: 'post',
        data: params
      })
    }
  }
}
