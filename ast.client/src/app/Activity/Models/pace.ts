export interface Pace {
  label: string; 
  factor: number; 
}

export const PACES: Pace[] = [
  { label: 'Low', factor: 0.8 }, 
  { label: 'Medium', factor: 1 }, 
  { label: 'High', factor: 1.2 }, 
];
