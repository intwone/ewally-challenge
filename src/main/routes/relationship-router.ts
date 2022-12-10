import express from 'express';
import { CreateRelationshipController } from '../controllers/relationship/create-relationship-controller';
import { LoadAllRelationshipsController } from '../controllers/relationship/load-all-relationships';

const router = express.Router();
const createRelationshipController = new CreateRelationshipController();
const loadAllRelationshipsController = new LoadAllRelationshipsController();

router.post('/relationship', createRelationshipController.handle);
router.get('/relationships', loadAllRelationshipsController.handle);

export default router;
