import LayoutDefault from "../components/Layout/LayoutDefault"
import Search from "../pages/Search"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Logout from "../pages/Logout"
import Register from "../pages/Register"
import Company from "../components/Company"
import CompanyDetail from "../pages/CompanyDetail"
import JobDetail from "../pages/JobDetail"
import LayoutAdmin from "../components/Layout/LayoutAdmin"
import DashBoard from "../pages/DashBoard"
import PrivateRoute from "../components/PrivateRoute"
import InCompany from "../pages/InfoCompany"
import JobManage from "../pages/JobManage"
import CvManage from "../pages/CvManage"
import ViewJob from "../components/CRUDJob/ViewJob"
import CreateJob from "../components/CRUDJob/CreateJob"
import ViewCv from "../components/VDCv/ViewCv"

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "company",
                element: <Company />
            },
            {
                path: "company/:id",
                element: <CompanyDetail />
            },
            {
                path: "job/:id",
                element: <JobDetail />
            },
            {
                path: "*",
                element: <Home />
            },
        ]
    }
    ,
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        index: true,
                        path: "/dashboard",
                        element: <DashBoard />
                    },
                    {
                        path: "/infocompany",
                        element: <InCompany />
                    },
                    {
                        path: "/cvmanage",
                        element: <CvManage />
                    },
                    {
                        path: "/jobmanage",
                        element: <JobManage />
                    },
                    {
                        path: "/viewjob/:id",
                        element: <ViewJob />
                    },
                    {
                        path: "/viewcv/:id",
                        element: <ViewCv />
                    },
                    {
                        path: "/create-job",
                        element: <CreateJob />
                    },
                ]
            }
        ]
    }
]