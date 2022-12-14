import express from 'express';
import { CleanPersonsController } from '../controllers/person/clean-persons-controller';
import { CreatePersonController } from '../controllers/person/create-person-controller';
import { LoadAllPersonsController } from '../controllers/person/load-all-persons';
import { LoadPersonByDocumentController } from '../controllers/person/load-person-by-document-controller';

const router = express.Router();
const createPersonController = new CreatePersonController();
const loadPersonByDocumentController = new LoadPersonByDocumentController();
const loadAllPersonsController = new LoadAllPersonsController();
const cleanPersonsController = new CleanPersonsController();

router.post('/person', createPersonController.handle);
router.get('/persons', loadAllPersonsController.handle);
router.get('/person/:cpf', loadPersonByDocumentController.handle);
router.delete('/clean', cleanPersonsController.handle);

export default router;
