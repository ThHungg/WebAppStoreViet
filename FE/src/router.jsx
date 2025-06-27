import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./page/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./page/user/theme/masterLayout";
import DashBoard from "./page/admin/dashBoard";
import GamePage from "./page/user/gamePage";
import MasterLayoutAd from "./page/admin/theme/masterLayoutAd";

const renderUserRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.USER.GAMES,
      component: <GamePage />,
    },
  ];
  return (
    <MasterLayout>
      <Routes>
        {userRouter.map((item, key) => {
          return (
            <Route key={key} path={item.path} element={item.component}></Route>
          );
        })}
      </Routes>
    </MasterLayout>
  );
};

const renderAdminRouter = () => {
  const adminRouter = [
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: <DashBoard />,
    },
  ];
  return (
    <MasterLayoutAd>
      <Routes>
        {adminRouter.map((item, key) => {
          return (
            <>
              <Route
                key={key}
                path={item.path}
                element={item.component}
              ></Route>
            </>
          );
        })}
      </Routes>
    </MasterLayoutAd>
  );
};

const RouterCustom = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? renderAdminRouter() : renderUserRouter();
};

export default RouterCustom;
