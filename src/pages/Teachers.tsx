import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Search, Plus, Mail, Phone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Helmet } from "react-helmet-async";

interface Teacher {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  courses: string[];
  hoursThisWeek: number;
  totalHours: number;
  status: "active" | "absent" | "vacation";
}

const teachers: Teacher[] = [
  {
    id: "1",
    name: "Prof. Jean Nzeukou",
    title: "Professeur Titulaire",
    email: "nzeukou@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Génie Logiciel", "Architecture Logicielle"],
    hoursThisWeek: 12,
    totalHours: 156,
    status: "active",
  },
  {
    id: "2",
    name: "Dr. Marie Fouda",
    title: "Maître de Conférences",
    email: "fouda@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Base de Données", "Big Data"],
    hoursThisWeek: 10,
    totalHours: 142,
    status: "active",
  },
  {
    id: "3",
    name: "Prof. Paul Bella",
    title: "Professeur",
    email: "bella@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Analyse Numérique", "Mathématiques"],
    hoursThisWeek: 8,
    totalHours: 98,
    status: "active",
  },
  {
    id: "4",
    name: "M. Pierre Essomba",
    title: "Assistant",
    email: "essomba@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Réseaux Informatiques"],
    hoursThisWeek: 15,
    totalHours: 180,
    status: "active",
  },
  {
    id: "5",
    name: "Dr. Samuel Mbarga",
    title: "Maître de Conférences",
    email: "mbarga@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Intelligence Artificielle", "Machine Learning"],
    hoursThisWeek: 0,
    totalHours: 120,
    status: "absent",
  },
  {
    id: "6",
    name: "Dr. Anne Kamga",
    title: "Chargé de Cours",
    email: "kamga@univ-yaounde1.cm",
    phone: "+237 6XX XXX XXX",
    courses: ["Algorithmique", "Programmation C"],
    hoursThisWeek: 14,
    totalHours: 165,
    status: "active",
  },
];

const statusConfig = {
  active: { label: "Actif", color: "bg-success/10 text-success" },
  absent: { label: "Absent", color: "bg-destructive/10 text-destructive" },
  vacation: { label: "En congé", color: "bg-warning/10 text-warning" },
};

const Teachers = () => {
  return (
    <>
      <Helmet>
        <title>Enseignants | Gestion Académique - Univ. Yaoundé I</title>
        <meta
          name="description"
          content="Gérez les enseignants et leurs horaires au département d'Informatique"
        />
      </Helmet>

      <MainLayout>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Enseignants</h1>
            <p className="mt-1 text-muted-foreground">
              Gestion du personnel enseignant du département
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un enseignant
          </Button>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher un enseignant..." className="pl-10" />
          </div>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 card-elevated card-hover"
            >
              {/* Status indicator */}
              <div className="absolute right-4 top-4">
                <Badge className={statusConfig[teacher.status].color}>
                  {statusConfig[teacher.status].label}
                </Badge>
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {teacher.title}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {/* Courses */}
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Cours enseignés:</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {teacher.courses.map((course) => (
                    <Badge key={course} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hours Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Cette semaine</p>
                  <p className="text-lg font-bold text-foreground">
                    {teacher.hoursThisWeek}h
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total heures</p>
                  <p className="text-lg font-bold text-foreground">
                    {teacher.totalHours}h
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Teachers;
