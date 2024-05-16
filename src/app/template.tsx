'use client';

import { useEffect, useState } from 'react';
import styles from './root.module.scss';
import { onAuthStateChanged } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { URL_PATH } from '@/constants/path';
import { SWRConfig } from 'swr';
import { Spinner } from '@/components';

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

	if (loading) {
		return <div>스피너...</div>;
	}

	return (
		<SWRConfig
			value={{
				fallback: <Spinner />,
			}}
		>
			<div className={styles.container}>{children}</div>;
		</SWRConfig>
	);
};

export default RootTemplate;
