import { http } from '@/lib/api';
import { CustomError } from '@/lib/error';
import { useCallback } from 'react';
import { Key } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

type BodyParams = {
	uid: string;
	email: string | null;
	userName: string | null;
};

type Params<D> = Pick<
	SWRMutationConfiguration<D, CustomError>,
	'onSuccess' | 'onError'
>;

export const useLogin = ({ onSuccess, onError }: Params<void> = {}) => {
	const { trigger, isMutating, reset } = useSWRMutation<
		void,
		CustomError,
		Key,
		BodyParams
	>('/api/auth', http.post, { onSuccess, onError });

	const login = useCallback(
		async (params: BodyParams) => {
			const result = await trigger(params);
			return result;
		},
		[trigger]
	);

	return { login, isMutating, reset };
};
