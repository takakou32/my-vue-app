<template>
  <div class="main">
    <header>
      <div class="header-content">
        <h1>メイン画面</h1>
        <p>ようこそ、{{ username }}さん</p>
      </div>
      <nav>
        <ul>
          <li><a href="#" @click="closeMenu">ホーム</a></li>
          <li><a href="#" @click="closeMenu">プロフィール</a></li>
          <li><a href="#" @click="closeMenu">設定</a></li>
          <li><a href="#" @click="navigateToAttendance">勤怠入力</a></li>
          <li><a href="#" @click="logout">ログアウト</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view :username="username"></router-view>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Main',
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const closeMenu = () => {
      // この関数は不要になりましたが、元のコードとの整合性のために残しています
    }

    const navigateToAttendance = () => {
      router.push({ name: 'attendance', params: { username: props.username } })
    }

    const logout = () => {
      router.push({ name: 'login' })
    }

    return {
      closeMenu,
      navigateToAttendance,
      logout
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-content h1 {
  margin-right: 20px;
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-left: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

main {
  padding: 20px;
}
</style>