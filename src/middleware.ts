import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const cookies = request.cookies;
	const userId = cookies.get('user-id');

	if (userId) {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(new URL('/auth', request.url));
	}
}

export const config = {
	matcher: ['/quiz/:path*', '/category/:path*', '/my-page'],
};
