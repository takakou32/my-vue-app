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
      <select v-model="selectedYear" class="border rounded py-3 px-6">
        <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
      </select>
      <select v-model="selectedMonth" class="border rounded py-3 px-6">
        <option v-for="month in months" :key="month" :value="month">{{ month }}月</option>
      </select>
    </div>

    <div class="regular-hours-section">
      <div class="regular-hours-table">
        <table class="min-w-full bg-white border">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">定時開始時刻</th>
              <th class="py-2 px-4 border-b">定時終了時刻</th>
              <th class="py-2 px-4 border-b">休憩時間</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border-b">
                <select v-model="regularHours.start" class="border rounded py-1 px-2 w-full">
                  <option value="">選択してください</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </td>
              <td class="py-2 px-4 border-b">
                <select v-model="regularHours.end" class="border rounded py-1 px-2 w-full">
                  <option value="">選択してください</option>
                  <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </td>
              <td class="py-2 px-4 border-b">
                <select v-model="regularHours.breakTime" class="border rounded py-1 px-2 w-full">
                  <option value="">選択してください</option>
                  <option v-for="time in breakTimeOptions" :key="time" :value="time">{{ time }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button 
        @click="autoFillRegularHours" 
        class="auto-fill-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
        style="background-color: #10B981; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; font-weight: bold; display: block; width: 100%; max-width: 400px;"
      >
        定時自動入力
      </button>
    </div>

    <div class="table-container">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-2 border-b">日付</th>
            <th class="py-2 px-2 border-b">勤務区分</th>
            <th class="py-2 px-2 border-b">出勤時刻</th>
            <th class="py-2 px-2 border-b">退勤時刻</th>
            <th class="py-2 px-2 border-b">休憩時間</th>
            <th class="py-2 px-2 border-b">深夜休憩時間</th>
            <th class="py-2 px-2 border-b">時間外作業時間</th>
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
              <select v-model="attendanceRecords[formatDate(day)].clockIn" class="border rounded py-1 px-2 w-full">
                <option value="">選択してください</option>
                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </td>
            <td class="py-1 px-2 border-b">
              <select v-model="attendanceRecords[formatDate(day)].clockOut" class="border rounded py-1 px-2 w-full">
                <option value="">選択してください</option>
                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </td>
            <td class="py-1 px-2 border-b">
              <select v-model="attendanceRecords[formatDate(day)].breakTime" class="border rounded py-1 px-2 w-full">
                <option value="">選択してください</option>
                <option v-for="time in breakTimeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </td>
            <td class="py-1 px-2 border-b">
              <select v-model="attendanceRecords[formatDate(day)].nightBreakTime" class="border rounded py-1 px-2 w-full">
                <option value="">選択してください</option>
                <option v-for="time in breakTimeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </td>
            <td class="py-1 px-2 border-b">
              <select v-model="attendanceRecords[formatDate(day)].overtimeHours" class="border rounded py-1 px-2 w-full">
                <option value="">選択してください</option>
                <option v-for="time in overtimeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </td>
            <td class="py-1 px-2 border-b">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm" style="background-color: #3B82F6; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-weight: bold; font-size: 0.875rem;">
                申請
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="fixed-buttons">
      <button @click="handleInputCheck" class="check-button">
        入力チェック
      </button>
      <button @click="handleSave" class="save-button">
        保存
      </button>
    </div>
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
    const regularHours = reactive({
      start: '',
      end: '',
      breakTime: ''
    })

    const years = computed(() => {
      const currentYear = new Date().getFullYear()
      return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)
    })

    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const timeOptions = computed(() => {
      const options = []
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          options.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
        }
      }
      return options
    })

    const breakTimeOptions = computed(() => {
      const options = []
      for (let minute = 15; minute <= 60; minute += 15) {
        options.push(`${Math.floor(minute / 60).toString().padStart(2, '0')}:${(minute % 60).toString().padStart(2, '0')}`)
      }
      return options
    })

    const overtimeOptions = computed(() => {
      const options = []
      for (let minute = 15; minute <= 480; minute += 15) {
        options.push(`${Math.floor(minute / 60).toString().padStart(2, '0')}:${(minute % 60).toString().padStart(2, '0')}`)
      }
      return options
    })

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
      const newRecords = {}
      for (let i = 1; i <= daysInMonth.value; i++) {
        const date = formatDate(i)
        newRecords[date] = attendanceRecords[date] || {
          workType: '出勤',
          clockIn: '',
          clockOut: '',
          breakTime: '',
          nightBreakTime: '',
          overtimeHours: ''
        }
      }
      Object.assign(attendanceRecords, newRecords)
    }

    const handleSave = async () => {
      console.log('Saving attendance records:', attendanceRecords)
      console.log('Regular hours:', regularHours)
      alert('保存が完了しました。')
    }

    const autoFillRegularHours = () => {
      if (!regularHours.start || !regularHours.end || !regularHours.breakTime) {
        alert('定時の開始時刻、終了時刻、および休憩時間を設定してください。')
        return
      }

      for (let day = 1; day <= daysInMonth.value; day++) {
        const date = new Date(selectedYear.value, selectedMonth.value - 1, day)
        const weekday = date.getDay()
        const formattedDate = formatDate(day)

        if (weekday !== 0 && weekday !== 6 && !isHoliday(day)) {
          attendanceRecords[formattedDate].clockIn = regularHours.start
          attendanceRecords[formattedDate].clockOut = regularHours.end
          attendanceRecords[formattedDate].breakTime = regularHours.breakTime
        }
      }
    }

    const handleInputCheck = () => {
      let errors = []
      for (const [date, record] of Object.entries(attendanceRecords)) {
        if (record.workType === '出勤') {
          if (!record.clockIn) errors.push(`${date}: 出勤時刻が未入力です`)
          if (!record.clockOut) errors.push(`${date}: 退勤時刻が未入力です`)
          if (!record.breakTime) errors.push(`${date}: 休憩時間が未入力です`)
        }
      }

      if (errors.length > 0) {
        alert('以下の入力エラーがあります:\n' + errors.join('\n'))
      } else {
        alert('入力チェックが完了しました。エラーはありません。')
      }
    }

    watch([selectedYear, selectedMonth], fetchMonthlyAttendance)

    fetchMonthlyAttendance()

    return {
      selectedYear,
      selectedMonth,
      attendanceRecords,
      regularHours,
      daysInMonth,
      formatDate,
      getWeekday,
      getDayClass,
      handleSave,
      autoFillRegularHours,
      years,
      months,
      timeOptions,
      breakTimeOptions,
      overtimeOptions,
      handleInputCheck
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
.regular-hours-section {
  margin-bottom: 20px;
}
.regular-hours-table {
  margin-bottom: 10px;
}
.auto-fill-button {
  display: block;
  width: 100%;
  max-width: 400px;
}
.table-container {
  overflow-x: auto;
}
.table-container table {
  width: 100%;
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
.fixed-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}
.check-button, .save-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.check-button {
  background-color: #F59E0B;
}
.save-button {
  background-color: #10B981;
}
.check-button:hover {
  background-color: #D97706;
}
.save-button:hover {
  background-color: #059669;
}
</style>
