import { Contactos } from './contactos';

export interface Paciente {
  _id: string;
  name: string;
  document: string;
  contacts: Contactos[];
  mutualist: string;
  emergencyService: string;
  gpDoctor: string;
  partnerService: string;
  pathologies: string[];
  assignedHealthHome: string;
  caresAndComments: string;
  admissionDate: Date;
}
