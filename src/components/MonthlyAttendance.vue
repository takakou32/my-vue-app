<template>
  <div class="monthly-attendance">
    <div class="header">
      <h2>勤怠実績</h2>
      <div class="user-info">
        <span>社員番号: 1111</span>
        <span>氏名: {{ username }}</span>
        <span>雇用形態: 管理監督者</span>
      </div>
    </div>
    <div class="controls">
      <select v-model="selectedYear" class="border rounded py-1 px-2">
        <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
      </select>
      <select v-model="selectedMonth" class="border rounded py-1 px-2">
        <option v-for="month in months" :key="month" :value="month">{{ month }}月</option>
      </select>
      <button @click="handleSave" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
        PDF出力
      </button>
    </div>
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-2 border-b">日付</th>
          <th class="py-2 px-2 border-b">勤務区分</th>
          <th class="py-2 px-2 border-b">出勤時刻</th>
          <th class="py-2 px-2 border-b">退勤時刻</th>
          <th class="py-2 px-2 border-b">休憩時間</th>
          <th class="py-2 px-2 border-b">申請承認</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in daysInMonth" :key="day" :class="getDayClass(day)">
          <td class="py-1 px-2 border-b">{{ formatDate(day) }} ({{ getWeekday(day) }})</td>
          <td class="py-1 px-2 border-b">
            <select v-model="attendanceRecords[formatDate(day)].workType" class="border rounded py-1 px-2 w-full">
              <option value="出勤">出勤</option>
              <option value="休日">休日</option>
              <option value="有給">有給</option>
            </select>
          </td>
          <td class="py-1 px-2 border-b">
            <input type="time" v-model="attendanceRecords[formatDate(day)].clockIn" class="border rounded py-1 px-2 w-full">
          </td>
          <td class="py-1 px-2 border-b">
            <input type="time" v-model="attendanceRecords[formatDate(day)].clockOut" class="border rounded py-1 px-2 w-full">
          </td>
          <td class="py-1 px-2 border-b">
            <input type="text" v-model="attendanceRecords[formatDate(day)].breakTime" class="border rounded py-1 px-2 w-full" placeholder="1:00">
          </td>
          <td class="py-1 px-2 border-b">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
              申請
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, watch, reactive } from 'vue'

export default {
  name: 'MonthlyAttendance',
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const currentDate = new Date()
    const selectedYear = ref(currentDate.getFullYear())
    const selectedMonth = ref(currentDate.getMonth() + 1)
    const attendanceRecords = reactive({})

    // 年の選択肢（現在の年から前後5年）
    const years = computed(() => {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)
    })

    // 月の選択肢
    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const daysInMonth = computed(() => {
      return new Date(selectedYear.value, selectedMonth.value, 0).getDate()
    })

    const formatDate = (day) => {
      return `${selectedMonth.value.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
    }

    const getWeekday = (day) => {
      const date = new Date(selectedYear.value, selectedMonth.value - 1, day)
      const weekdays = ['日', '月', '火', '水', '木', '金', '土']
      return weekdays[date.getDay()]
    }

    const isHoliday = (day) => {
      const date = new Date(selectedYear.value, selectedMonth.value - 1, day)
      // 簡易的な祝日判定（本番環境では外部ライブラリや API を使用することをお勧めします）
      const holidays = [
        '1-1', '1-2', '1-9', '2-11', '2-23', '3-21', '4-29', '5-3', '5-4', '5-5',
        '7-17', '8-11', '9-18', '10-9', '11-3', '11-23'
      ]
      const monthDay = `${selectedMonth.value}-${day}`
      return holidays.includes(monthDay)
    }

    const getDayClass = (day) => {
      const date = new Date(selectedYear.value, selectedMonth.value - 1, day)
      const weekday = date.getDay()
      if (weekday === 0 || isHoliday(day)) {
        return 'bg-red-100'
      } else if (weekday === 6) {
        return 'bg-green-100'
      }
      return ''
    }

    const fetchMonthlyAttendance = () => {
      // ここでAPIコールを行うことを想定
      const newRecords = {}
      for (let i = 1; i <= daysInMonth.value; i++) {
        const date = formatDate(i)
        newRecords[date] = attendanceRecords[date] || { workType: '出勤', clockIn: '', clockOut: '', breakTime: '' }
      }
      Object.assign(attendanceRecords, newRecords)
    }

    const handleSave = async () => {
      // ここでAPIコールを行うことを想定
      console.log('Saving attendance records:', attendanceRecords)
    }

    watch([selectedYear, selectedMonth], fetchMonthlyAttendance)

    // 初回フェッチ
    fetchMonthlyAttendance()

    return {
      selectedYear,
      selectedMonth,
      attendanceRecords,
      daysInMonth,
      formatDate,
      getWeekday,
      getDayClass,
      handleSave,
      years,
      months
    }
  }
}
</script>

<style scoped>
.monthly-attendance {
  padding: 20px;
  font-size: 14px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  gap: 20px;
}
.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.bg-red-100 {
  background-color: #fee2e2;
}
.bg-green-100 {
  background-color: #dcfce7;
}
</style>