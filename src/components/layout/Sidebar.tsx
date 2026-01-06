import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  Building2,
  BarChart3,
  Settings,
  GraduationCap,
  Crown,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", path: "/" },
  { icon: Calendar, label: "Emploi du temps", path: "/schedule" },
  { icon: BookOpen, label: "Séances", path: "/sessions" },
  { icon: Users, label: "Enseignants", path: "/teachers" },
  { icon: Building2, label: "Salles", path: "/rooms" },
  { icon: BarChart3, label: "Rapports", path: "/reports" },
  { icon: Settings, label: "Paramètres", path: "/settings" },
];

const roleLabels = {
  chef_departement: "Chef Département",
  enseignant: "Enseignant",
  delegue: "Délégué",
};

const roleIcons = {
  chef_departement: Crown,
  enseignant: GraduationCap,
  delegue: Users,
};

const roleColors = {
  chef_departement: "bg-primary text-primary-foreground",
  enseignant: "bg-secondary text-secondary-foreground",
  delegue: "bg-accent text-accent-foreground",
};

export function Sidebar() {
  const { profile, signOut, isChef, isEnseignant, isDelegue } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleProfileNavigation = () => {
    if (isChef) {
      navigate("/profile/chef");
    } else if (isEnseignant) {
      navigate("/profile/enseignant");
    } else {
      navigate("/profile/delegue");
    }
  };

  const RoleIcon = profile?.role ? roleIcons[profile.role] : User;
  const roleLabel = profile?.role ? roleLabels[profile.role] : "Utilisateur";
  const roleColor = profile?.role ? roleColors[profile.role] : "bg-muted text-muted-foreground";

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

        {/* User Profile Selector */}
        <div className="border-t border-sidebar-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-6 hover:bg-sidebar-accent"
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${roleColor}`}>
                  <RoleIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {profile?.full_name || "Utilisateur"}
                  </p>
                  <Badge variant="outline" className="mt-1 text-[10px]">
                    {roleLabel}
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4 text-sidebar-foreground/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileNavigation} className="gap-2">
                <RoleIcon className="h-4 w-4" />
                Mon Espace {roleLabel}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.aside>
  );
}
