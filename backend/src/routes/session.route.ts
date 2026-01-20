import { deleteSessionHandler, getSessionHandler } from '@controllers/session.controller.js';
import Router from 'express';

const sessionRouter = Router();

sessionRouter.get('/', getSessionHandler);
sessionRouter.delete('/:id', deleteSessionHandler);

export default sessionRouter;
