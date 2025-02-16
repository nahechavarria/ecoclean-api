import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError';

// Middleware de manejo de errores
function errorHandler(
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error('Error:', err.message);

	// Si el error tiene un código de estado, lo usamos; de lo contrario, devolvemos 500
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		message: err.message || 'Error interno del servidor',
		error: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Solo mostramos detalles en desarrollo
	});
}

export { errorHandler };
