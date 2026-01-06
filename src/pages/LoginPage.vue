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
        <q-btn
          :loading="isLoading"
          unelevated
          rounded
          color="secondary"
          label="Ingresar"
          @click="handleLogIn"
        />
        <q-btn
          :loading="isLoading"
          outline
          rounded
          color="secondary"
          label="Crear cuenta"
          @click="handleSignUp"
        />
      </div>
    </div>

    <div class="image-container">
      <img src="/loginImage.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { logInUser, signUpUser } from 'src/API/authApi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref('');
const isPwd = ref(true);
const email = ref('');
const router = useRouter();
const isLoading = ref(false);

const handleLogIn = async () => {
  if (!isValidEmail(email.value)) {
    Notify.create({
      type: 'negative',
      message: 'Email no válido',
      position: 'top',
    });
    return;
  }
  if (!isValidPassword(password.value)) {
    Notify.create({
      type: 'negative',
      message: 'La contraseña debe tener al menos 6 caracteres y no contener espacios.',
      position: 'top',
    });
    return;
  }
  try {
    isLoading.value = true;
    //TODO: move to services folder if additional business logic is added
    await logInUser(email.value, password.value);
    await router.push('/main');

    Notify.create({
      type: 'positive',
      message: 'Inicio de sesión exitoso. ¡Bienvenido de nuevo a EmpleoTrack!',
      position: 'top',
    });
  } catch (error) {
    isLoading.value = false;
    console.error('Error during sign up:', error);
    Notify.create({
      type: 'negative',
      message: 'Hubo un error al iniciar sesión. Por favor, revisa tus datos o inténtalo de nuevo.',
      position: 'top',
    });
  }
};

const handleSignUp = async () => {
  if (!isValidEmail(email.value)) {
    Notify.create({
      type: 'negative',
      message: 'Email no válido',
      position: 'top',
    });
    return;
  }
  if (!isValidPassword(password.value)) {
    Notify.create({
      type: 'negative',
      message: 'La contraseña debe tener al menos 6 caracteres y no contener espacios.',
      position: 'top',
    });
    return;
  }
  try {
    isLoading.value = true;
    //TODO: move to services folder if additional business logic is added
    await signUpUser(email.value, password.value);
    await router.push('/main');

    Notify.create({
      type: 'positive',
      message: 'Cuenta creada exitosamente. Bienvenido a EmpleoTrack!',
      position: 'top',
    });
  } catch (error) {
    isLoading.value = false;
    console.error('Error during sign up:', error);
    Notify.create({
      type: 'negative',
      message:
        'Hubo un error al crear la cuenta. Por favor, revisa tus datos o inténtalo de nuevo.',
      position: 'top',
    });
  }
};

/**
 * Checks whether a password meets basic security requirements.
 *
 * Rules:
 * - Minimum length of 6 characters
 * - At least one letter
 * - At least one number
 * - No spaces allowed
 */
const isValidPassword = (value: string): boolean => {
  if (!value) return false;

  const password = value.trim();

  if (password.length < 6) return false;
  if (password.includes(' ')) return false;

  return true;
};

/**
 * Checks whether a string is a syntactically valid email address.
 * Note: this validates format only; it does not verify domain or mailbox existence.
 */
const isValidEmail = (value: string): boolean => {
  if (!value) return false;

  const email = value.trim();

  // Basic sanity checks
  if (email.length > 254) return false;

  // Pragmatic, widely-used email format regex (not fully RFC exhaustive, but robust for apps)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

  return emailRegex.test(email);
};
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
