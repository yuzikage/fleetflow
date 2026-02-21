import api from './api';

export interface Vehicle {
  _id: string;
  name: string;
  licensePlate: string;
  type: 'Motorcycle' | 'Van' | 'Truck' | 'Trailer';
  maxCapacity: number;
  odometer: number;
  status: 'Available' | 'On Trip' | 'In Shop' | 'Retired';
  healthScore: number;
  acquisitionDate: Date;
  acquisitionCost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleData {
  name: string;
  licensePlate: string;
  type: string;
  maxCapacity: number;
  odometer?: number;
  acquisitionDate?: Date;
  acquisitionCost?: number;
}

export const vehicleService = {
  async getAllVehicles(params?: { search?: string; status?: string; type?: string }): Promise<Vehicle[]> {
    const response = await api.get<{ success: boolean; data: Vehicle[]; count: number }>('/vehicles', { params });
    return response.data.data;
  },

  async getVehicle(id: string): Promise<Vehicle> {
    const response = await api.get<{ success: boolean; data: Vehicle }>(`/vehicles/${id}`);
    return response.data.data;
  },

  async createVehicle(data: CreateVehicleData): Promise<Vehicle> {
    const response = await api.post<{ success: boolean; data: Vehicle }>('/vehicles', data);
    return response.data.data;
  },

  async updateVehicle(id: string, data: Partial<CreateVehicleData>): Promise<Vehicle> {
    const response = await api.put<{ success: boolean; data: Vehicle }>(`/vehicles/${id}`, data);
    return response.data.data;
  },

  async deleteVehicle(id: string): Promise<void> {
    await api.delete(`/vehicles/${id}`);
  },

  async updateVehicleStatus(id: string, status: string): Promise<Vehicle> {
    const response = await api.patch<{ success: boolean; data: Vehicle }>(`/vehicles/${id}/status`, { status });
    return response.data.data;
  },
};
