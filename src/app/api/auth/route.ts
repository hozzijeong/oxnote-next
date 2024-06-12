import {
	deleteDocument,
	getDocumentSnapshot,
	updateDocumentData,
} from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { userFireStoreConverter } from './converter';
import type { NextResponse } from 'next/server';
import type { ResponseType } from '@/lib/request-wrapper/types';
import { RESPONSE_UNAUTHORIZED } from '@/lib/request-wrapper/constants';

type BodyParams = {
	uid: string;
	email: string;
	userName: string;
};

export const POST = requestWrapper(
	async (req) => {
		const { arg } = (await req.json()) as { arg: BodyParams };

		const snapshot = await getDocumentSnapshot(
			`${arg.uid}/user`,
			userFireStoreConverter
		);

		let successResponse: NextResponse<ResponseType<unknown>>;

		if (!snapshot.exists()) {
			await updateDocumentData({ path: `${arg.uid}/user`, data: arg });
			await updateDocumentData({ path: `${arg.uid}/category`, data: {} });
			await updateDocumentData({ path: `${arg.uid}/quiz`, data: {} });

			successResponse = nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.CREATED,
					data: null,
					errors: null,
				},

				options: {
					status: HTTP_STATUS_CODE.CREATED,
				},
			});
		} else {
			successResponse = nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.OK,
					data: null,
					errors: null,
				},

				options: {
					status: HTTP_STATUS_CODE.OK,
				},
			});
		}

		successResponse.cookies.set('user-id', arg.uid, {
			path: '/',
			maxAge: 14 * 24 * 60 * 60,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		});

		return successResponse;
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
	}
);

export const DELETE = requestWrapper(
	async (req) => {
		const { cookies } = req;

		const userId = cookies.get('user-id');

		if (!userId) {
			return nextResponseWithResponseType({
				body: RESPONSE_UNAUTHORIZED,
				options: {
					status: HTTP_STATUS_CODE.UNAUTHORIZED,
				},
			});
		}

		await deleteDocument(`${userId.value}`);
		await deleteDocument(`/user/${userId.value}`);

		const successResponse = nextResponseWithResponseType({
			body: {
				message: RESPONSE_MESSAGE.SUCCESS,
				code: HTTP_STATUS_CODE.OK,
				data: null,
				errors: null,
			},

			options: {
				status: HTTP_STATUS_CODE.OK,
			},
		});

		successResponse.cookies.delete('user-id');

		return successResponse;
	},
	{
		methodWhiteList: [HTTP_METHOD.DELETE],
	}
);
