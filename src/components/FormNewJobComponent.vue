<template>
  <q-form class="form-container">
    <q-input outlined v-model="name" label="Nombre" dense />

    <q-input outlined v-model="company" label="Empresa" dense />

    <q-select outlined v-model="platform" :options="platforms" label="Plataforma" dense />

    <q-select outlined v-model="phase" :options="status" label="Estatus actual" dense />

    <q-input outlined v-model="notes" label="Notas" type="textarea" autogrow dense />

    <div class="actions">
      <q-btn color="secondary" label="Añadir" unelevated />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const company = ref('');
const platform = ref<string | null>(null);
const phase = ref<string | null>(null);
const notes = ref('');

const platforms = ['LinkedIn', 'InfoJobs', 'Indeed', 'Computrabajo', 'Otro'];

const status = [
  'Aplicado',
  'Entrevista telefónica',
  'Entrevista videollamada',
  'Oferta',
  'Rechazado',
];
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px;
  min-width: 320px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
