import { Route, Routes } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import Layout from "../layouts/Layout";
import NonAuthLayout from "../layouts/NonAuthLayout";
import AuthProtected from "./AuthProtected";

const RouteIndex = () => {
  return (
    <>
      <Routes>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AuthProtected>
                <Layout>
                  <route.component />
                </Layout>
              </AuthProtected>
            }
          />
        ))}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default RouteIndex;
