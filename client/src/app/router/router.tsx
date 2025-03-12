import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { CLIENT_ROUTES } from "../../shared/enums/clientRoutes";
import TourPage from "../../pages/TourPage/TourPage";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
    <Routes>
    <Route>
      <Route path={CLIENT_ROUTES.TOUR} element={<TourPage />}/>
    </Route>
    </Routes>
    </BrowserRouter>
  )
}