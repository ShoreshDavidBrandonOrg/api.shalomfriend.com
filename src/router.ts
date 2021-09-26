import { Router } from 'express';
import * as rateLimit from 'express-rate-limit';

import { authRequest, login } from './controllers/AuthController';
import * as ResourceController from './controllers/ResourceController';
import * as SermonController from './controllers/SermonController';
// import { createUser } from './controllers/UserController';
import { subscribeToEmail } from './services/email/EmailService';

const router = Router();

// Limiter for broad use-cases
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
// });

// Limiter speficially for auth requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

// Auth
router.post('/auth', authLimiter, login);

// Email
router.post('/email', subscribeToEmail);

// Resources
router.get('/resources', ResourceController.allResources);
router.get('/resources/:id', ResourceController.singleResourceById);
router.get('/resources/slug/:slug', ResourceController.singleResourceBySlug);
router.post('/resources', authRequest, ResourceController.createResource);
router.put('/resources/:id', authRequest, ResourceController.updateResource);
router.delete('/resources/:id', authRequest, ResourceController.deleteResource);

// Sermons
router.get('/sermons', SermonController.allSermons);
router.get('/sermons/:id', SermonController.singleSermonById);
router.get('/sermons/slug/:slug', SermonController.singleSermonBySlug);
router.post('/sermons', authRequest, SermonController.createSermon);
router.put('/sermons/:id', authRequest, SermonController.updateSermon);
router.delete('/sermons/:id', authRequest, SermonController.deleteSermon);

export { router };
