import { useCaseRepository } from '../repository/useCase.repository';
import { eventGridAdapter } from '../adapters/event-grid.adapter';
import { UseCase, CreateUseCaseDTO, UpdateUseCaseDTO } from '../models/UseCase';
import { AppError } from '../utils/AppError';

export class UseCaseService {
  async getAllUseCases(): Promise<UseCase[]> {
    try {
      return await useCaseRepository.findAll();
    } catch (error) {
      throw AppError.internal('Failed to fetch use cases');
    }
  }

  async getUseCaseById(id: string): Promise<UseCase | null> {
    try {
      return await useCaseRepository.findById(id);
    } catch (error) {
      throw AppError.internal('Failed to fetch use case');
    }
  }

  async createUseCase(useCaseData: CreateUseCaseDTO): Promise<UseCase> {
    try {
      const newUseCase = await useCaseRepository.create(useCaseData);

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
      const existingUseCase = await useCaseRepository.findById(id);
      if (!existingUseCase) {
        return null;
      }

      const updatedUseCase = await useCaseRepository.update(id, updates);

      if (updatedUseCase) {
        await eventGridAdapter.publish('useCase.updated', {
          id: updatedUseCase.id,
          title: updatedUseCase.title,
          changes: updates,
        });
      }

      return updatedUseCase;
    } catch (error) {
      throw AppError.internal('Failed to update use case');
    }
  }

  async deleteUseCase(id: string): Promise<boolean> {
    try {
      const useCase = await useCaseRepository.findById(id);
      if (!useCase) {
        return false;
      }

      const deleted = await useCaseRepository.delete(id);

      if (deleted) {
        await eventGridAdapter.publish('useCase.deleted', {
          id,
          title: useCase.title,
        });
      }

      return deleted;
    } catch (error) {
      throw AppError.internal('Failed to delete use case');
    }
  }
}

export const useCaseService = new UseCaseService();
