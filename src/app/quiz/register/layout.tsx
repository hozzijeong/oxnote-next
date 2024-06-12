'use client';

import { Header } from '@/components';
import { Fragment } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.BackButton backUrl={-1} />
				<Header.Title title='퀴즈 등록하기' />
			</Header>
			{children}
		</Fragment>
	);
};

export default Layout;
