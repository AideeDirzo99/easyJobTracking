import type { JobData } from 'src/interfaces/global';

/**
 * Creates or updates a job by sending a PUT request to the backend.
 *
 * Sends the job payload as JSON, parses the response, and throws an error
 * if the request fails or the server responds with a non-2xx status.
 *
 * @param {string} userId - ID of the user who owns the job.
 * @param {string} jobId - ID of the job to create or update.
 * @param {JobData} job - Job data to be stored.
 *
 * @returns {Promise<unknown>} Parsed JSON response from the backend.
 *
 * @throws {Error} Throws `JOB_CREATE_FAILED` if the request or response fails.
 */
export const createJob = async (userId: string, jobId: string, job: JobData) => {
  try {
    const response = await fetch('https://updatejob-apq76e4xeq-uc.a.run.app', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, jobId, job }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Request failed');
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('API_JOB_CREATE_FAILED:' + errorMessage);
  }
};

export const updateJob = async (userId: string, jobId: string, job: JobData) => {
  try {
    const response = await fetch('https://updatejob-apq76e4xeq-uc.a.run.app', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, jobId, job }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Request failed');
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('API_JOB_UPDATE_FAILED:' + errorMessage);
  }
};

/**
 * Fetches all jobs associated with a specific user.
 *
 * Sends a GET request to the backend API to retrieve the jobs data
 * linked to the provided user ID.
 *
 * @param userId - Unique identifier of the user whose jobs are being requested.
 * @returns A promise that resolves with the jobs data returned by the API.
 * @throws Will throw an error if the request fails or the API responds with an error.
 */
export const getJobs = async (userId: string) => {
  try {
    const response = await fetch(`https://getjobs-apq76e4xeq-uc.a.run.app?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Request failed');
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('API_GET_JOBS_FAILED:' + errorMessage);
  }
};

/**
 * Deletes a specific job for a given user.
 *
 * Sends a DELETE request to the backend API with the user ID and job ID
 * in the request body to remove the job from the database.
 *
 * @param userId - Unique identifier of the user who owns the job.
 * @param jobId - Unique identifier of the job to be deleted.
 * @returns A promise that resolves with the API response after deletion.
 * @throws Will throw an error if the request fails or the API responds with an error.
 */
export const deleteJob = async (userId: string, jobId: string) => {
  try {
    const response = await fetch(`https://deletejob-apq76e4xeq-uc.a.run.app`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, jobId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Request failed');
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error('API_JOB_DELETE_FAILED:' + errorMessage);
  }
};
