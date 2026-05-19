// E-Defense Monitoring & Notification — TypeScript Types

// ─── User Roles ──────────────────────────────────────────────
export type UserRole =
  | 'student_researcher'
  | 'adviser'
  | 'dean'
  | 'admin';

export const RoleLabels: Record<UserRole, string> = {
  student_researcher: 'Student Researcher',
  adviser: 'Adviser',
  dean: 'Dean',
  admin: 'Admin',
};

// ─── User ────────────────────────────────────────────────────
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  email: string;
  role: UserRole;
  student_number?: string;
  department: string;
  course?: string;
  grade_level?: string;
  phone_number?: string;
  birthdate?: string;
  college: string;
  avatar_url: string | null;
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Defense ─────────────────────────────────────────────────
export type DefenseType = 'proposal' | 'mid_defense' | 'final_defense';
export type DefenseStatus = 'scheduled' | 'in_progress' | 'completed' | 'deferred' | 'cancelled';

export const DefenseTypeLabels: Record<DefenseType, string> = {
  proposal: 'Proposal Defense',
  mid_defense: 'Mid-Term Defense',
  final_defense: 'Final Defense',
};

export const DefenseStatusLabels: Record<DefenseStatus, string> = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  deferred: 'Deferred',
  cancelled: 'Cancelled',
};

export interface Defense {
  id: number;
  research_title: string;
  research_abstract: string;
  student_id: number;
  adviser_id: number;
  panel_chairman_id: number;
  secretary_id: number;
  coordinator_id: number;
  defense_type: DefenseType;
  status: DefenseStatus;
  defense_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  college: string;
  department: string;
  remarks: string | null;
  verdict: string | null;
  overall_score: number | null;
  student?: User;
  adviser?: User;
  panel_chairman?: User;
  secretary?: User;
  coordinator?: User;
  panelists?: DefensePanelist[];
  stages?: DefenseStage[];
  created_at: string;
  updated_at: string;
}

// ─── Defense Panelist ────────────────────────────────────────
export type PanelistStatus = 'pending' | 'confirmed' | 'declined';

export interface DefensePanelist {
  id: number;
  defense_id: number;
  panelist_id: number;
  status: PanelistStatus;
  score_given: number | null;
  feedback: string | null;
  panelist?: User;
  created_at: string;
  updated_at: string;
}

// ─── Defense Stage ───────────────────────────────────────────
export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface DefenseStage {
  id: number;
  defense_id: number;
  stage_name: string;
  status: StageStatus;
  sort_order: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Notification ────────────────────────────────────────────
export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'push';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface AppNotification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  data: Record<string, any> | null;
  channel: NotificationChannel;
  priority: NotificationPriority;
  is_read: boolean;
  read_at: string | null;
  sent_at: string;
  created_at: string;
  updated_at: string;
}

// ─── Activity Log ────────────────────────────────────────────
export interface ActivityLog {
  id: number;
  user_id: number;
  defense_id: number | null;
  action: string;
  description: string;
  metadata: Record<string, any> | null;
  ip_address: string;
  user?: User;
  defense?: Defense;
  created_at: string;
}

// ─── Notification Preferences ────────────────────────────────
export interface NotificationPreferences {
  id: number;
  user_id: number;
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  in_app_enabled: boolean;
  quiet_hours: {
    enabled: boolean;
    start: string;
    end: string;
  } | null;
  created_at: string;
  updated_at: string;
}

// ─── API Response Types ──────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// ─── Dashboard Stats ─────────────────────────────────────────
export interface DashboardStats {
  total_defenses: number;
  scheduled: number;
  in_progress: number;
  completed: number;
  deferred: number;
  cancelled: number;
  upcoming_defenses: Defense[];
  recent_activity: ActivityLog[];
  unread_notifications: number;
}

// ─── Auth Types ──────────────────────────────────────────────
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: UserRole;
  student_number?: string;
  department?: string;
  course?: string;
  grade_level?: string;
  phone_number?: string;
  birthdate?: string;
  college?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
