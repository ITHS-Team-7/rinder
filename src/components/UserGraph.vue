<script setup>
import Chart from "chart.js/auto";

import data from "../assets/data/users.json";
</script>

<template>
 <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: data,
      chart: null,
    };
  },
  mounted(){
      this.createChart();
  },
    methods: {
    createChart() {
      const genderAgeCounts = this.getGenderAgeCounts();

      const labels = [];
      const data = [];

      for (const [key, value] of Object.entries(genderAgeCounts)) {
        labels.push(key);
        data.push(value);
      }

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "User Counts",
              data: data,
              backgroundColor: "#4e73df",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "User Count",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "User Counts by Gender",
            },
          },
        },
      });
    },
    getGenderAgeCounts() {
      const counts = {};

      this.users.forEach((user) => {
        const key = `${user.gender}`;
        if (!counts[key]) {
          counts[key] = 0;
        }
        counts[key]++;
      });

      return counts;
    },
  },
};
</script>
