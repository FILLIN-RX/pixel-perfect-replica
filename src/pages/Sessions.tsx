import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Search, Filter, Plus, MoreVertical, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet-async";

interface Session {
  id: string;
  course: string;
  type: "CM" | "TD" | "TP";
  teacher: string;
  room: string;
  date: string;
  time: string;
  status: "completed" | "scheduled" | "cancelled";
  level: string;
}

const sessions: Session[] = [
  {
    id: "1",
    course: "Génie Logiciel",
    type: "CM",
    teacher: "Prof. Nzeukou",
    room: "Amphi 500",
    date: "27/12/2024",
    time: "08:00 - 10:00",
    status: "completed",
    level: "Niveau 2 ICT",
  },
  {
    id: "2",
    course: "Base de Données",
    type: "TD",
    teacher: "Dr. Fouda",
    room: "Salle TD 12",
    date: "27/12/2024",
    time: "10:00 - 12:00",
    status: "scheduled",
    level: "Niveau 2 ICT",
  },
  {
    id: "3",
    course: "Réseaux Informatiques",
    type: "TP",
    teacher: "M. Essomba",
    room: "Labo Info 3",
    date: "27/12/2024",
    time: "14:00 - 17:00",
    status: "scheduled",
    level: "Niveau 3 ICT",
  },
  {
    id: "4",
    course: "Analyse Numérique",
    type: "CM",
    teacher: "Prof. Bella",
    room: "Amphi 300",
    date: "26/12/2024",
    time: "08:00 - 10:00",
    status: "completed",
    level: "Niveau 1 ICT",
  },
  {
    id: "5",
    course: "Programmation C",
    type: "TD",
    teacher: "Dr. Kamga",
    room: "Salle TD 5",
    date: "26/12/2024",
    time: "14:00 - 16:00",
    status: "cancelled",
    level: "Niveau 1 ICT",
  },
];

const typeColors = {
  CM: "bg-primary text-primary-foreground",
  TD: "bg-accent text-accent-foreground",
  TP: "bg-success text-success-foreground",
};

const statusConfig = {
  completed: {
    label: "Effectuée",
    color: "bg-success/10 text-success border-success/20",
    icon: Check,
  },
  scheduled: {
    label: "Planifiée",
    color: "bg-primary/10 text-primary border-primary/20",
    icon: null,
  },
  cancelled: {
    label: "Annulée",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    icon: X,
  },
};

const Sessions = () => {
  return (
    <>
      <Helmet>
        <title>Gestion des Séances | Gestion Académique - Univ. Yaoundé I</title>
        <meta
          name="description"
          content="Gérez les séances de cours, TD et TP du département d'Informatique"
        />
      </Helmet>

      <MainLayout>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Gestion des séances
            </h1>
            <p className="mt-1 text-muted-foreground">
              Planifiez et suivez l'ensemble des cours, TD et TP
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle séance
          </Button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex flex-wrap gap-4"
        >
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un cours, enseignant..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 grid gap-4 sm:grid-cols-4"
        >
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total séances</p>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Effectuées</p>
            <p className="text-2xl font-bold text-success">128</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Planifiées</p>
            <p className="text-2xl font-bold text-primary">24</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Annulées</p>
            <p className="text-2xl font-bold text-destructive">4</p>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl border bg-card card-elevated overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Cours</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Enseignant</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session, index) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="group hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    {session.course}
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[session.type]}>
                      {session.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.teacher}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.level}
                  </TableCell>
                  <TableCell>{session.room}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{session.date}</p>
                      <p className="text-muted-foreground">{session.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const StatusIcon = statusConfig[session.status].icon;
                      return (
                        <Badge
                          variant="outline"
                          className={statusConfig[session.status].color}
                        >
                          {StatusIcon && <StatusIcon className="mr-1 h-3 w-3" />}
                          {statusConfig[session.status].label}
                        </Badge>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default Sessions;
