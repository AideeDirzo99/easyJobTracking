export interface JobData {
  id: number;
  jobName: string;
  company: string;
  platform: string;
  status: Array<{ phase: string; date: string }>;
  notes: string;
}
