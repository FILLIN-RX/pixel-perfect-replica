import { MainLayout } from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Save,
} from "lucide-react";

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

export default function Settings() {
  return (
    <MainLayout>
      <Helmet>
        <title>Paramètres - Université de Yaoundé I</title>
        <meta name="description" content="Configuration du système" />
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground">
            Configuration du système de gestion académique
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Apparence</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Informations du Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        placeholder="Votre nom"
                        defaultValue="Dr. Kamga"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        placeholder="Votre prénom"
                        defaultValue="Jean-Pierre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@univ-yaounde1.cm"
                        defaultValue="kamga.jp@univ-yaounde1.cm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rôle</Label>
                      <Select defaultValue="chef">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chef">
                            Chef de Département
                          </SelectItem>
                          <SelectItem value="enseignant">Enseignant</SelectItem>
                          <SelectItem value="delegue">Délégué</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departement">Département</Label>
                      <Select defaultValue="info">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Informatique</SelectItem>
                          <SelectItem value="maths">Mathématiques</SelectItem>
                          <SelectItem value="physique">Physique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        placeholder="+237 6XX XXX XXX"
                        defaultValue="+237 699 123 456"
                      />
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Préférences de Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Notifications par email
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir des emails pour les nouvelles séances
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Alertes de conflit
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Être notifié des conflits d'emploi du temps
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Rappels de cours
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Rappel 30 minutes avant chaque séance
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Rapports hebdomadaires
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un résumé chaque semaine
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Sécurité du Compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">
                        Mot de passe actuel
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">
                        Nouveau mot de passe
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirmer le mot de passe
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">
                        Authentification à deux facteurs
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ajouter une couche de sécurité supplémentaire
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Mettre à jour
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Apparence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Thème</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un thème" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="system">Système</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Langue</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Animations
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Activer les animations de l'interface
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Enregistrer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
