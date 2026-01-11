<template>
  <q-page class="page">
    <div class="content-wrapper">
      <div class="actions">
        <q-btn color="secondary" icon-right="add" label="AGREGAR TRABAJO" @click="openDialog" />
      </div>

      <table-component />
    </div>

    <!-- Dialog -->
    <q-dialog v-model="isDialogOpen">
      <q-card style="min-width: 400px; max-width: 90vw">
        <q-card-section class="row items-center">
          <div class="text-h6">Nuevo trabajo</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <form-new-job-component @handleClose="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
/* -------------------------------------------------------------------------- */
/* IMPORTS                                                                    */
/* -------------------------------------------------------------------------- */
import { ref } from 'vue';
import TableComponent from 'components/TableComponent.vue';
import FormNewJobComponent from 'components/FormNewJobComponent.vue';

/* -------------------------------------------------------------------------- */
/* STATE                                                                      */
/* -------------------------------------------------------------------------- */
const isDialogOpen = ref(false);

/* -------------------------------------------------------------------------- */
/* METHODS                                                                    */
/* -------------------------------------------------------------------------- */
const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>

<style scoped>
.page {
  padding-top: 24px;
}

.content-wrapper {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin: 16px;
}
</style>
