<template>
  <div :class="[theme, 'dashboard-layout', { 'sidebar-open': drawerOpen }]">
    <!-- Sidebar -->
    <SideBar
      :drawerOpen="drawerOpen"
      @toggleSidebar="toggleSidebar"
      @navigate="handleNavigation"
      @logout="logout"
    />

    <main class="main-content">
      <header class="topbar">
        <h1>Analytics Dashboard</h1>
        <div style="flex-grow: 1;"></div>
        <button @click="toggleTheme" class="theme-toggle-btn">🌙 / 🌞</button>
      </header>

      <!-- Replace charts with some placeholder content -->
      <div class="charts">
        <div class="placeholder-box">
          <p>No charts to display.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SideBar from '../components/SideBar.vue';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default {
  name: 'DataAnalytics',
  components: {
    SideBar
  },
  setup() {
    const router = useRouter();
    const drawerOpen = ref(false);
    const theme = ref('light-theme');

    const toggleSidebar = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    const handleNavigation = (route) => {
      router.push(route);
    };

    const toggleTheme = () => {
      theme.value = theme.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    };

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      drawerOpen,
      theme,
      toggleTheme,
      logout,
      toggleSidebar,
      handleNavigation
    };
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
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

.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #f1f1f1;
  border-radius: 12px;
  padding: 2rem;
}

.placeholder-box {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: -250px;
    transition: left 0.3s ease;
  }
}
</style>
