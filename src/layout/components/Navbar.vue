<template>
  <div class="navbar">
    <img src="@/assets/common/logoone.png" class="sidebar-logo">
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="userImg" v-imagerror="defaultImg" :src="userImg" class="user-avatar">
          <img v-else :src="defaultImg" alt="">
          <span class="user">欢迎您：{{ name }}</span>
          <span class="el-icon-caret" @click="logout">退出<i class="el-icon-caret-bottom" /></span>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defaultImg from '@/assets/common/user.png'
export default {
  data() {
    return {
      defaultImg: defaultImg
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'userImg'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-logo {
      width: 90px;
      height: 35px;
      vertical-align: middle;
      margin-top: 6px;
      margin-left: 15px;
    }
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: url('~@/assets/common/backgroundone.png') no-repeat;
  background-size: cover;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 24px;
      width: 240px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 20px;
        }
        .el-icon-caret{
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .el-icon-caret-bottom {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
