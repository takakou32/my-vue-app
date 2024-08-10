<template>
  <div class="monthly-attendance">
    <h2>月次勤怠管理</h2>
    <div class="flex justify-between items-center mb-4">
      <p>ようこそ、{{ username }}さん</p>
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
    const selectedMonth = ref(new Date().toISOString().slice(0, 7))
    const attendanceRecords = reactive({})

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

    watch(selectedMonth, fetchMonthlyAttendance)

    // 初回フェッチ
    fetchMonthlyAttendance()

    return {
      selectedMonth,
      attendanceRecords,
      daysInMonth,
      formatDate,
      handleSave
    }
  }
}
</script>

<style scoped>
.monthly-attendance {
  padding: 20px;
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
</style>
