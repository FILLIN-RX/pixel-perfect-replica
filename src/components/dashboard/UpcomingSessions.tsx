import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Session {
  id: string;
  course: string;
  type: "CM" | "TD" | "TP";
  teacher: string;
  room: string;
  time: string;
  status: "upcoming" | "ongoing" | "completed";
}

const sessions: Session[] = [
  {
    id: "1",
    course: "Génie Logiciel",
    type: "CM",
    teacher: "Prof. Nzeukou",
    room: "Amphi 500",
    time: "08:00 - 10:00",
    status: "ongoing",
  },
  {
    id: "2",
    course: "Base de Données",
    type: "TD",
    teacher: "Dr. Fouda",
    room: "Salle TD 12",
    time: "10:00 - 12:00",
    status: "upcoming",
  },
  {
    id: "3",
    course: "Réseaux Informatiques",
    type: "TP",
    teacher: "M. Essomba",
    room: "Labo Info 3",
    time: "14:00 - 17:00",
    status: "upcoming",
  },
  {
    id: "4",
    course: "Analyse Numérique",
    type: "CM",
    teacher: "Prof. Bella",
    room: "Amphi 300",
    time: "08:00 - 10:00",
    status: "completed",
  },
];

const typeColors = {
  CM: "bg-primary text-primary-foreground",
  TD: "bg-accent text-accent-foreground",
  TP: "bg-success text-success-foreground",
};

const statusColors = {
  upcoming: "border-muted-foreground/20",
  ongoing: "border-primary border-l-4",
  completed: "opacity-60 border-muted-foreground/10",
};

export function UpcomingSessions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl bg-card p-6 card-elevated"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">
          Séances du jour
        </h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </div>

      <div className="space-y-3">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className={`flex items-center gap-4 rounded-lg border bg-background/50 p-4 transition-all hover:bg-background ${statusColors[session.status]}`}
          >
            <Badge className={typeColors[session.type]}>{session.type}</Badge>

            <div className="flex-1">
              <p className="font-medium text-card-foreground">
                {session.course}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {session.teacher}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {session.room}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{session.time}</span>
            </div>

            {session.status === "ongoing" && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success"></span>
                </span>
                <span className="text-xs font-medium text-success">
                  En cours
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
