import { Router } from 'express';
import { router as movies } from '../routes/movies.routes.js';
const APIRouter = Router();
APIRouter.use('/movies', movies);

export default APIRouter;
