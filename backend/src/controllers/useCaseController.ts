import { Request, Response, NextFunction } from 'express';
import { useCaseService } from '../services/useCaseService';
import { CreateUseCaseDTO, UpdateUseCaseDTO } from '../models/UseCase';
import { AppError } from '../utils/AppError';
import { VALID_STATUSES, VALID_DEPARTMENTS } from '../config';

export class UseCaseController {
  async getAllUseCases(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCases = await useCaseService.getAllUseCases();
      res.status(200).json({
        success: true,
        data: useCases,
        count: useCases.length,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUseCaseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw AppError.badRequest('Use case ID is required');
      }

      const useCase = await useCaseService.getUseCaseById(id);

      if (!useCase) {
        throw AppError.notFound('Use case not found');
      }

      res.status(200).json({
        success: true,
        data: useCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUseCase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCaseData: CreateUseCaseDTO = req.body;

      const validationError = this.validateUseCaseData(useCaseData);
      if (validationError) {
        throw AppError.badRequest(validationError);
      }

      const newUseCase = await useCaseService.createUseCase(useCaseData);

      res.status(201).json({
        success: true,
        data: newUseCase,
        message: 'Use case created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUseCase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateUseCaseDTO = req.body;

      if (!id) {
        throw AppError.badRequest('Use case ID is required');
      }

      if (Object.keys(updates).length === 0) {
        throw AppError.badRequest('No update data provided');
      }

      const validationError = this.validateUpdateData(updates);
      if (validationError) {
        throw AppError.badRequest(validationError);
      }

      const updatedUseCase = await useCaseService.updateUseCase(id, updates);

      if (!updatedUseCase) {
        throw AppError.notFound('Use case not found');
      }

      res.status(200).json({
        success: true,
        data: updatedUseCase,
        message: 'Use case updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUseCase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw AppError.badRequest('Use case ID is required');
      }

      const deleted = await useCaseService.deleteUseCase(id);

      if (!deleted) {
        throw AppError.notFound('Use case not found');
      }

      res.status(200).json({
        success: true,
        message: 'Use case deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  private validateUseCaseData(data: CreateUseCaseDTO): string | null {
    if (!data.title || data.title.trim().length === 0) {
      return 'Title is required';
    }

    if (!data.short_description || data.short_description.trim().length === 0) {
      return 'Short description is required';
    }

    if (!data.full_description || data.full_description.trim().length === 0) {
      return 'Full description is required';
    }

    if (!data.department || !VALID_DEPARTMENTS.includes(data.department)) {
      return `Invalid department. Must be one of: ${VALID_DEPARTMENTS.join(', ')}`;
    }

    if (!data.status || !VALID_STATUSES.includes(data.status)) {
      return `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`;
    }

    if (!data.owner_name || data.owner_name.trim().length === 0) {
      return 'Owner name is required';
    }

    if (!data.owner_email || !this.isValidEmail(data.owner_email)) {
      return 'Valid owner email is required';
    }

    if (!Array.isArray(data.technology_stack)) {
      return 'Technology stack must be an array';
    }

    if (!Array.isArray(data.tags)) {
      return 'Tags must be an array';
    }

    if (!data.internal_links || typeof data.internal_links !== 'object') {
      return 'Internal links must be an object';
    }

    return null;
  }

  private validateUpdateData(data: UpdateUseCaseDTO): string | null {
    if (data.status && !VALID_STATUSES.includes(data.status)) {
      return `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`;
    }

    if (data.department && !VALID_DEPARTMENTS.includes(data.department)) {
      return `Invalid department. Must be one of: ${VALID_DEPARTMENTS.join(', ')}`;
    }

    if (data.owner_email && !this.isValidEmail(data.owner_email)) {
      return 'Invalid email format';
    }

    if (data.technology_stack && !Array.isArray(data.technology_stack)) {
      return 'Technology stack must be an array';
    }

    if (data.tags && !Array.isArray(data.tags)) {
      return 'Tags must be an array';
    }

    if (data.internal_links && typeof data.internal_links !== 'object') {
      return 'Internal links must be an object';
    }

    return null;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const useCaseController = new UseCaseController();
