// E-Defense — Defense Monitoring API Service
import apiClient from './client';
import { Defense, DashboardStats, DefenseStage, ActivityLog, ApiResponse, PaginatedResponse } from '../types';

export const defenseApi = {
  // List all defenses (filtered by role on backend)
  getAll: async (params?: {
    status?: string;
    defense_type?: string;
    page?: number;
    search?: string;
  }): Promise<PaginatedResponse<Defense>> => {
    const response = await apiClient.get<PaginatedResponse<Defense>>('/defenses', { params });
    return response.data;
  },

  // Get single defense details
  getById: async (id: number): Promise<Defense> => {
    const response = await apiClient.get<ApiResponse<Defense>>(`/defenses/${id}`);
    return response.data.data;
  },

  // Get defense stages / progress
  getStages: async (defenseId: number): Promise<DefenseStage[]> => {
    const response = await apiClient.get<ApiResponse<DefenseStage[]>>(`/defenses/${defenseId}/stages`);
    return response.data.data;
  },

  // Get defense timeline (activity log)
  getTimeline: async (defenseId: number): Promise<ActivityLog[]> => {
    const response = await apiClient.get<ApiResponse<ActivityLog[]>>(`/defenses/${defenseId}/timeline`);
    return response.data.data;
  },

  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/defenses/stats');
    return response.data.data;
  },

  // Update defense status
  updateStatus: async (id: number, status: string, remarks?: string): Promise<Defense> => {
    const response = await apiClient.put<ApiResponse<Defense>>(`/defenses/${id}/status`, { status, remarks });
    return response.data.data;
  },
};
