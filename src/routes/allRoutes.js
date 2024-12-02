export const PATH = {
  HOME: "/",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  MOVIE_DETAILS: "/movie-details",
  ADMIN: "/admin",
  USER_MANAGEMENT: "/admin/user-management",
  MOVIE_MANAGEMENT: "/admin/movie-management",
  PURCHASE: "/purchase",
};

import LoginPage from "../modules/auth/Login/LoginPage";
import RegisterPage from "../modules/auth/Register/RegisterPage";
import HomePage from "../modules/home/HomePage/HomePage";
import DashboardPage from "../modules/admin/Dashboard/DashboardPage";
import MovieDetailsPage from "../modules/home/MovieDetails/MovieDetails";
import PurchasePage from "../modules/home/Purchase/PurchasePage";
import ProfilePage from "../modules/home/Profile";

const authProtectedRoutes = [{ path: "/admin/", component: DashboardPage }];

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/movie-details/:id", component: MovieDetailsPage },
  { path: "/purchase/:id", component: PurchasePage },
  { path: "/profile", component: ProfilePage },

  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

export { authProtectedRoutes, publicRoutes };
