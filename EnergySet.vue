<template>
  <div :class="[theme, 'dashboard-layout', { 'sidebar-open': drawerOpen }]">
    <!-- Sidebar -->
    <SideBar
      :drawerOpen="drawerOpen"
      @toggleSidebar="toggleSidebar"
      @navigate="handleNavigation"
      @logout="logout"
    />

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <h1>📊 Energy Set</h1>
        <div style="flex-grow: 1;"></div>
        <button @click="toggleTheme" class="theme-toggle-btn">🌙 / 🌞</button>
      </header>

      <!-- Outlet Timer Button -->
      <div class="outlet-timer-button">
        <button @click="openOutletModal" class="outlet-setup-btn">Set Up Outlets</button>
      </div>

      <!-- Modal for Outlet Setup -->
      <div v-if="isModalOpen" class="outlet-modal-overlay" @click="closeOutletModal">
        <div class="outlet-modal" @click.stop>
          <header>
            <h3>Set Outlet Timers</h3>
            <button @click="closeOutletModal" class="close-modal-btn">✖</button>
          </header>

          <div class="outlet-options">
            <button v-for="outlet in outletCountOptions" :key="outlet" @click="setOutletCount(outlet)">
              {{ outlet }} Outlet(s)
            </button>
          </div>

          <div class="outlet-config" v-if="selectedOutlets > 0">
            <h3>Set Duration for Each Outlet</h3>
            <div v-for="outlet in outlets" :key="outlet.id" class="outlet-timer">
              <p>Outlet {{ outlet.id }}</p>
              <input type="number" v-model="outlet.hours" placeholder="Hours" min="0" />
              <input type="number" v-model="outlet.minutes" placeholder="Minutes" min="0" max="59" />
              <button @click="startTimer(outlet)">Start</button>
              <button @click="stopTimer(outlet)">Stop</button>
              <p v-if="outlet.timerActive">Timer: {{ outlet.remainingTime }}s</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts -->
      <div class="charts">
        <div class="chart-box">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
        <div class="chart-box">
          <Line :data="lineChartData" :options="chartOptions" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Line, Bar } from 'vue-chartjs';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SideBar from '../components/SideBar.vue';

export default {
  name: 'EnergyMonitoring',
  components: {
    Line,
    Bar,
    SideBar
  },
  setup() {
    const router = useRouter();
    const drawerOpen = ref(false);
    const theme = ref('light-theme');
    const selectedOutlets = ref(0);
    const isModalOpen = ref(false);
    const outletCountOptions = [2, 3, 4];
    const outlets = ref([]);

    // Open modal to configure outlets
    const openOutletModal = () => {
      isModalOpen.value = true;
    };

    // Close modal
    const closeOutletModal = () => {
      isModalOpen.value = false;
    };

    // Set outlet count and initialize outlets
    const setOutletCount = (count) => {
      selectedOutlets.value = count;
      outlets.value = [];
      for (let i = 1; i <= count; i++) {
        outlets.value.push({
          id: i,
          hours: 0,
          minutes: 0,
          timerActive: false,
          remainingTime: 0
        });
      }
    };

    // Start timer for outlet
    const startTimer = (outlet) => {
      const totalSeconds = (outlet.hours * 3600) + (outlet.minutes * 60);
      outlet.remainingTime = totalSeconds;
      outlet.timerActive = true;

      // Countdown function
      const interval = setInterval(() => {
        if (outlet.remainingTime > 0) {
          outlet.remainingTime--;
        } else {
          clearInterval(interval);
          outlet.timerActive = false;
        }
      }, 1000);
    };

    // Stop timer for outlet
    const stopTimer = (outlet) => {
      outlet.timerActive = false;
      outlet.remainingTime = 0;
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    // Navigate to different routes
    const handleNavigation = (route) => {
      router.push(route);
    };

    // Toggle between light and dark themes
    const toggleTheme = () => {
      theme.value = theme.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    };

    // Log out the user
    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    // Chart Data
    const lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Energy Consumption',
        data: [30, 45, 60, 40, 70],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
        tension: 0.4,
        fill: true
      }]
    };

    const barChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Energy Usage (kWh)',
        data: [210, 190, 230, 250, 205],
        backgroundColor: '#66BB6A',
        borderColor: '#43A047',
        borderWidth: 1
      }]
    };

    // Chart options
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    };

    const barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    return {
      drawerOpen,
      theme,
      toggleTheme,
      logout,
      lineChartData,
      barChartData,
      chartOptions,
      barChartOptions,
      toggleSidebar,
      handleNavigation,
      selectedOutlets,
      outletCountOptions,
      setOutletCount,
      outlets,
      startTimer,
      stopTimer,
      isModalOpen,
      openOutletModal,
      closeOutletModal
    };
  }
};
</script>

<style scoped>
:root {
  --text-color-light: #333;
  --text-color-dark: #fff;
}

.light-theme {
  --primary-color: #66bb6a;
  --highlight-color: #ff9800;
  --card-bg-color: #ffffff;
  --text-color: var(--text-color-light);
  background-color: #e8f5e9;
  color: var(--text-color);
}

.dark-theme {
  --primary-color: #2c6b3d;
  --highlight-color: #ffca28;
  --card-bg-color: #263238;
  --text-color: var(--text-color-dark);
  background-color: #032638;
  color: var(--text-color);
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow: hidden;
}

.dashboard-layout.sidebar-open .main-content {
  margin-left: 250px; /* Sidebar width */
}

.main-content {
  margin-left: 60px; /* Default collapsed sidebar margin */
  padding: 2rem;
  transition: margin-left 0.3s ease;
  width: 100%;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.theme-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}

.outlet-timer-button {
  margin-top: 2rem;
  text-align: center;
}

.outlet-setup-btn {
  padding: 1rem 2rem;
  background-color: #42A5F5;
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.outlet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.outlet-modal {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  width: 80%;
  max-width: 400px; /* Reduce max-width for compact view */
  overflow-y: auto;
}

.outlet-modal header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
}

.close-modal-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.outlet-options button {
  margin: 0.3rem;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #66BB6A;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 48%; /* More compact button sizes */
}

.outlet-options button:hover {
  background-color: #388e3c;
}

.outlet-config {
  margin-top: 1rem;
}

.outlet-timer {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row; /* Align input fields and buttons side by side */
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.outlet-timer input {
  margin: 0.3rem;
  padding: 0.3rem;
  width: 40%;
  text-align: center;
  max-width: 60px;
}

.outlet-timer button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #42A5F5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 45%; /* Compact button width */
}

.outlet-timer button:disabled {
  background-color: #ccc;
}

.charts {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap; /* Allow wrapping on small screens */
}

.chart-box {
  width: 48%; /* Adjust to fit both charts side by side */
  height: 400px;
}

@media (max-width: 768px) {
  .charts {
    flex-direction: column; /* Stack the charts on top of each other for smaller screens */
  }

  .chart-box {
    width: 100%; /* Use full width for each chart on smaller screens */
  }
}
</style>
