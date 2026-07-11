import React from "react";
import { createBrowserRouter } from "react-router";

import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import HomePage from "../pages/Home";
import ProtectedRoute from "../component/ProtectedRoute";



const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/",
        element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    }

]);

export default router;