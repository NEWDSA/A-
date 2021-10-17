import request from '@/utils/request'

export function getUserInfo(wxUserCode){
    return request({
        url: `/api/Wechat/GetUser?code=${wxUserCode}`,
        method: 'post',
    })
}