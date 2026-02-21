import api from './api';

export interface Driver {
  _id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseCategory: 'Motorcycle' | 'Van' | 'Truck' | 'Trailer';
  status: 'On Duty' | 'Off Duty' | 'Suspended';
  safetyScore: number;
  totalTrips?: number;
  tripCompletionRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDriverData {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseCategory: 'Motorcycle' | 'Van' | 'Truck' | 'Trailer';
}

export const driverService = {
  // Get all drivers
  getAllDrivers: async (params?: { search?: string; status?: string }) => {
    const response = await api.get('/drivers', { params });
    return response.data;
  },

  // Get single driver
  getDriver: async (id: string) => {
    const response = await api.get(`/drivers/${id}`);
    return response.data;
  },

  // Create driver
  createDriver: async (data: CreateDriverData) => {
    const response = await api.post('/drivers', data);
    return response.data;
  },

  // Update driver
  updateDriver: async (id: string, data: Partial<CreateDriverData>) => {
    const response = await api.put(`/drivers/${id}`, data);
    return response.data;
  },

  // Delete driver
  deleteDriver: async (id: string) => {
    const response = await api.delete(`/drivers/${id}`);
    return response.data;
  },

  // Update driver status
  updateDriverStatus: async (id: string, status: Driver['status']) => {
    const response = await api.patch(`/drivers/${id}/status`, { status });
    return response.data;
  },
};
