<template>
  <aside :class="['sidebar', { open: drawerOpen }]">
    <!-- Hamburger always visible -->
    <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>

    <!-- Sidebar content only shown when open -->
    <div v-if="drawerOpen" class="sidebar-content">
      <h2 class="logo">Energy Monitoring</h2>
      <nav>
        <ul>
          <li @click="$emit('navigate', 'dashboard')">Dashboard</li>
          <li @click="$emit('navigate', 'energyset')">Energy Set</li>
          <li @click="$emit('navigate', 'dataanalytics')">Data Analytics</li>
          <li @click="$emit('navigate', 'settings')">Settings</li>
          <li class="logout" @click="$emit('logout')">Logout</li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
defineProps({ drawerOpen: Boolean })
defineEmits(['navigate', 'logout', 'toggleSidebar'])
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: linear-gradient(180deg, #3e8e41, #2c6b3d);
  color: white;
  width: 250px;
  transition: width 0.3s ease, transform 0.3s ease;
  z-index: 1000;
  overflow: hidden;
}

.sidebar:not(.open) {
  width: 60px;
}

.menu-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.6rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1001;
}

.sidebar-content {
  margin-top: 3rem;
  padding: 1rem;
}

  .sidebar {
    width: 250px;
    background: linear-gradient(180deg, #3e8e41, #2c6b3d);
    color: white;
    padding: 2rem 1rem;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
  }

  .sidebar .logo {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .sidebar nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar nav ul li {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    color: white;
    text-align: left;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }

  .sidebar nav ul li:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  .sidebar nav ul li.active {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .sidebar nav ul li.logout {
    margin-top: 2rem;
    background-color: #e74c3c;
    color: #fff;
    border-color: #c0392b;
  }

  .sidebar nav ul li.logout:hover {
    background-color: #c0392b;
  }


.logo {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}

li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

li.logout {
  margin-top: 2rem;
  background-color: #e74c3c;
}

li.logout:hover {
  background-color: #c0392b;
}
</style>
