export type EquipmentStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export type UserRole = 'STUDENT' | 'RESEARCHER' | 'STAFF' | 'ADMIN';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    department?: string;
    role?: UserRole;
    createdAt?: string;
    lastLoginAt?: string;
}
export interface Equipment {
  id: string;
  name: string;
  category: string;
  description?: string;
  status: EquipmentStatus;
  connectingStr: string;
  model?: string;
  manufacturer?: string;
  serialNumber?: string;
  purchaseYear?: number;
  calibrationDue?: string;
  location?: string;
  requiresTraining: boolean;
  imageUrl?: string;
  videoUrl?: string;
  documentationUrl?: string;
  notes: string;
}

export interface Booking {
  id: string;
  equipment: Equipment;
  user: User;
  startTime: string;
  endTime: string;
  purpose?: string;
  status: BookingStatus;
  createdAt?: string;
}