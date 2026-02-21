import api from './api';

export interface Trip {
  _id: string;
  tripId: string;
  vehicle: {
    _id: string;
    name: string;
    licensePlate: string;
    type: string;
  };
  driver: {
    _id: string;
    name: string;
    email: string;
  };
  origin: string;
  destination: string;
  cargoWeight: number;
  cargoDescription?: string;
  status: 'Draft' | 'Dispatched' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripData {
  vehicle: string;
  driver: string;
  origin: string;
  destination: string;
  cargoWeight: number;
  cargoDescription?: string;
  priority?: 'low' | 'medium' | 'high';
  scheduledDate?: string;
  estimatedDuration?: number;
}

export const tripService = {
  // Get all trips
  getAllTrips: async (params?: { status?: string; priority?: string; search?: string }) => {
    const response = await api.get('/trips', { params });
    return response.data;
  },

  // Get single trip
  getTrip: async (id: string) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // Create trip
  createTrip: async (data: CreateTripData) => {
    const response = await api.post('/trips', data);
    return response.data;
  },

  // Update trip
  updateTrip: async (id: string, data: Partial<CreateTripData>) => {
    const response = await api.put(`/trips/${id}`, data);
    return response.data;
  },

  // Delete trip
  deleteTrip: async (id: string) => {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  },

  // Update trip status
  updateTripStatus: async (id: string, status: Trip['status']) => {
    const response = await api.patch(`/trips/${id}/status`, { status });
    return response.data;
  },

  // Update trip progress
  updateTripProgress: async (id: string, progress: number) => {
    const response = await api.patch(`/trips/${id}/progress`, { progress });
    return response.data;
  },
};
