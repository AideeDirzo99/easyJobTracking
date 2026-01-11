import { defineStore, acceptHMRUpdate } from 'pinia';
import { createJob, deleteJob, getJobs, updateJob } from 'src/API/jobApi';
import { auth } from 'src/boot/FirebaseInit';
import type { JobData } from 'src/interfaces/global';

export const useJobStore = defineStore('job', {
  state: () => ({
    userJobs: [] as Array<JobData>,
  }),

  actions: {
    async createJob(job: JobData) {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error('USER_NOT_AUTHENTICATED');
      }

      try {
        // Call the API to create the job
        await createJob(userId, job.id, job);

        // If successful, add the job to the local state
        this.userJobs.push(job);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error('STORE_JOB_CREATE_FAILED:' + errorMessage);
      }
    },

    async updateJob(job: JobData) {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error('USER_NOT_AUTHENTICATED');
      }

      try {
        // Call the API to update the job
        await updateJob(userId, job.id, job);

        // If successful, update the job in the local state
        const index = this.userJobs.findIndex((j) => j.id === job.id);
        if (index !== -1) {
          this.userJobs[index] = job;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error('STORE_JOB_UPDATE_FAILED:' + errorMessage);
      }
    },

    async getJobs() {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error('USER_NOT_AUTHENTICATED');
      }

      try {
        // Call the API to get jobs
        const response = await getJobs(userId);

        // Update the local state with the fetched jobs
        this.userJobs = response.data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error('STORE_JOBS_GET_FAILED:' + errorMessage);
      }
    },

    async deleteJob(jobId: string) {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error('USER_NOT_AUTHENTICATED');
      }

      try {
        // Call the API to delete the job
        await deleteJob(userId, jobId);

        // If successful, remove the job from the local state
        this.userJobs = this.userJobs.filter((job) => job.id !== jobId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error('STORE_JOBS_GET_FAILED:' + errorMessage);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
