export interface User {
  uid: string;
  username: string;
  name: string;
  email: string;
  universityId?: string;
  photoUrl?: string;
  friends: string[];
  verified: boolean;
}

export interface EatingStatus {
  statusId: string;
  uid: string;
  universityId: string;
  status: 'looking_to_eat' | 'eating_now';
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  createdAt: Date;
  expiresAt: Date;
  visibleTo: string[];
  campusMode: boolean;
  photoUrl?: string;
  description?: string;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

export interface University {
  id: string;
  name: string;
  location: Location;
}
