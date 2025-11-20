import { UseCase, CreateUseCaseDTO, UpdateUseCaseDTO } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

class UseCaseApiService {
  private async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data.data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getAllUseCases(): Promise<UseCase[]> {
    return this.fetchWithErrorHandling<UseCase[]>(
      `${API_BASE_URL}/use-cases`
    );
  }

  async getUseCaseById(id: string): Promise<UseCase> {
    return this.fetchWithErrorHandling<UseCase>(
      `${API_BASE_URL}/use-cases/${id}`
    );
  }

  async createUseCase(useCaseData: CreateUseCaseDTO): Promise<UseCase> {
    return this.fetchWithErrorHandling<UseCase>(
      `${API_BASE_URL}/use-cases`,
      {
        method: 'POST',
        body: JSON.stringify(useCaseData),
      }
    );
  }

  async updateUseCase(id: string, updates: UpdateUseCaseDTO): Promise<UseCase> {
    return this.fetchWithErrorHandling<UseCase>(
      `${API_BASE_URL}/use-cases/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      }
    );
  }

  async deleteUseCase(id: string): Promise<void> {
    await this.fetchWithErrorHandling<void>(
      `${API_BASE_URL}/use-cases/${id}`,
      {
        method: 'DELETE',
      }
    );
  }
}

export const useCaseApi = new UseCaseApiService();
