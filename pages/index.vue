<template>
  <div class="container">
      <h1>สถิติ Covid-19 ทั่วโลก</h1>
      <div class="select-container">
          <select v-model="selectedTimeRange" @change="fetchData">
              <option value="30">1 เดือน</option>
              <option value="60">2 เดือน</option>
              <option value="90">3 เดือน</option>
          </select>
      </div>
      <div class="table-container">
          <h2>ตาราง</h2>
          <table class="covid-table">
              <thead>
                  <tr>
                      <th>วันที่</th>
                      <th>ผู้ติดเชื้อ</th>
                      <th>หายแล้ว</th>
                      <th>เสียชีวิต</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-if="Object.keys(covidData).length > 0" v-for="(value, key) in covidData.cases" :key="key">
                      <td>{{ formatDate(key) }}</td>
                      <td>{{ value }}</td>
                      <td>{{ covidData.recovered[key] }}</td>
                      <td>{{ covidData.deaths[key] }}</td>
                  </tr>
                  <tr v-else>
                      <td colspan="4">ไม่มีข้อมูล</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          selectedTimeRange: 30,
          covidData: {},
      };
  },
  methods: {
    formatDate(dateString) {
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const parts = dateString.split('/');

    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${day} ${months[+month - 1]} ${year}`;
    } else {
        return "วันที่ไม่ระบุ";
    }
},
    async fetchData() {
    try {
        const response = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=${this.selectedTimeRange}`);
        this.covidData = {
            cases: response.data.cases,
            recovered: response.data.recovered,
            deaths: response.data.deaths
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        this.covidData = {};
    }
}
  },
  mounted() {
      this.fetchData();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.select-container {
  margin-bottom: 20px;
}

.covid-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);
}

.covid-table th, .covid-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.covid-table th {
  background-color: #f2f2f2;
}

.covid-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.covid-table tr:hover {
  background-color: #e6e6e6;
}

.table-container {
  border-radius: 5px;
  overflow: hidden;
}
</style>
