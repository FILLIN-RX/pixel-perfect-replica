import { MainLayout } from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Calendar,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const coursEnseignant = [
  {
    id: 1,
    nom: "Algorithmes et Structures de Données",
    code: "INF301",
    niveau: "L3",
    heuresCM: 24,
    heuresTD: 12,
    heuresTP: 18,
    progression: 65,
  },
  {
    id: 2,
    nom: "Base de Données Avancées",
    code: "INF405",
    niveau: "M1",
    heuresCM: 20,
    heuresTD: 10,
    heuresTP: 15,
    progression: 45,
  },
  {
    id: 3,
    nom: "Programmation Web",
    code: "INF302",
    niveau: "L3",
    heuresCM: 18,
    heuresTD: 8,
    heuresTP: 24,
    progression: 80,
  },
];

const prochaineCours = [
  {
    id: 1,
    cours: "Algorithmes et Structures de Données",
    type: "CM",
    heure: "08:00 - 10:00",
    salle: "Amphi A",
    jour: "Lundi",
  },
  {
    id: 2,
    cours: "Base de Données Avancées",
    type: "TD",
    heure: "10:30 - 12:30",
    salle: "Salle 101",
    jour: "Lundi",
  },
  {
    id: 3,
    cours: "Programmation Web",
    type: "TP",
    heure: "14:00 - 17:00",
    salle: "Labo Info 1",
    jour: "Mardi",
  },
];

const statsEnseignant = [
  { label: "Cours Assignés", value: 3, icon: BookOpen, color: "text-primary" },
  { label: "Heures/Semaine", value: 18, icon: Clock, color: "text-secondary" },
  { label: "Étudiants", value: 180, icon: Users, color: "text-accent" },
  { label: "Séances Faites", value: 42, icon: CheckCircle2, color: "text-success" },
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

export default function ProfileEnseignant() {
  return (
    <MainLayout>
      <Helmet>
        <title>Espace Enseignant - Université de Yaoundé I</title>
        <meta name="description" content="Interface enseignant" />
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
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary/70">
              <GraduationCap className="h-8 w-8 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Dr. Nkoulou Paul
              </h1>
              <p className="text-muted-foreground">
                Maître de Conférences - Département d'Informatique
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <GraduationCap className="h-4 w-4" />
            Enseignant
          </Badge>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          {statsEnseignant.map((stat) => (
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mes Cours */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Mes Cours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {coursEnseignant.map((cours) => (
                  <div
                    key={cours.id}
                    className="rounded-lg border border-border/50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {cours.nom}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {cours.code} • {cours.niveau}
                        </p>
                      </div>
                      <Badge variant="outline">{cours.niveau}</Badge>
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                      <span>CM: {cours.heuresCM}h</span>
                      <span>TD: {cours.heuresTD}h</span>
                      <span>TP: {cours.heuresTP}h</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Progression
                        </span>
                        <span className="font-medium text-primary">
                          {cours.progression}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cours.progression}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Prochaines Séances */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Prochaines Séances
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prochaineCours.map((seance) => (
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
                          {seance.jour} • {seance.heure}
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
                <Button variant="outline" className="w-full">
                  Voir tout l'emploi du temps
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <span>Marquer Présence</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <AlertCircle className="h-6 w-6 text-warning" />
                  <span>Signaler Absence</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>Demander Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
