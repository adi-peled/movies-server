import { Router } from 'express';
import { MovieController } from '../controllers/movies/movies.controllers.js';

export const router = Router();

router.get('/', MovieController.getDefault);
router.get('/search', MovieController.searchByName);
router.get('/fullInfo/:movieId', MovieController.getFullInfo);

