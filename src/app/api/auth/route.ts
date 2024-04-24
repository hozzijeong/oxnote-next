import { getDocumentSnapshot, updateDocumentData } from '@/lib/firebase';
import { userConverter } from '@/lib/firebase/converter';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { NextResponse } from 'next/server';

type BodyParams = {
	uid: string;
	email: string;
	userName: string;
};

export const POST = requestWrapper(
	async (req) => {
		const body = (await req.json()) as BodyParams;
		try {
			const snapshot = await getDocumentSnapshot(
				`${body.uid}/user`,
				userConverter
			);

			if (!snapshot.exists()) {
				await updateDocumentData({ path: `${body.uid}/user`, data: body });
				await updateDocumentData({ path: `${body.uid}/category`, data: {} });
				await updateDocumentData({ path: `${body.uid}/quiz`, data: {} });

				return nextResponseWithResponseType({
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
			}

			return nextResponseWithResponseType({
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
		} catch (e) {
			return nextResponseWithResponseType({
				body: {
					message: RESPONSE_MESSAGE.FAILURE,
					code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
					data: null,
					errors: {
						code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
						message: `확인되지 않은 에러가 발생했습니다 : ${JSON.stringify(e)}`,
					},
				},

				options: {
					status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
				},
			});
		}
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
	}
);
