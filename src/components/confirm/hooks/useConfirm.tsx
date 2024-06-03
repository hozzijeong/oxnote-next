import { useOverlay } from '@toss/use-overlay';
import { useCallback, useMemo, useState } from 'react';
import { Confirm } from '..';
import { ConfirmProps } from '../confirm.type';

const useConfirm = () => {
	const overlay = useOverlay();
	const [answer, setAnswer] = useState<boolean | null>(null);

	const confirm = useCallback(
		(params: Pick<ConfirmProps, 'message' | 'title'>) => {
			const userAnswer = new Promise<boolean>((resolve) => {
				const resolveAndClose = (userAnswer: boolean) => {
					resolve(userAnswer);
				};

				overlay.open(({ exit }) => (
					<Confirm
						onClose={exit}
						onCancel={() => resolveAndClose(false)}
						onConfirm={() => resolveAndClose(true)}
						{...params}
					/>
				));
			});

			return userAnswer;
		},
		[overlay]
	);

	return confirm;
};

export default useConfirm;
