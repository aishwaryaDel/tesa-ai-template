import { Router } from 'express';
import { useCaseController } from '../controllers/useCaseController';

const router = Router();

router.get('/', (req, res, next) => useCaseController.getAllUseCases(req, res, next));

router.get('/:id', (req, res, next) => useCaseController.getUseCaseById(req, res, next));

router.post('/', (req, res, next) => useCaseController.createUseCase(req, res, next));

router.put('/:id', (req, res, next) => useCaseController.updateUseCase(req, res, next));

router.delete('/:id', (req, res, next) => useCaseController.deleteUseCase(req, res, next));

export default router;
