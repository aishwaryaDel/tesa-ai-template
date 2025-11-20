import { Router } from 'express';
import { useCaseController } from '../controllers/useCaseController';

const router = Router();

router.get('/', (req, res) => useCaseController.getAllUseCases(req, res));

router.get('/:id', (req, res) => useCaseController.getUseCaseById(req, res));

router.post('/', (req, res) => useCaseController.createUseCase(req, res));

router.put('/:id', (req, res) => useCaseController.updateUseCase(req, res));

router.delete('/:id', (req, res) => useCaseController.deleteUseCase(req, res));

export default router;
