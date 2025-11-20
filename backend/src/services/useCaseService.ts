import { eventGridAdapter } from '../adapters/event-grid.adapter';
import { UseCase, CreateUseCaseDTO, UpdateUseCaseDTO } from '../models/UseCase';
import { AppError } from '../utils/AppError';

const useCases: UseCase[] = [];
let idCounter = 1;

export class UseCaseService {
  async getAllUseCases(): Promise<UseCase[]> {
    try {
      return useCases;
    } catch (error) {
      throw AppError.internal('Failed to fetch use cases');
    }
  }

  async getUseCaseById(id: string): Promise<UseCase | null> {
    try {
      return useCases.find(uc => uc.id === id) || null;
    } catch (error) {
      throw AppError.internal('Failed to fetch use case');
    }
  }

  async createUseCase(useCaseData: CreateUseCaseDTO): Promise<UseCase> {
    try {
      const newUseCase: UseCase = {
        ...useCaseData,
        id: String(idCounter++),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        related_use_case_ids: useCaseData.related_use_case_ids || [],
      };

      useCases.push(newUseCase);

      await eventGridAdapter.publish('useCase.created', {
        id: newUseCase.id,
        title: newUseCase.title,
        department: newUseCase.department,
        status: newUseCase.status,
      });

      return newUseCase;
    } catch (error) {
      throw AppError.internal('Failed to create use case');
    }
  }

  async updateUseCase(id: string, updates: UpdateUseCaseDTO): Promise<UseCase | null> {
    try {
      const index = useCases.findIndex(uc => uc.id === id);

      if (index === -1) {
        return null;
      }

      const updatedUseCase: UseCase = {
        ...useCases[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };

      useCases[index] = updatedUseCase;

      await eventGridAdapter.publish('useCase.updated', {
        id: updatedUseCase.id,
        title: updatedUseCase.title,
        changes: updates,
      });

      return updatedUseCase;
    } catch (error) {
      throw AppError.internal('Failed to update use case');
    }
  }

  async deleteUseCase(id: string): Promise<boolean> {
    try {
      const index = useCases.findIndex(uc => uc.id === id);

      if (index === -1) {
        return false;
      }

      const useCase = useCases[index];
      useCases.splice(index, 1);

      await eventGridAdapter.publish('useCase.deleted', {
        id,
        title: useCase.title,
      });

      return true;
    } catch (error) {
      throw AppError.internal('Failed to delete use case');
    }
  }
}

export const useCaseService = new UseCaseService();
