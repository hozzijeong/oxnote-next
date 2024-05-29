import { useSearchParams } from 'next/navigation';

const useSEarchQueryParams = () => {
	const searchParams = useSearchParams();

	const getQueryParam = (param: string) => {
		const value = searchParams.get(param);
		if (value === null) {
			throw new Error('잘못된 경로입니다');
		}

		return value;
	};

	const getCurrentParams = () => searchParams.toString();

	const getWholeURLParams = (): { [key: string]: string } =>
		[...searchParams.entries()].reduce(
			(acc, [key, value]) => ({ ...acc, [key]: value }),
			{}
		);

	// 특정 값을 제외하고 나머지 값들을 반환하는 메서드. queryKey를 등록할 때 사용함
	const getURLParamValuesExceptParam = (param: string[] | string) => {
		return [...searchParams.entries()]
			.filter(([key]) => !param.includes(key))
			.map(([_, value]) => value);
	};

	return {
		getQueryParam,
		getCurrentParams,
		getURLParamValuesExceptParam,
		getWholeURLParams,
	};
};

export default useSEarchQueryParams;
