import { http } from '@/lib/api';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { CustomError } from '@/lib/error';
import { useToast } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { deleteUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const { currentUser } = auth;

export const useDeleteAccount = () => {
	const addToast = useToast();
	const router = useRouter();

	const { trigger, isMutating, reset } = useSWRMutation<null, CustomError>(
		'/api/auth',
		http.delete,
		{
			onSuccess: async () => {
				if (currentUser) {
					await deleteUser(currentUser);
				}
				router.push(URL_PATH.AUTH);
			},
			onError: (err) => {
				addToast({ message: err.message });
			},
		}
	);

	const deleteAccount = useCallback(async () => {
		const result = await trigger();
		return result;
	}, [trigger]);

	return { deleteAccount, isMutating, reset };
};
