const UserKey = 'AplusUserInfo'

// 人为设置，如果当前时间已过期，则清空缓存
export function getUser() {
  const userInfo = JSON.parse(localStorage.getItem(UserKey));
  if (userInfo && Date.now() > userInfo.expireTime) {
    localStorage.removeItem(UserKey);
    return null;
  }
  return userInfo
}

// Cookies最大容量为4KB，无法存储，换成localStorage
export function setUser(userInfo) {
  // 设置localStorage, 1天后过期
  var expireTime = new Date();
  expireTime.setTime(expireTime.getTime() + 24 * 60 * 60 * 1000);
  userInfo.expireTime = expireTime;
  return localStorage.setItem(UserKey, JSON.stringify(userInfo));
}

// 清空缓存
export function removeUser() {
  if (!!localStorage) {
    localStorage.removeItem(UserKey);
  }
}
