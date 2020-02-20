import express from 'express'
import applyMiddleware from './middlewares';
import applyRoutes from './routes'

export const startApi = () => {

  // Express app
  const app = express()

  applyMiddleware(app);
  applyRoutes(app);

  return app;
}