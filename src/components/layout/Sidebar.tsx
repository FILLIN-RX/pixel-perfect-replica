import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/" },
  { icon: Calendar, label: "Emploi du temps", path: "/schedule" },
  { icon: BookOpen, label: "Séances", path: "/sessions" },
  { icon: Users, label: "Enseignants", path: "/teachers" },
  { icon: Building2, label: "Salles", path: "/rooms" },
  { icon: BarChart3, label: "Rapports", path: "/reports" },
  { icon: Settings, label: "Paramètres", path: "/settings" },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar"
      style={{ background: "var(--gradient-sidebar)" }}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-sidebar-foreground">
              Univ. Yaoundé I
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Gestion Académique
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "" : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
              <span className="text-sm font-semibold">CD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">
                Chef Département
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Informatique
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
