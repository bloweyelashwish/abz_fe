import axios from 'axios';
import { BASE_API_URL } from '~/constants';
import type {
  UsersResponse,
  TokenResponse,
  NewUserResponse,
  PositionListResponse,
} from '~/types';
import { getSessionToken } from '~/utils';

const axiosService = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use((config) => {
  const token = getSessionToken();
  config.headers.Token = token ?? '';

  return config;
});

export async function getToken(): Promise<TokenResponse> {
  const { data } = await axiosService.get<TokenResponse>('/token');
  return data;
}

export async function getUsers(params = ''): Promise<UsersResponse> {
  const { data } = await axiosService.get<UsersResponse>(`/users${params}`);
  return data;
}

export async function createUser(formData: FormData): Promise<NewUserResponse> {
  const { data } = await axiosService.post<NewUserResponse>(
    '/users',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
}

export async function getPositionsList() {
  const { data } = await axiosService.get<PositionListResponse>('/positions');
  return data;
}
