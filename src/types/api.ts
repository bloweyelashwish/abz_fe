export interface ApiResponse {
  success: boolean;
  message?: string;
  fails?: {
    [key: string]: string[];
  };
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  registration_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface TokenResponse extends ApiResponse {
  token: string;
}

export interface UsersResponse extends ApiResponse {
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: ApiUser[];
}

export interface NewUserResponse extends ApiResponse {
  user_id: string;
  message: string;
}

export interface Position {
  id: string;
  name: string;
}

export interface PositionListResponse extends ApiResponse {
  positions: Position[];
}
