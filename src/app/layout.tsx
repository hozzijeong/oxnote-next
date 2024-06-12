import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import styles from './root.module.scss';
import Navbar from '@/components/navbar';

// NOTE: import {}를 통해서 컴포넌트를 받지 말자

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '오답노트',
	description: 'OX 퀴즈를 위한 오답노트입니다',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body className={inter.className}>
				<div className={styles.container}>
					{children}
					<Navbar />
				</div>
			</body>
		</html>
	);
}
