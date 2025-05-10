<template>
  <div class="login-container">
    <h2>Login</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />

      <div class="password-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="Password"
          required
        />
        <span class="toggle-password" @click="togglePassword">
          <img
            v-if="showPassword"
            src="https://img.icons8.com/ios-filled/20/000000/eye-slash.png"
            alt="Hide"
          />
          <img
            v-else
            src="https://img.icons8.com/ios-filled/20/000000/visible.png"
            alt="Show"
          />
        </span>
      </div>

      <button type="submit" class="login-btn">Login with Email</button>
    </form>

    <div class="divider">OR</div>

    <button class="google-btn" @click="signInWithGoogle">
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
      />
      Login with Google
    </button>

    <p>
      Don't have an account?
      <router-link to="/signup">Sign Up with Email</router-link>
    </p>
  </div>
</template>

<script>
import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  provider
} from '../firebase'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error.message)
        alert('Login failed. Check your credentials.')
      }
    },
    async signInWithGoogle() {
      try {
        await signInWithPopup(auth, provider)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Google Sign-In error:', error.message)
        alert('Google Sign-In failed.')
      }
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push('/dashboard')
      }
    })
  }
}
</script>

<style scoped>
.login-container {
  background-color: #d0f0d1;
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 2.5rem;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.toggle-password img {
  width: 20px;
  height: 20px;
}

.login-btn,
.google-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

.login-btn {
  background-color: #43a047;
  color: white;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  border: 1px solid #ccc;
  color: #333;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

.divider {
  margin: 1rem 0;
  position: relative;
  text-align: center;
  color: #888;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ccc;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

p {
  margin-top: 1.5rem;
}
</style>
