import { Route, Routes } from "react-router-dom";
import HomePage from "./page/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./page/user/theme/masterLayout";

const renderRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />,
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

const RouterCustom = () => {
  return renderRouter();
};

export default RouterCustom;
