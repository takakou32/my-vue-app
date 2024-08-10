<template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">月次勤怠管理</h1>
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
        <button @click="goBack" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          戻る
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
  
      const daysInMonth = computed(() => {
        const [year, month] = selectedMonth.value.split('-')
        return new Date(year, month, 0).getDate()
      })
  
      const formatDate = (day) => {
        return `${selectedMonth.value}-${day.toString().padStart(2, '0')}`
      }
  
      const fetchMonthlyAttendance = async () => {
        // Here you would typically make an API call to fetch the data
        // For now, we'll just initialize empty records
        for (let i = 1; i <= daysInMonth.value; i++) {
          const date = formatDate(i)
          if (!attendanceRecords[date]) {
            attendanceRecords[date] = { clockIn: '', clockOut: '', note: '' }
          }
        }
      }
  
      const handleSave = async () => {
        // Here you would typically make an API call to save the data
        console.log('Saving attendance records:', attendanceRecords)
      }
  
      const goBack = () => {
        router.push('/')
      }
  
      watch(selectedMonth, fetchMonthlyAttendance)
  
      // Initial fetch
      fetchMonthlyAttendance()
  
      return {
        selectedMonth,
        attendanceRecords,
        daysInMonth,
        formatDate,
        handleSave,
        goBack
      }
    }
  }
  </script>