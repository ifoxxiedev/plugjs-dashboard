import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'


import { isDev, isProd } from './config/env'

export default app => {

  app.use(cors())
  app.use(helmet())
  
  if (isProd()) app.enable('trust proxy')
  if (isDev()) app.use(morgan('dev'))

};