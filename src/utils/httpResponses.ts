import { Response } from 'express';
import { ApiResponseStatus } from './enums/enums';

/**
 * 200 for success with response
 */
export function success(res: Response, data: any) {
    // { status: ApiResponseStatus.Success, data: data }
    res.status(200).json(data);
}

/**
 * 201 success Created response.
 */
export function successCreation(res: Response, data: any) {
    // { status: ApiResponseStatus.Success, data: data }
    res.status(201).json(data);
}

/**
 * 204 success with no content
 */
export function successNoContent(res: Response) {
    res.status(204).send();
}

/**
 * 400 Bad Request response.
 */
export function badRequest(res: Response, message: string, err?: any) {
    res.status(400).json({ status: ApiResponseStatus.BadRequest, message, err });
}

/**
 * 404 Not Found response.
 */
export function unauthorized(res: Response, message: string) {
    res.status(401).json({ status: ApiResponseStatus.Unauthorized, message });
}

/**
 * 404 Not Found response.
 */
export function notFound(res: Response, message: string) {
    res.status(404).json({ status: ApiResponseStatus.NotFound, message });
}

/**
 * 409 Conflict response.
 */
export function conflict(res: Response, message: string) {
    res.status(409).json({ status: ApiResponseStatus.Conflict, message });
}

/**
 * 422 Unprocessable Entity response.
 */
export function unprocessableEntity(res: Response, message: string) {
    res.status(422).json({ status: ApiResponseStatus.Failure, message });
}

/**
 * 500 Internal Server Error response.
 */
export function internalServerError(res: Response, message: string) {
    res.status(500).json({ status: ApiResponseStatus.Failure, message });
}

/**
 * 406 Not Acceptable Error response.
 */
export function notAcceptable(res: Response, message: string) {
    res.status(406).json({ status: ApiResponseStatus.Failure, message });
}
