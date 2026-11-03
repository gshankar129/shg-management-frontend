export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  groupId?: number | null;
}

export interface AuthRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthLoginPayload {
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: AuthUser;
  };
  errors?: Array<{ field: string; message: string }>;
}