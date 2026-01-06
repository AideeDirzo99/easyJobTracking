<template>
  <router-view />
</template>

<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './boot/FirebaseInit';

/**
 * Sets up a Firebase Auth listener to redirect user.
 * Redirects to /main if the user is authenticated, or to / if not.
 *
 * Should be called once during app initialization.
 */
const initAuthListener = () => {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    console.info('Auth state changed. Current user:', user);

    if (user) {
      if (router.currentRoute.value.path !== '/main') {
        void router.push('/main');
      }
    } else {
      if (router.currentRoute.value.path !== '/') {
        void router.push('/');
      }
    }
  });
};

onMounted(() => {
  initAuthListener();
});
</script>
