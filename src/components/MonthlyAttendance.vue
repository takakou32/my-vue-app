<template>
  <div class="main">
    <header>
      <button @click="toggleMenu" class="menu-button">☰</button>
      <h1>月次勤怠管理</h1>
    </header>
    <nav :class="{ 'open': isMenuOpen }">
      <ul>
        <li><a href="#" @click="navigateTo('/main')">ホーム</a></li>
        <li><a href="#" @click="navigateTo('/main')">メイン画面</a></li>
        <li><a href="#" @click="navigateTo('/attendance')">勤怠入力</a></li>
        <li><a href="#" @click="logout">ログアウト</a></li>
      </ul>
    </nav>
    <main>
      <div class="flex justify-between items-center mb-4">
        <p>ようこそ、{{ user }}さん</p>
      </div>
      <div class="flex space-x-4 mb-4">
        <input
          type="month"
          v-model="selectedMonth"
          class="border rounded py-2 px-3"
        >
        <button @click="handleSave" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          保存
        </button>
      </div>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">日付</th>
            <th class="py-2 px-4 border-b">出勤時間</th>
            <th class="py-2 px-4 border-b">退勤時間</th>
            <th class="py-2 px-4 border-b">備考</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in daysInMonth" :key="day">
            <td class="py-2 px-4 border-b">{{ formatDate(day) }}</td>
            <td class="py-2 px-4 border-b">
              <input
                type="time"
                v-model="attendanceRecords[formatDate(day)].clockIn"
                class="border rounded py-1 px-2"
              >
            </td>
            <td class="py-2 px-4 border-b">
              <input
                type="time"
                v-model="attendanceRecords[formatDate(day)].clockOut"
                class="border rounded py-1 px-2"
              >
            </td>
            <td class="py-2 px-4 border-b">
              <input
                type="text"
                v-model="attendanceRecords[formatDate(day)].note"
                class="border rounded py-1 px-2 w-full"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MonthlyAttendance',
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter()
    const selectedMonth = ref(new Date().toISOString().slice(0, 7))
    const attendanceRecords = reactive({})
    const isMenuOpen = ref(false)

    const daysInMonth = computed(() => {
      const [year, month] = selectedMonth.value.split('-')
      return new Date(year, month, 0).getDate()
    })

    const formatDate = (day) => {
      return `${selectedMonth.value}-${day.toString().padStart(2, '0')}`
    }

    const fetchMonthlyAttendance = async () => {
      // ここでAPIコールを行うことを想定
      for (let i = 1; i <= daysInMonth.value; i++) {
        const date = formatDate(i)
        if (!attendanceRecords[date]) {
          attendanceRecords[date] = { clockIn: '', clockOut: '', note: '' }
        }
      }
    }

    const handleSave = async () => {
      // ここでAPIコールを行うことを想定
      console.log('Saving attendance records:', attendanceRecords)
    }

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const navigateTo = (path) => {
      router.push(path)
      isMenuOpen.value = false
    }

    const logout = () => {
      // ログアウト処理を実装
      router.push('/login')
    }

    watch(selectedMonth, fetchMonthlyAttendance)

    // 初回フェッチ
    fetchMonthlyAttendance()

    return {
      selectedMonth,
      attendanceRecords,
      daysInMonth,
      formatDate,
      handleSave,
      isMenuOpen,
      toggleMenu,
      navigateTo,
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