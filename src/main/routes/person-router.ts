import express from 'express';
import { CleanPersonsController } from '../controllers/clean-persons-controller';
import { CreatePersonController } from '../controllers/create-person-controller';
import { LoadAllPersonsController } from '../controllers/load-all-persons';
import { LoadPersonByDocumentController } from '../controllers/load-person-by-document-controller';

const router = express.Router();
const createPersonController = new CreatePersonController();
const loadPersonByDocumentController = new LoadPersonByDocumentController();
const loadAllPersonsController = new LoadAllPersonsController();
const cleanPersonsController = new CleanPersonsController();

router.post('/person', createPersonController.handle);
router.get('/persons', loadAllPersonsController.handle);
router.get('/person/:document', loadPersonByDocumentController.handle);
router.delete('/persons', cleanPersonsController.handle);

export default router;
