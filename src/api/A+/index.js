import lc_request from '@/utils/request'
import { param } from 'jquery'

export default {
    apis: {
        //获取房源列表
        Listinglist(params) {
            return lc_request({
                url: '/api/Property/war-zone',
                method: 'post',
                data: params
            })
        },
        // end获取房源列表
        //獲取房源詳情
        ListingDetail(keyId) {
            return lc_request({
                url: `/api/Property/details?KeyId=${keyId}`,
                method: 'get'
            })

        },
        // end 獲取房源詳情
        //獲取系統類型
        // end 獲取系統類型
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
        // endd 房源跟进
        // 房源跟进详情

        // end 房源跟进详情
        // 撥打業主電話

        // end 撥打業主電話
        //客戶管理
        CustomList(params) {
            return lc_request({
                url: '/api/Customer/All-Inquirys',
                method: 'post',
                data: params
            })
        },
        // end 客戶管理
        // 添加客户
        AddCustom(params) {
            return lc_request({
                url: '/api/Customer/add_inquiry',
                method: 'post',
                data: params
            })
        },
        // end 添加客户
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
        // end 帶看記錄
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

        // 開通vip
        OpenVip(params) {
            return lc_request({
                url: '/api/Customer/open-inquirys-member',
                method: 'post',
                data: params
            })
        }
        // end 開通vip

    }
}