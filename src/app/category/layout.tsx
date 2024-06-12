'use client';

import { Header } from '@/components';
import { Fragment } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='카테고리' />
			</Header>
			{children}
		</Fragment>
	);
};

export default Layout;
