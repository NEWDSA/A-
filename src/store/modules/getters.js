const getters = {
  userInfo : state => state.authorize.userInfo,
  token: state => state.authorize.token,
  // loginUser:state=>state.authorize.loginUser,
  msg:state=>state.bage.unread_count
}
export default getters
