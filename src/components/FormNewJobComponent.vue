<template>
  <q-form class="form-container" ref="formRef">
    <q-input
      outlined
      v-model="name"
      label="Nombre"
      dense
      :rules="[(val) => !!val || 'El nombre es obligatorio']"
    />

    <q-input
      outlined
      v-model="company"
      label="Empresa"
      dense
      :rules="[(val) => !!val || 'La empresa es obligatoria']"
    />

    <q-select
      outlined
      v-model="platform"
      :options="platforms"
      label="Plataforma"
      dense
      :rules="[(val) => !!val || 'Selecciona una plataforma']"
    />

    <q-select
      outlined
      v-model="phase"
      :options="status"
      label="Estatus actual"
      dense
      :rules="[(val) => !!val || 'Selecciona un estado']"
    />

    <q-input outlined v-model="notes" label="Notas" type="textarea" autogrow dense />

    <div class="actions">
      <q-btn
        color="secondary"
        :label="props.jobToEdit ? 'Guardar' : 'Añadir'"
        unelevated
        @click="createOrUpdateJob"
        :loading="isLoading"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import type { JobData } from 'src/interfaces/global';
import { useJobStore } from 'src/stores/jobStore';
import { onMounted, ref } from 'vue';

const name = ref('');
const company = ref('');
const platform = ref<string>('');
const phase = ref<string>('');
const notes = ref('');
const isLoading = ref(false);
const formRef = ref();

interface Props {
  jobToEdit?: JobData;
}

interface Events {
  (e: 'handleClose'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Events>();

const platforms = ['LinkedIn', 'InfoJobs', 'Indeed', 'Computrabajo', 'Otro'];

const status = [
  'Aplicado',
  'Entrevista telefónica',
  'Entrevista videollamada',
  'Oferta',
  'Rechazado',
];

const createOrUpdateJob = async () => {
  if (props.jobToEdit) {
    await handleUpdateJob();
  } else {
    await handleCreateJob();
  }
  emit('handleClose');
};

const handleCreateJob = async () => {
  const isValid = await formRef.value?.validate();

  if (!isValid) {
    return;
  }

  const newJob: JobData = {
    id: 'job_' + Date.now(),
    jobName: name.value,
    company: company.value,
    platform: platform.value,
    status: [
      {
        phase: phase.value,
        date: new Date().toISOString(),
      },
    ],
    notes: notes.value,
  };

  try {
    isLoading.value = true;
    await useJobStore().createJob(newJob);
    Notify.create({
      type: 'positive',
      message: 'Puesto creado con éxito',
      position: 'top',
    });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error('Error creating job:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al crear el puesto',
      position: 'top',
    });
  }
};

const handleUpdateJob = async () => {
  const isValid = await formRef.value?.validate();

  if (!isValid) {
    return;
  }

  const newStatus = props.jobToEdit?.status || [];
  newStatus.push({
    phase: phase.value,
    date: new Date().toISOString(),
  });

  const updatedJob: JobData = {
    id: props.jobToEdit!.id,
    jobName: name.value,
    company: company.value,
    platform: platform.value,
    status: newStatus,
    notes: notes.value,
  };

  try {
    isLoading.value = true;
    await useJobStore().updateJob(updatedJob);
    Notify.create({
      type: 'positive',
      message: 'Puesto actualizado con éxito',
      position: 'top',
    });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.error('Error updating job:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al actualizar el puesto',
      position: 'top',
    });
  }
};

onMounted(() => {
  if (props.jobToEdit) {
    name.value = props.jobToEdit.jobName;
    company.value = props.jobToEdit.company;
    platform.value = props.jobToEdit.platform;
    notes.value = props.jobToEdit.notes;
    const latestStatus = props.jobToEdit.status[props.jobToEdit.status.length - 1];
    if (latestStatus) {
      phase.value = latestStatus.phase;
    }
  }
});
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
