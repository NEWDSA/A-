import {
  getUser,
  setUser,
  removeUser
} from '@/utils/auth'
import * as auth from '@/api/authentication'
import defaultSettings from '@/settings'
import aplush from "@/api/A+";
import axios from 'axios';


const state = {
  userInfo: JSON.parse(getUser()), //{},
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
    if (defaultSettings.DebugUser && defaultSettings.DebugUser.StaffNo != '') {
        commit('SET_USER', defaultSettings.DebugUser)

        return defaultSettings.DebugUser;
    } else {
    if (!state.userInfo) {
      let wxUserCode = getParams('code')
       var userInfo=null;
      if (wxUserCode && wxUserCode != null) {
        const userInfo = await auth.getUserInfo(wxUserCode);
        // aplush.apis.workChatLogin({
        //   "WxCode": wxUserCode,
        // }).then(res => {
        //   userInfo=res;
        // })
        
        console.log('一定要打印出來');
        console.log(userInfo);
        if (userInfo && userInfo.data != null) {
          commit('SET_USER', userInfo.data)
          //獲取用戶信息
        }
      } else {
        goToLoginPage();
        console.log('Luciano 获取用户信息');
        console.log(state.userInfo);
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

