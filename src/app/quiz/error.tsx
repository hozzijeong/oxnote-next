'use client';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return <div>{error.message}</div>;
};

export default Error;
