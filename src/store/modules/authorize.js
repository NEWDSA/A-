import { getUser, setUser, removeUser } from '@/utils/auth'
import * as auth from '@/api/authentication'
import defaultSettings from '@/settings'

const state = {
    userInfo: JSON.parse(getUser()),//{},
}

const mutations = {
    SET_USER: (state, userInfo) => {
        state.userInfo = userInfo
        setUser(userInfo)
    },
    REMOVE_USER: (state) => {
        state.userInfo = null
        removeUser()
    }
}

const actions = {
    async getUserInfo({ commit }) {
        if (defaultSettings.DebugUser && defaultSettings.DebugUser.StaffNo != '') {
            commit('SET_USER', defaultSettings.DebugUser)
            return defaultSettings.DebugUser;
        } else {
            if (!state.userInfo){
                let wxUserCode = getParams('code')
                if (wxUserCode && wxUserCode != null) {
                    const userInfo = await auth.getUserInfo(wxUserCode);
                    if (userInfo && userInfo.data != null) {
                        commit('SET_USER', userInfo.data)
                    }
                } else {
                    goToLoginPage();
                }
            }
            return state.userInfo;
        }
    },
}

function getParams(paramsName) {
    let paramsStr = location.search;
    let paramsArr = paramsStr.replace('?', '').split('&');
    for (let i = 0; i < paramsArr.length; i++) {
        let item = paramsArr[i];
        let searchIndex = item.indexOf(paramsName);
        if (searchIndex !== -1 && item[searchIndex + paramsName.length] === '=') {
            return item.split('=')[1];
        }
    }
}

function goToLoginPage() {
    // 跳转至微信获取用户的重定向页面
    let currUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx46912e8ad481fd1b&redirect_uri=' + encodeURIComponent(window.location.href) + '&response_type=code&agentid=0&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect'
    window.location.href = currUrl
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}