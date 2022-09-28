const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.userMsg.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.userName,
  userId: state => state.user.userMsg.userId,
  userImg: state => state.user.userInfo.image
}
export default getters
