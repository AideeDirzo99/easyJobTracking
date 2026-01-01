<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom-header">
      <q-toolbar>
        <q-toolbar-title>
          <div class="logo-container"><img src="/Logo2.png" /></div>
        </q-toolbar-title>

        <div>Name Profile {{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

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
