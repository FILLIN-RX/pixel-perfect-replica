import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Crown,
  Users,
  UserPlus,
  Calendar,
  BookOpen,
  Building2,
  Trash2,
  Plus,
  Shield,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const emailSchema = z.string().email("Email invalide");
const passwordSchema = z.string().min(6, "Minimum 6 caractères");

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: "chef_departement" | "enseignant" | "delegue";
  departement: string | null;
  niveau: string | null;
  avatar_url: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfileChef() {
  const { profile, createUser, getAllProfiles, deleteUser, isChef } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"enseignant" | "delegue">("enseignant");
  const [newUserDept, setNewUserDept] = useState("Informatique");
  const [newUserNiveau, setNewUserNiveau] = useState("");

  useEffect(() => {
    if (isChef) {
      loadUsers();
    }
  }, [isChef]);

  const loadUsers = async () => {
    const profiles = await getAllProfiles();
    setUsers(profiles);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newUserName.trim()) {
      newErrors.name = "Nom requis";
    }
    
    try {
      emailSchema.parse(newUserEmail);
    } catch {
      newErrors.email = "Email invalide";
    }
    
    try {
      passwordSchema.parse(newUserPassword);
    } catch {
      newErrors.password = "Minimum 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const { error } = await createUser(
      newUserEmail,
      newUserPassword,
      newUserName,
      newUserRole,
      newUserDept,
      newUserNiveau
    );
    setIsSubmitting(false);
    
    if (!error) {
      setIsDialogOpen(false);
      resetForm();
      // Reload users after short delay to allow trigger to complete
      setTimeout(loadUsers, 1000);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const { error } = await deleteUser(userId);
    if (!error) {
      loadUsers();
    }
  };

  const resetForm = () => {
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("enseignant");
    setNewUserDept("Informatique");
    setNewUserNiveau("");
    setErrors({});
  };

  const enseignants = users.filter(u => u.role === "enseignant");
  const delegues = users.filter(u => u.role === "delegue");

  const stats = [
    { label: "Enseignants", value: enseignants.length, icon: GraduationCap, color: "text-primary" },
    { label: "Délégués", value: delegues.length, icon: Shield, color: "text-secondary" },
    { label: "Total Utilisateurs", value: users.length, icon: Users, color: "text-accent" },
    { label: "Salles", value: 12, icon: Building2, color: "text-success" },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Chef de Département - Université de Yaoundé I</title>
        <meta
          name="description"
          content="Interface de gestion du chef de département"
        />
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70">
              <Crown className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {profile?.full_name || "Chef de Département"}
              </h1>
              <p className="text-muted-foreground">
                Département d'Informatique - Faculté des Sciences
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-2 px-4 py-2">
            <Crown className="h-4 w-4" />
            Administrateur
          </Badge>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Management Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="courses" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Cours
              </TabsTrigger>
              <TabsTrigger value="schedule" className="gap-2">
                <Calendar className="h-4 w-4" />
                Emplois du temps
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Gestion des Utilisateurs
                  </CardTitle>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2" onClick={resetForm}>
                        <UserPlus className="h-4 w-4" />
                        Nouvel Utilisateur
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Créer un Utilisateur</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="user-nom">Nom complet</Label>
                            <Input 
                              id="user-nom" 
                              placeholder="Nom et prénom"
                              value={newUserName}
                              onChange={(e) => setNewUserName(e.target.value)}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              type="email"
                              placeholder="email@univ-yaounde1.cm"
                              value={newUserEmail}
                              onChange={(e) => setNewUserEmail(e.target.value)}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="user-role">Rôle</Label>
                            <Select 
                              value={newUserRole}
                              onValueChange={(v) => setNewUserRole(v as "enseignant" | "delegue")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="enseignant">
                                  Enseignant
                                </SelectItem>
                                <SelectItem value="delegue">Délégué</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-dept">Département</Label>
                            <Select 
                              value={newUserDept}
                              onValueChange={setNewUserDept}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Informatique">
                                  Informatique
                                </SelectItem>
                                <SelectItem value="Mathématiques">
                                  Mathématiques
                                </SelectItem>
                                <SelectItem value="Physique">
                                  Physique
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {newUserRole === "delegue" && (
                          <div className="space-y-2">
                            <Label htmlFor="user-niveau">Niveau</Label>
                            <Select 
                              value={newUserNiveau}
                              onValueChange={setNewUserNiveau}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner le niveau" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="L1">Licence 1</SelectItem>
                                <SelectItem value="L2">Licence 2</SelectItem>
                                <SelectItem value="L3">Licence 3</SelectItem>
                                <SelectItem value="M1">Master 1</SelectItem>
                                <SelectItem value="M2">Master 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="user-password">
                            Mot de passe temporaire
                          </Label>
                          <Input
                            id="user-password"
                            type="password"
                            placeholder="••••••••"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                          />
                          {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                          )}
                        </div>
                        <Button 
                          className="w-full gap-2" 
                          onClick={handleCreateUser}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                          Créer l'utilisateur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {users.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun utilisateur pour le moment.</p>
                      <p className="text-sm">Créez votre premier utilisateur avec le bouton ci-dessus.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rôle</TableHead>
                          <TableHead>Département</TableHead>
                          <TableHead>Niveau</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter(u => u.user_id !== profile?.user_id)
                          .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.full_name}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {user.email}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  user.role === "enseignant"
                                    ? "default"
                                    : user.role === "chef_departement"
                                    ? "outline"
                                    : "secondary"
                                }
                              >
                                {user.role === "chef_departement" 
                                  ? "Chef" 
                                  : user.role === "enseignant" 
                                  ? "Enseignant" 
                                  : "Délégué"}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.departement || "-"}</TableCell>
                            <TableCell>{user.niveau || "-"}</TableCell>
                            <TableCell className="text-right">
                              {user.role !== "chef_departement" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir supprimer {user.full_name} ? 
                                        Cette action est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteUser(user.user_id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Gestion des Cours
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nouveau Cours
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Créer et gérer les cours du département, assigner les
                    enseignants...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Gestion des Emplois du Temps
                  </CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nouvelle Séance
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Planifier les séances, gérer les conflits, valider les
                    emplois du temps...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
