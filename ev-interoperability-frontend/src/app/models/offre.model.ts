export interface Offre {
  title: string;
  label: string;
  description: string;
  status: string;
  characteristics: string;
  date: Date;
  offreLocation: string;
  offreType: 'public' | 'private'; // Assuming 'public' or 'private' are the only valid values
  user: string; // Assuming user is a string, adjust the type accordingly based on your User model
  _id?: string; // Optional, assuming the ID may be present in some scenarios
}
