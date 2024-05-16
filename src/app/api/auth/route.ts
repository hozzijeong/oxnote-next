import { getDocumentSnapshot, updateDocumentData } from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { userFireStoreConverter } from './converter';

type BodyParams = {
	uid: string;
	email: string;
	userName: string;
};

export const POST = requestWrapper(
	async (req) => {
		const { arg } = (await req.json()) as { arg: BodyParams };
		try {
			const snapshot = await getDocumentSnapshot(
				`${arg.uid}/user`,
				userFireStoreConverter
			);

			if (!snapshot.exists()) {
				await updateDocumentData({ path: `${arg.uid}/user`, data: arg });
				await updateDocumentData({ path: `${arg.uid}/category`, data: {} });
				await updateDocumentData({ path: `${arg.uid}/quiz`, data: {} });

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

			successResponse.cookies.set('user-id', arg.uid, {
				path: '/',
			});

			return successResponse;
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
