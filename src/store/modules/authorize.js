import {
  getUser,
  setUser,
  removeUser
} from '@/utils/auth'
import defaultSettings from '@/settings'
import aplush from "@/api/A+";

const state = {
  userInfo: getUser(),
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
  async getUserInfo({
    commit
  }) {
    //判斷是生產環境還是測試環境
    if (defaultSettings.DebugUser && defaultSettings.DebugUser.StaffNo != '' && defaultSettings.isProduction==false) {
      commit('SET_USER', defaultSettings.DebugUser)
      return defaultSettings.DebugUser;
    } else {
      if (!state.userInfo || state.userInfo == null) {
        let wxUserCode = getParams('code')
        if (wxUserCode && wxUserCode != null) {
          const res = await aplush.apis.workChatLogin({
            "WxCode": wxUserCode,
          });
          // 当前用户信息存入Cookies
          if (res && res != null) {
            commit('SET_USER', res)
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
  //重定向回原网页
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
