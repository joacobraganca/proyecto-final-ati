import { Status } from './enum/status';
export interface Task {
  name: string;
  description: string;
  dateTime: string;
  status: Status;
  assignedUser: string;
  assignedHealthHome: string;
  assignedPatient: string;
  priority: boolean;
}
