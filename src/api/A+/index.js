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
        }
        // end 客戶管理

    }
}