import Link from 'next/link';
import useMoveCursor from './hooks/useMoveCursor';
import styles from './pagination.module.scss';
import { useMemo } from 'react';

export type PaginationProps = {
	currentPosition: string;
	positions: string[];
	path?: string;
	replace?: boolean;
};

const Pagination = ({
	currentPosition,
	positions,
	path,
	replace = true,
}: PaginationProps) => {
	const { cursor } = useMoveCursor({
		currentPosition,
		positions,
	});

	const quizNavbar = useMemo(
		() =>
			positions.map((position, index) => {
				const className = cursor === index ? 'select-link' : 'controller-link';

				return (
					<Link
						key={position}
						data-path={position}
						className={styles[className]}
						href={path ? `${path}/${position}` : position}
						replace={replace}
					>
						{index + 1}
					</Link>
				);
			}),
		[cursor, path, positions, replace]
	);

	return (
		<div className={styles['controller-wrapper']}>
			<div className={styles['controller-container']}>{quizNavbar}</div>
		</div>
	);
};

export default Pagination;
