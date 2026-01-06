<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="custom-header">
      <q-toolbar>
        <q-toolbar-title>
          <div class="logo-container"><img src="/Logo2.png" /></div>
        </q-toolbar-title>

        <div>
          {{ auth.currentUser?.email }}
          <q-btn flat color="negative" icon="logout" @click="handleLogOut" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { logOutUser } from 'src/API/authApi';
import { auth } from 'src/boot/FirebaseInit';
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogOut = async () => {
  try {
    await logOutUser();
    await router.push('/');
  } catch (error) {
    console.error('Error logging out:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al cerrar sesión. Por favor, inténtalo de nuevo.',
      position: 'top',
    });
  }
};
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: 40px;

  img {
    height: 100%;
  }
}
.custom-header {
  background-color: #f1f1f6;
  color: rgb(28, 27, 27);
}
</style>
