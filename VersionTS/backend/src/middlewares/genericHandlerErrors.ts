import {Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

class GenericHandlerErrors {

  public async execute(err: Error, request: Request, response: Response, next: NextFunction): Promise<Response>{
    if(err instanceof AppError){
      return response.status(err.statusCode).json({ 
          status: 'error',
          mesage: err.message,
      })
    }
  
    console.error(err);
  
    return response.status(500).json({ 
      status: 'error',
      mesage: 'Internal server error',
    });
  }
}

export default new GenericHandlerErrors();
