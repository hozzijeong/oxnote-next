'use client';

import { URL_PATH } from '@/constants/path';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push(URL_PATH.QUIZ_FORM);
	}, [router]);

	return <div>redirecting</div>;
}
