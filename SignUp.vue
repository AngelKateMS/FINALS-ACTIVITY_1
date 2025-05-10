<template>
  <div class="signup-container">
    <h2>Create Account</h2>

    <!-- Email Signup Form -->
    <form @submit.prevent="signupWithEmail">
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
      <button type="submit" class="signup-btn">Sign Up with Email </button>
    </form>

    <div class="divider">OR</div>

    <!-- Google Sign Up -->
    <button @click="signUpWithGoogle" class="google-btn">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
      Sign Up with Google
    </button>

    <p>Already have an account? <router-link to="/">Login</router-link></p>
  </div>
</template>

<script>
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false // <-- Add this
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword // <-- Add this
    },
    async signupWithEmail() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        alert('Email signup successful!')
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Email Signup Error:', error.message)
        alert('Sign-up failed. ' + error.message)
      }
    },
    async signUpWithGoogle() {
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Google Sign-Up Error:', error.message)
        alert('Google sign-up failed. ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  background-color: #d0f0d1;
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;

}
.signup-container input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 6px;
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
.signup-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #43a047;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}
.google-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.google-btn img {
  height: 20px;
}
.divider {
  margin: 1rem 0;
  font-weight: bold;
  color: #666;
}
</style>
