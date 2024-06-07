import { http } from '@/lib/api';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { Key } from 'swr';
import { CustomError } from '@/lib/error';
import { useToast } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';

export const useLogout = () => {
	const addToast = useToast();
	const router = useRouter();

	const { trigger, isMutating, reset } = useSWRMutation<null, CustomError>(
		'/api/auth/signout',
		http.post,
		{
			onSuccess: () => {
				router.push(URL_PATH.AUTH);
			},
			onError: (err) => {
				addToast({ message: err.message });
			},
		}
	);

	const logout = useCallback(async () => {
		const result = await trigger();
		return result;
	}, [trigger]);

	return { logout, isMutating, reset };
};
