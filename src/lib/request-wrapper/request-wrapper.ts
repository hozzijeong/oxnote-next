import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	RESPONSE_NOT_FOUND,
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
		const { methodWhiteList = [] } = options;

		if (!url) {
			return nextResponseWithResponseType({
				body: RESPONSE_NOT_FOUND,
				options: { status: HTTP_STATUS_CODE.NOT_FOUND },
			});
		}

		if (methodWhiteList && methodWhiteList.includes(method)) {
			try {
				const result = await handler(req);

				return result;
			} catch (e) {
				let message = '알 수 없는 에러가 발생했습니다.';

				if (e instanceof Error) {
					message = e.message;
				}

				return nextResponseWithResponseType({
					body: {
						message: RESPONSE_MESSAGE.FAILURE,
						code: null,
						data: null,
						errors: {
							code: HTTP_STATUS_CODE.NOT_FOUND,
							message,
						},
					},
					options: {
						status: HTTP_STATUS_CODE.NOT_FOUND,
					},
				});
			}
		}

		return new NextResponse(JSON.stringify(RESPONSE_NOT_FOUND), {
			status: HTTP_STATUS_CODE.NOT_METHOD_ALLOWED,
		});
	};
