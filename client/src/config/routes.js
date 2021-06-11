// LAYOUTS
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// ADMIN PAGES
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminRegister from "../pages/Admin/Register";
import AdminProducts from "../pages/Admin/Products";
import AdminCategories from "../pages/Admin/Category";
import AdminActions from "../pages/Admin/Action";
import AdminUsers from "../pages/Admin/User";

// BASIC PAGES
import Home from "../pages/Home";

// OTHER
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/registros",
                component: AdminRegister,
                exact: true
            },
            {
                path: "/admin/usuarios",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/productos",
                component: AdminProducts,
                exact: true
            },
            {
                path: "/admin/categorias",
                component: AdminCategories,
                exact: true
            },
            {
                path: "/admin/acciones",
                component: AdminActions,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes;