import { MainLayout } from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Bell,
  MessageSquare,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const emploiDuTemps = [
  {
    id: 1,
    cours: "Algorithmes et Structures de Données",
    enseignant: "Dr. Nkoulou Paul",
    type: "CM",
    heure: "08:00 - 10:00",
    salle: "Amphi A",
    jour: "Lundi",
  },
  {
    id: 2,
    cours: "Base de Données",
    enseignant: "Prof. Mbarga Jean",
    type: "TD",
    heure: "10:30 - 12:30",
    salle: "Salle 101",
    jour: "Lundi",
  },
  {
    id: 3,
    cours: "Programmation Web",
    enseignant: "Dr. Essomba Marie",
    type: "TP",
    heure: "14:00 - 17:00",
    salle: "Labo Info 1",
    jour: "Mardi",
  },
  {
    id: 4,
    cours: "Réseaux Informatiques",
    enseignant: "Dr. Ateba Pierre",
    type: "CM",
    heure: "08:00 - 10:00",
    salle: "Amphi B",
    jour: "Mercredi",
  },
];

const notifications = [
  {
    id: 1,
    type: "info",
    message: "Nouvelle séance de TP ajoutée pour Programmation Web",
    date: "Il y a 2h",
  },
  {
    id: 2,
    type: "warning",
    message: "Séance d'Algorithmes reportée au 15 janvier",
    date: "Il y a 5h",
  },
  {
    id: 3,
    type: "success",
    message: "Salle confirmée pour le TD de Base de Données",
    date: "Hier",
  },
];

const statsDelegue = [
  { label: "Cours/Semaine", value: 12, icon: BookOpen, color: "text-primary" },
  { label: "Heures/Semaine", value: 28, icon: Clock, color: "text-secondary" },
  { label: "Étudiants Classe", value: 45, icon: Users, color: "text-accent" },
  { label: "Notifications", value: 3, icon: Bell, color: "text-warning" },
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

export default function ProfileDelegue() {
  return (
    <MainLayout>
      <Helmet>
        <title>Espace Délégué - Université de Yaoundé I</title>
        <meta name="description" content="Interface délégué étudiant" />
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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/70">
              <Users className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Atangana Marie
              </h1>
              <p className="text-muted-foreground">
                Déléguée - Licence 3 Informatique
              </p>
            </div>
          </div>
          <Badge className="gap-2 bg-accent px-4 py-2 text-accent-foreground">
            <Users className="h-4 w-4" />
            Délégué(e)
          </Badge>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          {statsDelegue.map((stat) => (
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Emploi du temps */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Emploi du Temps de la Classe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emploiDuTemps.map((seance) => (
                  <div
                    key={seance.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {seance.cours}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {seance.enseignant} • {seance.jour} • {seance.heure}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          seance.type === "CM"
                            ? "default"
                            : seance.type === "TD"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {seance.type}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {seance.salle}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex gap-3 rounded-lg border border-border/50 p-3"
                  >
                    {notif.type === "info" && (
                      <Bell className="h-5 w-5 shrink-0 text-primary" />
                    )}
                    {notif.type === "warning" && (
                      <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
                    )}
                    {notif.type === "success" && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    )}
                    <div>
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {notif.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Signaler un problème */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Signaler au Chef de Département
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Décrivez le problème ou la demande (ex: conflit d'emploi du temps, demande de changement de salle, absence d'enseignant...)"
                className="min-h-[100px]"
              />
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Envoyer le Message
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Joindre un Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions rapides */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>Télécharger EDT</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  <span>Signaler Conflit</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <Users className="h-6 w-6 text-accent" />
                  <span>Contacter Classe</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
