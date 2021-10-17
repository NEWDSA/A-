import Cookies from 'js-cookie'

const UserKey = 'userInfo'

export function getUser() {
  const userInfo = Cookies.get(UserKey) && 
                Cookies.get(UserKey) != 'null' ? Cookies.get(UserKey) : null
  return userInfo
}

export function setUser(userInfo) {
  return Cookies.set(UserKey, userInfo)
}

export function removeUser() {
  return Cookies.remove(UserKey)
}
