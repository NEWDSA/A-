import request from '@/utils/request'

export function getUserInfo(wxUserCode){
    return request({
        url: `https://hq.centaline.com.cn/HqProcessApi/api/Wechat/GetUser?code=${wxUserCode}`,
        // url: `/api/Wechat/GetUser?code=${wxUserCode}`,
        method: 'post',
    })
}