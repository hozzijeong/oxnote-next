/**
 * 동적 경로를 생성하기 위한 함수
 * @param path - 경로 템플릿 (예: "/quiz/:id")
 * @param params - 경로 매개변수 객체 (예: { id: '123' })
 * @returns 실제 URL 경로 (예: "/quiz/123")
 */
export function generatePath(
	path: string,
	params: Record<string, string | number>
) {
	return Object.keys(params).reduce(
		(acc, key) => acc.replace(`:${key}`, String(params[key])),
		path
	);
}
