import { http } from '@/lib/api';
import { Category } from '../types';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { Key } from 'swr';
import { CustomError } from '@/lib/error';
import { useToast } from '@/components/toast';

export const useCreateCategory = () => {
	const addToast = useToast();

	const { trigger, isMutating, reset } = useSWRMutation<
		null,
		CustomError,
		Key,
		Category
	>('/api/category', http.post, {
		onError: (err) => {
			addToast({ message: err.message });
		},
	});

	const createCategory = useCallback(
		async (params: Category) => {
			const result = await trigger(params);
			return result;
		},
		[trigger]
	);

	return { createCategory, isMutating, reset };
};
