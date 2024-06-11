'use client';

import { CustomError } from '@/lib/error';

export default function GlobalError({
	error,
	reset,
}: {
	error: CustomError;
	reset: () => void;
}) {
	return (
		<html>
			<body>
				<h2>{error.message}</h2>
				<button onClick={() => reset()}>다시 시도하기</button>
			</body>
		</html>
	);
}
