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
  Edit,
  Trash2,
  Plus,
  Shield,
} from "lucide-react";

const utilisateurs = [
  {
    id: 1,
    nom: "Dr. Nkoulou Paul",
    email: "nkoulou.p@univ-yaounde1.cm",
    role: "Enseignant",
    departement: "Informatique",
    status: "Actif",
  },
  {
    id: 2,
    nom: "Prof. Mbarga Jean",
    email: "mbarga.j@univ-yaounde1.cm",
    role: "Enseignant",
    departement: "Informatique",
    status: "Actif",
  },
  {
    id: 3,
    nom: "Atangana Marie",
    email: "atangana.m@univ-yaounde1.cm",
    role: "Délégué",
    departement: "Informatique L3",
    status: "Actif",
  },
  {
    id: 4,
    nom: "Fouda Pierre",
    email: "fouda.p@univ-yaounde1.cm",
    role: "Délégué",
    departement: "Informatique M1",
    status: "Actif",
  },
];

const statsChef = [
  { label: "Enseignants", value: 24, icon: Users, color: "text-primary" },
  { label: "Délégués", value: 8, icon: Shield, color: "text-secondary" },
  { label: "Cours", value: 45, icon: BookOpen, color: "text-accent" },
  { label: "Salles", value: 12, icon: Building2, color: "text-success" },
];

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
                Chef de Département
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
          {statsChef.map((stat) => (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
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
                            <Input id="user-nom" placeholder="Nom et prénom" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              type="email"
                              placeholder="email@univ-yaounde1.cm"
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="user-role">Rôle</Label>
                            <Select>
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
                            <Label htmlFor="user-dept">Département/Niveau</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="info">
                                  Informatique
                                </SelectItem>
                                <SelectItem value="info-l3">
                                  Informatique L3
                                </SelectItem>
                                <SelectItem value="info-m1">
                                  Informatique M1
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="user-password">
                            Mot de passe temporaire
                          </Label>
                          <Input
                            id="user-password"
                            type="password"
                            placeholder="••••••••"
                          />
                        </div>
                        <Button className="w-full gap-2">
                          <Plus className="h-4 w-4" />
                          Créer l'utilisateur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Département</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utilisateurs.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.nom}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Enseignant"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.departement}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-success/50 text-success"
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
