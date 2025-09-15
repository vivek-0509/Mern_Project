import { Router } from 'express';
import { body, param } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

router.use(requireAuth);

router.get('/', listTasks);

router.post(
  '/',
  [
    body('title').isString().trim().isLength({ min: 1 }),
    body('description').optional().isString(),
    body('category').isString().trim().isLength({ min: 1 }),
  ],
  createTask
);

router.patch(
  '/:id',
  [
    param('id').isMongoId(),
    body('isDone').optional().isBoolean(),
    body('title').optional().isString().isLength({ min: 1 }),
    body('description').optional().isString(),
    body('category').optional().isString().isLength({ min: 1 }),
  ],
  updateTask
);

router.delete('/:id', [param('id').isMongoId()], deleteTask);

export default router;


