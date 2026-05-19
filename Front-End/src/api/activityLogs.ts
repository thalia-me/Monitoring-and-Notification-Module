// E-Defense — Activity Log API Service
import apiClient from './client';
import { ActivityLog, ApiResponse, PaginatedResponse } from '../types';

export const activityLogApi = {
  // Get all activity logs
  getAll: async (params?: {
    page?: number;
    user_id?: number;
  }): Promise<PaginatedResponse<ActivityLog>> => {
    const response = await apiClient.get<PaginatedResponse<ActivityLog>>('/activity-logs', { params });
    return response.data;
  },

  // Get activity logs for a specific defense
  getByDefense: async (defenseId: number): Promise<ActivityLog[]> => {
    const response = await apiClient.get<ApiResponse<ActivityLog[]>>(`/activity-logs/defense/${defenseId}`);
    return response.data.data;
  },
};
