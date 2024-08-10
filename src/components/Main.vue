<template>
    <div class="main">
      <header>
        <button @click="toggleMenu" class="menu-button">☰</button>
        <h1>メイン画面</h1>
      </header>
      <nav :class="{ 'open': isMenuOpen }">
        <ul>
          <li><a href="#" @click="closeMenu">ホーム</a></li>
          <li><a href="#" @click="closeMenu">プロフィール</a></li>
          <li><a href="#" @click="closeMenu">設定</a></li>
          <li><a href="#" @click="navigateToAttendance">勤怠入力</a></li>
          <li><a href="#" @click="logout">ログアウト</a></li>
        </ul>
      </nav>
      <main>
        <p>ようこそ、メイン画面へ！</p>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Main',
    data() {
      return {
        isMenuOpen: false
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
      },
      closeMenu() {
        this.isMenuOpen = false
      },
      navigateToAttendance() {
        this.closeMenu()
        this.$router.push('/attendance')
      },
      logout() {
        // ログアウト処理を実装
        this.$router.push('/login')
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
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
}
.menu-button {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}
nav {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: #333;
  transition: 0.3s;
}
nav.open {
  left: 0;
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav ul li a {
  display: block;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
}
main {
  padding: 20px;
}
</style>