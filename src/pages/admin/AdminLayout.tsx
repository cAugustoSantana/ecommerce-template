import { Navigate, Outlet, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLogin } from "./AdminLogin";
import layoutStyles from "./AdminLayout.module.css";
import styles from "./admin.module.css";

export function AdminLayout() {
  const { t } = useTranslation();
  const { token, login, logout, isAuthenticated } = useAdminAuth();

  if (!isAuthenticated || !token) {
    return <AdminLogin onLogin={(p) => login(p).then(() => undefined)} />;
  }

  return (
    <div className={layoutStyles.shell}>
      <aside className={layoutStyles.sidebar}>
        <h1 className={layoutStyles.sidebarTitle}>{t("admin.title")}</h1>
        <nav className={layoutStyles.nav}>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${layoutStyles.navLink}${isActive ? ` ${layoutStyles.navLinkActive}` : ""}`
            }
          >
            {t("admin.nav.orders")}
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${layoutStyles.navLink}${isActive ? ` ${layoutStyles.navLinkActive}` : ""}`
            }
          >
            {t("admin.nav.products")}
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `${layoutStyles.navLink}${isActive ? ` ${layoutStyles.navLinkActive}` : ""}`
            }
          >
            {t("admin.nav.settings")}
          </NavLink>
        </nav>
        <div className={layoutStyles.sidebarFooter}>
          <button type="button" className={styles.logoutBtn} onClick={logout}>
            {t("admin.logout")}
          </button>
        </div>
      </aside>
      <div className={layoutStyles.content}>
        <Outlet context={{ token }} />
      </div>
    </div>
  );
}

export function AdminIndexRedirect() {
  return <Navigate to="orders" replace />;
}
