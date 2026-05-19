// E-Defense — Notification API Service
import apiClient from './client';
import { AppNotification, NotificationPreferences, ApiResponse, PaginatedResponse } from '../types';

export const notificationApi = {
  // Get paginated notifications
  getAll: async (params?: {
    page?: number;
    priority?: string;
    is_read?: boolean;
  }): Promise<PaginatedResponse<AppNotification>> => {
    const response = await apiClient.get<PaginatedResponse<AppNotification>>('/notifications', { params });
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return response.data.data.count;
  },

  // Mark single as read
  markAsRead: async (id: number): Promise<void> => {
    await apiClient.put(`/notifications/${id}/read`);
  },

  // Mark all as read
  markAllAsRead: async (): Promise<void> => {
    await apiClient.put('/notifications/read-all');
  },

  // Delete notification
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/notifications/${id}`);
  },

  // Get notification preferences
  getPreferences: async (): Promise<NotificationPreferences> => {
    const response = await apiClient.get<ApiResponse<NotificationPreferences>>('/notifications/preferences');
    return response.data.data;
  },

  // Update notification preferences
  updatePreferences: async (data: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
    const response = await apiClient.put<ApiResponse<NotificationPreferences>>('/notifications/preferences', data);
    return response.data.data;
  },
};
