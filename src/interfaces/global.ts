export interface JobData {
  id: string;
  jobName: string;
  company: string;
  platform: string;
  status: Array<{ phase: string; date: string }>;
  notes: string;
}
