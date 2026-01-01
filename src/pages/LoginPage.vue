<template>
  <div class="main-container">
    <div class="login-container">
      <div class="logo-container"><img src="/Logo2.png" /></div>
      <div class="welcome-text">Bienvenido a EmpleoTrack</div>
      <div class="secondary-text">Cada oportunidad empieza con un buen seguimiento</div>
      <div class="form">
        <q-input v-model="email" rounded outlined type="email" label="Email" color="secondary" />
        <q-input
          v-model="password"
          rounded
          outlined
          color="secondary"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn unelevated rounded color="secondary" label="Ingresar" />
        <q-btn outline rounded color="secondary" label="Crear cuenta" />
      </div>
    </div>

    <div class="image-container">
      <img src="/loginImage.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');
const isPwd = ref(true);
const email = ref('');
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  max-width: 1500px;
  margin: auto;
  overflow: hidden;
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    .logo-container {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      img {
        width: 300px;
        object-fit: cover;
        object-position: center top;
        @media (max-width: 300px) {
          width: 200px;
        }
      }
    }
    .welcome-text {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      @media (max-width: 400px) {
        text-align: center;
        font-size: 1.2rem;
      }
      @media (max-width: 300px) {
        text-align: center;
        font-size: 0.85rem;
      }
    }
    .secondary-text {
      font-size: 1rem;
      color: gray;
      margin-bottom: 2rem;

      @media (max-width: 450px) {
        text-align: center;
        padding: 0 1rem;
      }
      @media (max-width: 300px) {
        text-align: center;
        font-size: 0.75rem;
        padding: 0 0.5rem;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 300px;
      @media (max-width: 300px) {
        width: 100%;
        max-width: 260px;
        gap: 0.75rem;
      }
    }
    @media (max-width: 1100px) {
      width: 100%;
      padding: 2rem;
    }
    @media (max-width: 300px) {
      padding: 1rem;
    }
  }
}
.image-container {
  width: 40%;
  margin: 30px;
  display: flex;
  justify-content: start;
  align-items: start;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  @media (max-width: 1100px) {
    display: none;
  }
}
</style>
