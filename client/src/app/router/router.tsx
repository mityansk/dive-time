import { SignInPage } from '@/pages/SignInPage/SignInPage';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '../layout/Layout';
import { SignUpPage } from '@/pages/SignUpPage/SignUpPage';
import TourPage from '../../pages/TourPage/TourPage';
import { LocationPage } from '@/pages/LocationPage/LocationPage';

export default function Router(): ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
					<Route path={CLIENT_ROUTES.SIGN_IN} element={<SignInPage />} />
					<Route path={CLIENT_ROUTES.SIGN_UP} element={<SignUpPage />} />
					<Route path={CLIENT_ROUTES.TOUR} element={<TourPage />} />
					<Route path={CLIENT_ROUTES.LOCATIONS} element={<LocationPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
