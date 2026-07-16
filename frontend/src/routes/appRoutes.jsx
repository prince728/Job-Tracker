import React from "react";
import { createBrowserRouter } from "react-router";

import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ResumeScore from "../pages/ResumeScore";
import InterviewPrep from "../pages/InterviewPrep";
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
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    {
        path: "/match-score",
        element: <ProtectedRoute><ResumeScore /></ProtectedRoute>,
    },
    {
        path: "/interview-prep",
        element: <ProtectedRoute><InterviewPrep /></ProtectedRoute>,
    }


]);

export default router;