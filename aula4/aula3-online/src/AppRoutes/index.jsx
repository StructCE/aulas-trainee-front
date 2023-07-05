import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { LayoutWithNavbarAndFooter } from "../pages/LayoutWithNavbarAndFooter";
import { useState } from "react";
import { AdminIndexCategoriesPage } from "../pages/admin/categories";
import { AdminCreateCategoryPage } from "../pages/admin/categories/create";
import { AdminEditCategoryPage } from "../pages/admin/categories/edit";

const adminRoutes = [
  {
    path: "categories",
    element: <AdminIndexCategoriesPage />,
  },
  {
    path: "categories/create",
    element: <AdminCreateCategoryPage />,
  },
  {
    path: "categories/edit/:id",
    element: <AdminEditCategoryPage />,
  },
];

function AppRoutes() {
  const [user, setUser] = useState(null);
  const handleLogin = () => {
    setUser({
      username: "artistrea",
      isAdmin: true,
      avatarUrl:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutWithNavbarAndFooter
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      ),
      errorElement: (
        <div>
          404 Not Found <Link to="/">Go to HomePage</Link>
        </div>
      ),
      children: [
        {
          path: "/",
          element: (
            <div>
              <h1>Hello World</h1>
            </div>
          ),
        },
        {
          path: "about",
          element: <div>About</div>,
        },
        user?.isAdmin
          ? {
              path: "admin",
              children: adminRoutes,
            }
          : {},
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoutes;
