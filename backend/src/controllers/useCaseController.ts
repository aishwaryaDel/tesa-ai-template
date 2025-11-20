import { Request, Response } from 'express';
import { useCaseService } from '../services/useCaseService';
import { CreateUseCaseDTO, UpdateUseCaseDTO } from '../models/UseCase';

const VALID_STATUSES = ['Ideation', 'Pre-Evaluation', 'Evaluation', 'PoC', 'MVP', 'Live', 'Archived'];
const VALID_DEPARTMENTS = ['Marketing', 'R&D', 'Procurement', 'IT', 'HR', 'Operations'];

export class UseCaseController {
  async getAllUseCases(req: Request, res: Response): Promise<void> {
    try {
      const useCases = await useCaseService.getAllUseCases();
      res.status(200).json({
        success: true,
        data: useCases,
        count: useCases.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch use cases',
      });
    }
  }

  async getUseCaseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Use case ID is required',
        });
        return;
      }

      const useCase = await useCaseService.getUseCaseById(id);

      if (!useCase) {
        res.status(404).json({
          success: false,
          error: 'Use case not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: useCase,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch use case',
      });
    }
  }

  async createUseCase(req: Request, res: Response): Promise<void> {
    try {
      const useCaseData: CreateUseCaseDTO = req.body;

      const validationError = this.validateUseCaseData(useCaseData);
      if (validationError) {
        res.status(400).json({
          success: false,
          error: validationError,
        });
        return;
      }

      const newUseCase = await useCaseService.createUseCase(useCaseData);

      res.status(201).json({
        success: true,
        data: newUseCase,
        message: 'Use case created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create use case',
      });
    }
  }

  async updateUseCase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates: UpdateUseCaseDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Use case ID is required',
        });
        return;
      }

      if (Object.keys(updates).length === 0) {
        res.status(400).json({
          success: false,
          error: 'No update data provided',
        });
        return;
      }

      const validationError = this.validateUpdateData(updates);
      if (validationError) {
        res.status(400).json({
          success: false,
          error: validationError,
        });
        return;
      }

      const updatedUseCase = await useCaseService.updateUseCase(id, updates);

      if (!updatedUseCase) {
        res.status(404).json({
          success: false,
          error: 'Use case not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedUseCase,
        message: 'Use case updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update use case',
      });
    }
  }

  async deleteUseCase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Use case ID is required',
        });
        return;
      }

      const useCase = await useCaseService.getUseCaseById(id);
      if (!useCase) {
        res.status(404).json({
          success: false,
          error: 'Use case not found',
        });
        return;
      }

      await useCaseService.deleteUseCase(id);

      res.status(200).json({
        success: true,
        message: 'Use case deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete use case',
      });
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
