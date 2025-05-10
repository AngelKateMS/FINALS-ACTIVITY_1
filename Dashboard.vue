<template>
  <div :class="[theme, 'dashboard-layout', { 'sidebar-open': drawerOpen }]">
    <!-- Sidebar Component -->
    <SideBar :drawerOpen="drawerOpen" @toggleSidebar="toggleSidebar" @navigate="handleNavigation" @logout="logout" />

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <h1>Energy Monitoring Dashboard</h1>
        <div class="current-time">{{ currentTime }}</div>
        <div class="topbar-actions">
          <button @click="toggleTheme" class="theme-toggle-btn">🌙 / 🌞</button>
          <button @click="goToEnergySet" class="set-time-btn">Set Time</button>
        </div>
      </header>

      <section class="powermonitor">
        <div class="mon">
          <h3>Total Consumption</h3>
          <p>{{ totalEnergy }} kWh</p>
        </div>
        <div class="mon">
          <h3>Active Devices</h3>
          <p>{{ activeDevices }}</p>
        </div>
        <div class="mon">
          <h3>Cost Estimate</h3>
          <p>₱ {{ costEstimate }}</p>
        </div>
      </section>

      <section class="devices-list">
        <h2>Plugs Monitoring</h2>
        <div class="monitoring-wrapper">
          <div class="device-list">
            <div class="device" v-for="plug in plugs" :key="plug.name">
              <div class="left">
                <h4>{{ plug.name }}</h4>
                <p>Status: <strong :class="plug.status">{{ plug.status }}</strong></p>
              </div>
              <div class="right">
                <span>{{ plug.usage }} W</span>
              </div>
            </div>
          </div>

          <div class="chart-container">
            <canvas id="plugChart"></canvas>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Chart from 'chart.js/auto'
import SideBar from '../components/SideBar.vue'

const router = useRouter()
const theme = ref('light-theme')
const currentTime = ref(new Date().toLocaleTimeString())
const totalEnergy = ref(87.4)
const activeDevices = ref(3)
const costEstimate = ref((totalEnergy.value * 12.3).toFixed(2))
const drawerOpen = ref(false)

const plugs = ref([
  { name: 'Plug 1', usage: 420, status: 'normal' },
  { name: 'Plug 2', usage: 650, status: 'high' },
  { name: 'Plug 3', usage: 120, status: 'low' }
])

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const toggleTheme = () => {
  theme.value = theme.value === 'light-theme' ? 'dark-theme' : 'light-theme'
}

const goToEnergySet = () => {
  router.push('/energy-set')
}

const handleNavigation = (route) => {
  router.push(route)
}

const toggleSidebar = () => {
  drawerOpen.value = !drawerOpen.value
}

setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
}, 1000)

onMounted(() => {
  const ctx = document.getElementById('plugChart').getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
      datasets: [{
        label: 'Energy Usage (W)',
        data: [100, 200, 180, 400, 350, 600, 500, 420],
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: 'var(--text-color)' }
        }
      },
      scales: {
        x: {
          ticks: { color: 'var(--text-color)' }
        },
        y: {
          ticks: { color: 'var(--text-color)' }
        }
      }
    }
  })
})
</script>

<style scoped>
:root {
  --primary-color-light: #66bb6a;
  --secondary-color-light: #ffeb3b;
  --highlight-color-light: #ff9800;
  --card-bg-color-light: #ffffff;
  --primary-color-dark: #2c6b3d;
  --secondary-color-dark: #f57c00;
  --highlight-color-dark: #ffca28;
  --card-bg-color-dark: #263238;
  --card-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  --text-color-light: #333;
  --text-color-dark: #fff;
}

.light-theme {
  --primary-color: var(--primary-color-light);
  --secondary-color: var(--secondary-color-light);
  --highlight-color: var(--highlight-color-light);
  --card-bg-color: var(--card-bg-color-light);
  --text-color: var(--text-color-light);
  background-color: #e8f5e9;
  color: var(--text-color);
}

.dark-theme {
  --primary-color: var(--primary-color-dark);
  --secondary-color: var(--secondary-color-dark);
  --highlight-color: var(--highlight-color-dark);
  --card-bg-color: var(--card-bg-color-dark);
  --text-color: var(--text-color-dark);
  background-color: #032638;
  color: var(--text-color);
}

.dashboard-layout {
  display: flex;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow: hidden;
  flex-direction: row;
}

.dashboard-layout.sidebar-open .main-content {
  margin-left: 250px;
}

.main-content {
  flex: 1;
  margin-left: 60px;
  padding: 2rem;
  transition: margin-left 0.3s ease;
  width: 100%;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.topbar-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.set-time-btn,
.theme-toggle-btn {
  background-color: #9feba2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.theme-toggle-btn {
  background: none;
  font-size: 1.5rem;
  color: var(--highlight-color);
}

.set-time-btn:hover {
  background-color: #388e3c;
}

.powermonitor {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.mon {
  flex: 1;
  min-width: 200px;
  background-color: var(--card-bg-color);
  padding: 1.2rem;
  border-radius: 10px;
  box-shadow: var(--card-shadow);
  text-align: center;
}

.devices-list h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.device {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--card-bg-color);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  flex-wrap: wrap;
}

.device .left h4 {
  margin: 0 0 0.25rem 0;
}

.device .right {
  font-size: 1.2rem;
  font-weight: bold;
}

.normal {
  color: #4caf50;
}
.high {
  color: #ff9800;
}
.low {
  color: #2196f3;
}

.monitoring-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.device-list {
  flex: 1 1 45%;
  min-width: 300px;
}

.chart-container {
  flex: 1 1 50%;
  max-width: 100%;
  min-width: 300px;
  height: 300px;
  position: relative;
}

/* 🔻 Mobile Responsive Styles */
@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0 !important;
    padding: 1rem;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .powermonitor {
    flex-direction: column;
  }

  .monitoring-wrapper {
    flex-direction: column;
  }

  .device-list,
  .chart-container {
    width: 100%;
    min-width: unset;
  }

  .device {
    flex-direction: column;
    align-items: flex-start;
  }

  .device .right {
    margin-top: 0.5rem;
  }

  .set-time-btn,
  .theme-toggle-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .devices-list h2 {
    font-size: 1.2rem;
  }

  .chart-container {
    height: 250px;
  }
}
</style>
