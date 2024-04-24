import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_NOT_FOUND,
	RESPONSE_UNAUTHORIZED,
} from './constants';
import type {
	NextResponseWithResponseTypeParams,
	RequestWrapper,
	ResponseType,
} from './types';
import { NextResponse } from 'next/server';

export const nextResponseWithResponseType = <BodyType>({
	body,
	options,
}: NextResponseWithResponseTypeParams<BodyType>): NextResponse<
	ResponseType<BodyType>
> => {
	return new NextResponse(JSON.stringify(body), options);
};

export const requestWrapper: RequestWrapper =
	(handler, options = {}) =>
	async (req) => {
		const { url, method = HTTP_METHOD.GET } = req;
		const {
			methodWhiteList = [],
			accessQuery = false,
			certification = false,
		} = options;

		if (!url) {
			return nextResponseWithResponseType({
				body: RESPONSE_NOT_FOUND,
				options: { status: HTTP_STATUS_CODE.NOT_FOUND },
			});
		}

		if (certification) {
			const { cookies } = req;

			const cookie = cookies.get('user-id');

			if (cookie === undefined)
				return new NextResponse(JSON.stringify(RESPONSE_UNAUTHORIZED), {
					status: HTTP_STATUS_CODE.UNAUTHORIZED,
				});
		}

		if (methodWhiteList && methodWhiteList.includes(method)) {
			return handler(req);
		}

		return new NextResponse(JSON.stringify(RESPONSE_NOT_FOUND), {
			status: HTTP_STATUS_CODE.NOT_METHOD_ALLOWED,
		});
	};
