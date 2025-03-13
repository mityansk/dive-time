import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';
import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '../layout/Layout';
import TourPage from '@/pages/TourPage/TourPage';
import MainPage from '@/pages/MainPage/MainPage';
import { LocationPage } from '@/pages/LocationPage/LocationPage';
import { LocationInfoPage } from '@/pages/LocationInfoPage/LocationInfoPage';
import { EquipmentPage } from "@/pages/EquipmentPage/EquipmentPage"

export default function Router(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CLIENT_ROUTES.MAIN} element={<Layout />}>
          <Route path={CLIENT_ROUTES.MAIN} element={<MainPage />} />
          <Route path={CLIENT_ROUTES.TOUR} element={<TourPage />} />
          <Route path={CLIENT_ROUTES.LOCATIONS} element={<LocationPage />} />
          {/* <Route path={CLIENT_ROUTES.EQUIPMENT} element={<EquipmentPage />} /> */}
          <Route
            path={CLIENT_ROUTES.LOCATIONS_INFO}
            element={<LocationInfoPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
