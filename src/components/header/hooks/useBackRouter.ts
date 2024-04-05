import { URL_PATH } from '@/constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const isKeyofURLPath = (backUrl: any): backUrl is keyof typeof URL_PATH => {
	return backUrl in URL_PATH;
};

export const useBackRouter = (
	pathId?: string | number,
	backUrl?: keyof typeof URL_PATH | -1
) => {
	const router = useRouter();

	const backClickHandler = useCallback(() => {
		let historyBackUrl: string | number = -1;

		if (isKeyofURLPath(backUrl)) {
			historyBackUrl = pathId
				? `${URL_PATH[backUrl]}/${pathId}`
				: URL_PATH[backUrl];
		}

		if (typeof historyBackUrl === 'number') {
			router.back();
		} else {
			router.push(historyBackUrl);
		}
	}, [backUrl, pathId, router]);

	return backClickHandler;
};
