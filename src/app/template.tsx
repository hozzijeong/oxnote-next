'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { SWRConfig } from 'swr';
import { Spinner } from '@/components';
import { OverlayProvider } from '@toss/use-overlay';

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [_, setUser] = useState<User | null>(null);

	useEffect(() => {
		onAuthStateChanged((user) => {
			setUser(user);

			setLoading(false);

			if (user === null) {
				router.replace(URL_PATH.AUTH);
			}
		});
	}, [router]);

	return (
		<SWRConfig
			value={{
				fallback: <Spinner />,
			}}
		>
			<OverlayProvider>{loading ? <Spinner /> : children}</OverlayProvider>
		</SWRConfig>
	);
};

export default RootTemplate;
