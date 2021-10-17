import request from '@/utils/request'

// 获取号码省市小区等统计信息
export function getLocationLookUpData(){
    return request({
        url: '/api/ColdCall/GetAreaParameters',
        method: 'get',
    })
}

// 获取新记录
export function getNewContactList(params){
  return request({
    url: '/api/ColdCall/GetContactList',
    method: 'post',
    data:params
  })
}

// 获取当前未拨打完的号码
export function getContactList(staffNo){
  return request({
    url: `/api/ColdCall/GetColdCallList?staffNo=${staffNo}`,
    method: 'get'
  })
}

// 获取电话详情
export function getColdCallDetails(id){
  return request({
    url: `/api/ColdCall/GetColdCallDetails?detailsId=${id}`,
    method: 'get'
  })
}

// 获取已拨号记录
export function getColdCallList(params){
    return request({
        url: '/api/ColdCall/GetHasCallList',
        method: 'post',
        data:params
    });

    // const items = coldCallData.items
    //   return {
    //     code: 20000,
    //     data: {
    //       total: items.length,
    //       items: items
    //     }
    //   };
}

// 拨打电话
export function callPhone(params){
  return request({
    url: '/api/ColdCall/CallPhone',
    method: 'post',
    data:params
  })
}

// 保存拨号状态、备注信息
export function modifyColdCall(params){
  return request({
    url: '/api/ColdCall/ModifyColdCall',
    method: 'post',
    data:params
  })
}
