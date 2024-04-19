import { getDocumentInfos, updateDocumentData } from '@/lib/firebase';
import {
	HTTP_METHOD,
	HTTP_STATUS_CODE,
	RESPONSE_MESSAGE,
	withFilter,
} from '@/lib/with-filter';
import { NextResponse } from 'next/server';

type BodyParams = {
	uid: string;
	email: string;
	userName: string;
};

export const POST = withFilter(
	async (req) => {
		const body = (await req.json()) as BodyParams;

		try {
			const response = await getDocumentInfos(`${body.uid}/user`);

			return new NextResponse(
				JSON.stringify({
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.OK,
					data: null,
					errors: null,
				}),
				{
					status: HTTP_STATUS_CODE.OK,
				}
			);
		} catch (e) {
			// NOTE: 만약에 현재 존재하지 않는 사용자라면 해당 값 리턴
			// TODO: 에러 타입 구분하기
			await updateDocumentData({ path: `${body.uid}/user`, data: body });

			return new NextResponse(
				JSON.stringify({
					message: RESPONSE_MESSAGE.SUCCESS,
					code: HTTP_STATUS_CODE.CREATED,
					data: null,
					errors: null,
				}),
				{
					status: HTTP_STATUS_CODE.CREATED,
				}
			);
		}
	},
	{
		methodWhiteList: [HTTP_METHOD.POST],
	}
);
