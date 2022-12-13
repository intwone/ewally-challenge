import express from 'express';
import { ListRecommendationsController } from '../controllers/recommendations/list-recommendations-controller';

const router = express.Router();

const listRecommendationsController = new ListRecommendationsController();

router.get('/recommendations/:document', listRecommendationsController.handle);

export default router;
