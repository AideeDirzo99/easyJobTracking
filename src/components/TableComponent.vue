<template>
  <div class="q-pa-md">
    <q-table title="Candidaturas" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script setup lang="ts">
import type { QTableProps } from 'quasar';
import type { JobData } from 'src/interfaces/global';

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
];

const rows: Array<JobData> = [
  {
    id: 1,
    jobName: 'Junior Front End Developer',
    company: 'Tech Solutions',
    platform: 'LinkedIn',
    status: [
      { phase: 'Applied', date: '2024-01-15' },
      { phase: 'Interview', date: '2024-01-22' },
    ],
    notes: 'Follow up in two weeks.',
  },
  {
    id: 2,
    jobName: 'Vue.js Developer',
    company: 'Digital Labs',
    platform: 'InfoJobs',
    status: [
      { phase: 'Applied', date: '2024-02-03' },
      { phase: 'Interview', date: '2024-02-10' },
      { phase: 'Offer', date: '2024-02-18' },
    ],
    notes: 'Offer received, reviewing conditions.',
  },
  {
    id: 3,
    jobName: 'Frontend Engineer',
    company: 'Startup Hub',
    platform: 'Indeed',
    status: [
      { phase: 'Applied', date: '2024-02-20' },
      { phase: 'Rejected', date: '2024-02-27' },
    ],
    notes: 'Rejected after technical test.',
  },
  {
    id: 4,
    jobName: 'Software Developer (Junior)',
    company: 'Innovatech',
    platform: 'LinkedIn',
    status: [{ phase: 'Applied', date: '2024-03-01' }],
    notes: 'Waiting for response.',
  },
  {
    id: 5,
    jobName: 'Frontend Developer',
    company: 'E-commerce Pro',
    platform: 'Computrabajo',
    status: [
      { phase: 'Applied', date: '2024-03-05' },
      { phase: 'Interview', date: '2024-03-12' },
      { phase: 'Interview', date: '2024-03-19' },
    ],
    notes: 'Second interview scheduled with tech lead.',
  },
  {
    id: 6,
    jobName: 'Web Developer',
    company: 'Creative Agency',
    platform: 'Otro',
    status: [
      { phase: 'Applied', date: '2024-03-10' },
      { phase: 'Interview', date: '2024-03-15' },
      { phase: 'Rejected', date: '2024-03-20' },
    ],
    notes: 'Good feedback, but chose another candidate.',
  },
  {
    id: 7,
    jobName: 'Junior Software Engineer',
    company: 'FinTech Corp',
    platform: 'LinkedIn',
    status: [{ phase: 'Applied', date: '2024-03-18' }],
    notes: 'Referral sent by former colleague.',
  },
];
</script>
