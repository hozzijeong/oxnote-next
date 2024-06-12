import { app } from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	nextResponseWithResponseType,
	requestWrapper,
} from '@/lib/request-wrapper';
import { getAuth, signOut } from 'firebase/auth';

export const POST = requestWrapper(
	async () => {
		const auth = getAuth(app);

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
		await signOut(auth);

		successResponse.cookies.delete('user-id');

		return successResponse;
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
	}
);
