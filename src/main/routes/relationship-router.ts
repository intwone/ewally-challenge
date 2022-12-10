import express from 'express';
import { CreateRelationshipController } from '../controllers/relationship/create-relationship-controller';

const router = express.Router();
const createRelationshipController = new CreateRelationshipController();

router.post('/relationship', createRelationshipController.handle);

export default router;
