import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import uploadConfig from './config/upload';
import GenericHandlerErrors from './middlewares/genericHandlerErrors';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => 
  GenericHandlerErrors.execute(err, request, response, _next)
);

app.listen(3333, () => {
  console.log('Server stared on port 3333!');
});
