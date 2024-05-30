import { useLayoutEffect, useRef } from 'react';
import { PaginationProps } from '../Pagination';

const useMoveCursor = ({ currentPosition, positions }: PaginationProps) => {
	const cursor = positions.findIndex((id) => id === currentPosition);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	// 초반에 가운데로 이동하도록 설정
	useLayoutEffect(() => {
		selectedRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}, []);

	return {
		cursor: cursor === -1 ? 0 : cursor,
	};
};

export default useMoveCursor;
