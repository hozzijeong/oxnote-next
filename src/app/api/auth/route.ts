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
			expires: 60 * 60 * 24 * 14 * 1000,
			httpOnly: true,
			secure: false,
		});

		return successResponse;
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
	}
);
