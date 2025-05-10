<template>
  <div :class="[theme, 'dashboard-layout', { 'sidebar-open': drawerOpen }]">
    <!-- Sidebar -->
    <SideBar
      :drawerOpen="drawerOpen"
      @toggleSidebar="toggleSidebar"
      @navigate="handleNavigation"
      @logout="logout"
    />
    <div class="main-content">
      <h2>ORMECO Power Rates (January 2025)</h2>

      <!-- Highlighted Residential Rate -->
      <div class="highlighted-rate">
        <h3>Residential</h3>
        <p class="highlight-value">₱12.9701/kWh</p>
        <small>This is the rate used for computing your power consumption.</small>
      </div>

      <!-- Other Rates -->
      <div class="rate-section">
        <div class="rate-item">
          <h3>Commercial</h3>
          <p>₱11.8604/kWh</p>
        </div>
        <div class="rate-item">
          <h3>Industrial</h3>
          <p>₱11.4697/kWh</p>
        </div>
        <div class="rate-item">
          <h3>Public Buildings</h3>
          <p>₱11.5814/kWh</p>
        </div>
        <div class="rate-item">
          <h3>Street Lighting</h3>
          <p>₱13.6715/kWh</p>
        </div>
      </div>

      <p class="note">
        These are the official rates for January 2025, based on ORMECO's public advisory.
      </p>
      <a href="https://www.ormeco-inc.com" target="_blank" class="link">Visit ORMECO Website for More Info</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '../components/SideBar.vue'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const theme = ref('light-theme')
const drawerOpen = ref(false)
const ormecoRate = ref('')

const toggleSidebar = () => {
  drawerOpen.value = !drawerOpen.value
}

const handleNavigation = (route) => {
  router.push(route)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light-theme' ? 'dark-theme' : 'light-theme'
}

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

onMounted(async () => {
  try {
    const docRef = doc(db, 'settings', 'ormecoRate')
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      ormecoRate.value = snapshot.data().value
    }
  } catch (error) {
    console.error('Failed to fetch ORMECO rate:', error)
  }
})
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
  margin-left: 250px;
}

.main-content {
  margin-left: 60px;
  padding: 2rem;
  transition: margin-left 0.3s ease;
  width: 100%;
}

h2 {
  text-align: center;
  color: #2c6b3d;
}

/* Highlighted Residential Rate */
.highlighted-rate {
  background-color: #e3f2fd;
  border-left: 6px solid #42a5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
}

.highlighted-rate h3 {
  color: #1565c0;
  margin-bottom: 5px;
}

.highlight-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0d47a1;
}

.highlighted-rate small {
  color: #555;
  display: block;
  margin-top: 5px;
  font-style: italic;
}

/* Other Rates */
.rate-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  gap: 7px;
  margin-top: 20px;
}

.rate-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.rate-item h3 {
  color: #42a5f5;
  margin-bottom: 10px;
}

.rate-item p {
  font-size: 1.2rem;
  color: #333;
}

.note {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 20px;
}

.link {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #42a5f5;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
