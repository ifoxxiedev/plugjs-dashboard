import fs from 'fs';
import path from 'path';

import AppError from './utils/api-error';

import { isDev } from './config/env';
import { Router } from 'express';


/*
Define help constants
*/
const BASENAME = path.basename(__filename);

const ROUTES_PATH = path.resolve(process.cwd(), isDev() ? 'src' : 'dist', 'router');

/* 
Filter files
*/
const filterFiles = (files) => {
  return files.filter(f => f.slice('-3') === '.js' && f !== BASENAME);
}

/*
Mapping files 
*/
const mapFiles = (files) => {
  return files.map(f => path.resolve(ROUTES_PATH, f));
}


/*
Mapping path of router
*/
const mapPath = filename => {
  if (filename.split("-").length) filename = filename.replace("-", "/");
  return `/${filename}`;
}


/*
Import router funcions
*/
const importFiles = (files) => {
  return files.map(f => ({
    name: path.basename(f).replace(/-?route[s|r].[j|t]s/, ""),
    basePath: mapPath(path.basename(f).replace(/-?route[s|r].[j|t]s/, "")),
    route: require(f).default || require(f).route || require(f).router || require(f),
  }))
}

/*
Mapping route from express
*/
const mapRoutes = (app, routes) => {
  routes.forEach(r =>  {
    const router = Router();
    r.route(router);
    app.use(r.basePath, router)
  })
}


const applyApi = (app) => {

  if (fs.existsSync(ROUTES_PATH)) {
    const dir = fs.readdirSync(ROUTES_PATH);

    if (dir.length) {
      const routes = importFiles(mapFiles(filterFiles(dir)))
      mapRoutes(app, routes);
    }

  }

  /*
  Handlers
  */
  app.use((req, res, next) => {   // Handler 404
  
    next(new AppError(`This path not exists ${req.url}`,  404));
  })
  
  app.use((err, req, res, next) => {   // Base Middleware
  
    const { isOperational, status, statusCode, message, stack } = err;
    const data = {
      status: isOperational ? status : 'fail',
      statusCode: isOperational ? statusCode : 500,
      message
    };

    
    if (isDev()) data.stack = stack
    res.status(data.statusCode).json(data);
  })
}

export default applyApi;