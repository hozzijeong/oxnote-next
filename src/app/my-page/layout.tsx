'use client';

import { Header } from '@/components';
import { Fragment } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Fragment>
			<Header>
				<Header.Title title='마이페이지' />
			</Header>
			{children}
		</Fragment>
	);
};

export default Layout;
