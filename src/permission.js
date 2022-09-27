import router from './router'
import store from './store'
const whiteList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (store.getters.userId) {
      store.dispatch('user/getUserInfo', store.getters.userId)
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
