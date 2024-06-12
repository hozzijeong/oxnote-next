import { APIError } from '../error';
import { HTTP_STATUS_CODE } from './constants';
import { NextResponse, NextRequest as BaseNextRequest } from 'next/server';

export type NextResponseWithResponseTypeParams<BodyType> = {
	body: BodyType;
	options?: ResponseInit;
};

type SuccessType<Data> = {
	message: 'SUCCESS';
	code: (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];
	data: Data;
	errors: null;
};

export type FailureType = {
	message: 'FAILURE';
	code: null;
	data: null;
	errors: APIError;
};

export type ResponseType<D> = SuccessType<D> | FailureType;

export type HTTPMethodKeys = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

type NextRequest = BaseNextRequest & { method: HTTPMethodKeys };

export type RequestWrapper = (
	handler: (req: NextRequest) => Promise<NextResponse<ResponseType<unknown>>>,
	options?: {
		methodWhiteList?: HTTPMethodKeys[];
		accessQuery?: boolean;
		certification?: boolean;
	}
) => (req: NextRequest) => Promise<NextResponse<ResponseType<unknown>>>;
