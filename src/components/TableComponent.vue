<template>
  <div class="q-pa-md">
    <q-table
      :loading="isLoading"
      title="Candidaturas"
      :rows="jobStore.userJobs"
      :columns="columns"
      row-key="jobId"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            color="grey-8"
            @click="handleEditJob(props.row)"
            :disable="isLoading"
          />
          <q-btn
            flat
            dense
            round
            icon="delete"
            color="red-6"
            @click="handleDeleteJob(props.row)"
            :disable="isLoading"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Dialog -->
    <q-dialog v-model="isDialogOpen">
      <q-card style="min-width: 400px; max-width: 90vw">
        <q-card-section class="row items-center">
          <div class="text-h6">Editar trabajo</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="closeDialog" />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <form-new-job-component :jobToEdit="jobToSend" @handleClose="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { Notify, type QTableProps } from 'quasar';
import type { JobData } from 'src/interfaces/global';
import { useJobStore } from 'src/stores/jobStore';
import { onMounted, ref } from 'vue';
import FormNewJobComponent from 'components/FormNewJobComponent.vue';

const jobStore = useJobStore();
const isLoading = ref(false);
const isDialogOpen = ref(false);
const jobToSend = ref();

const columns: QTableProps['columns'] = [
  {
    name: 'jobName',
    required: true,
    label: 'Puesto',
    align: 'left',
    field: 'jobName',
    sortable: true,
  },
  { name: 'company', align: 'center', label: 'Empresa', field: 'company', sortable: true },
  { name: 'platform', label: 'Plataforma', field: 'platform', sortable: true },
  {
    name: 'status',
    label: 'Estado',
    field: (row) => row.status[row.status.length - 1].phase,
    sortable: true,
  },
  { name: 'notes', label: 'Notas', field: 'notes' },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center',
    field: 'actions',
  },
];

const closeDialog = () => {
  isDialogOpen.value = false;
};

const handleEditJob = (job: JobData) => {
  isDialogOpen.value = true;
  jobToSend.value = job;
};

const handleDeleteJob = async (job: JobData) => {
  try {
    isLoading.value = true;
    await jobStore.deleteJob(job.id);
    Notify.create({
      type: 'positive',
      message: 'Candidatura eliminada',
      position: 'top',
    });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error('Error deleting job:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al eliminar la candidatura',
      position: 'top',
    });
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await jobStore.getJobs();
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error('Error getting jobs:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al obtener las candidaturas',
      position: 'top',
    });
  }
});
</script>
