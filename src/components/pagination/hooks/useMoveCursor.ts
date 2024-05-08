import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { PaginationProps } from '../Pagination';

const useMoveCursor = ({ currentPosition, positions }: PaginationProps) => {
	const cursor = positions.findIndex((id) => id === currentPosition);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	const beforeUnLoadHandler = useCallback((event: BeforeUnloadEvent) => {
		event.preventDefault();

		return (event.returnValue = '');
	}, []);

	// 초반에 가운데로 이동하도록 설정
	useLayoutEffect(() => {
		selectedRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}, []);

	useEffect(() => {
		window.addEventListener('beforeunload', beforeUnLoadHandler, {
			capture: true,
		});

		return () => {
			window.removeEventListener('beforeunload', beforeUnLoadHandler, {
				capture: true,
			});
		};
	}, [beforeUnLoadHandler]);

	return {
		cursor: cursor === -1 ? 0 : cursor,
	};
};

export default useMoveCursor;
