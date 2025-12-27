import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface ScheduleEvent {
  id: string;
  course: string;
  type: "CM" | "TD" | "TP";
  teacher: string;
  room: string;
  day: number;
  startTime: number;
  duration: number;
}

const events: ScheduleEvent[] = [
  {
    id: "1",
    course: "Génie Logiciel",
    type: "CM",
    teacher: "Prof. Nzeukou",
    room: "Amphi 500",
    day: 0,
    startTime: 0,
    duration: 2,
  },
  {
    id: "2",
    course: "Base de Données",
    type: "TD",
    teacher: "Dr. Fouda",
    room: "TD 12",
    day: 0,
    startTime: 3,
    duration: 2,
  },
  {
    id: "3",
    course: "Réseaux",
    type: "TP",
    teacher: "M. Essomba",
    room: "Labo 3",
    day: 1,
    startTime: 6,
    duration: 3,
  },
  {
    id: "4",
    course: "Analyse Num.",
    type: "CM",
    teacher: "Prof. Bella",
    room: "Amphi 300",
    day: 2,
    startTime: 0,
    duration: 2,
  },
  {
    id: "5",
    course: "Algorithmique",
    type: "TD",
    teacher: "Dr. Kamga",
    room: "TD 8",
    day: 3,
    startTime: 2,
    duration: 2,
  },
  {
    id: "6",
    course: "Systèmes",
    type: "CM",
    teacher: "Prof. Ondoa",
    room: "Amphi 200",
    day: 4,
    startTime: 0,
    duration: 2,
  },
  {
    id: "7",
    course: "Prog. Web",
    type: "TP",
    teacher: "M. Nguele",
    room: "Labo 1",
    day: 4,
    startTime: 4,
    duration: 3,
  },
];

const typeStyles = {
  CM: "bg-primary/90 text-primary-foreground border-primary",
  TD: "bg-accent/90 text-accent-foreground border-accent",
  TP: "bg-success/90 text-success-foreground border-success",
};

const Schedule = () => {
  return (
    <>
      <Helmet>
        <title>Emploi du temps | Gestion Académique - Univ. Yaoundé I</title>
        <meta
          name="description"
          content="Consultez et gérez l'emploi du temps des cours et TD du département d'Informatique"
        />
      </Helmet>

      <MainLayout>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Emploi du temps
            </h1>
            <p className="mt-1 text-muted-foreground">
              Semaine du 27 au 31 Décembre 2024
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline">Aujourd'hui</Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button className="ml-2 gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle séance
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-sm text-muted-foreground">
              Cours Magistraux (CM)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-accent" />
            <span className="text-sm text-muted-foreground">
              Travaux Dirigés (TD)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-success" />
            <span className="text-sm text-muted-foreground">
              Travaux Pratiques (TP)
            </span>
          </div>
        </div>

        {/* Schedule Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-xl border bg-card card-elevated"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b bg-muted/30">
                <div className="p-3 text-center text-sm font-medium text-muted-foreground">
                  Heure
                </div>
                {days.map((day) => (
                  <div
                    key={day}
                    className="border-l p-3 text-center text-sm font-semibold text-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="relative">
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={time}
                    className="grid h-16 grid-cols-[80px_repeat(6,1fr)] border-b last:border-b-0"
                  >
                    <div className="flex items-center justify-center border-r text-sm text-muted-foreground">
                      {time}
                    </div>
                    {days.map((_, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="relative border-l bg-background/50"
                      />
                    ))}
                  </div>
                ))}

                {/* Events */}
                <div className="pointer-events-none absolute inset-0 grid grid-cols-[80px_repeat(6,1fr)]">
                  <div />
                  {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {events
                        .filter((e) => e.day === dayIndex)
                        .map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className={`pointer-events-auto absolute left-1 right-1 cursor-pointer overflow-hidden rounded-md border-l-4 p-2 transition-transform hover:scale-[1.02] ${typeStyles[event.type]}`}
                            style={{
                              top: `${event.startTime * 64 + 4}px`,
                              height: `${event.duration * 64 - 8}px`,
                            }}
                          >
                            <div className="flex h-full flex-col">
                              <p className="text-xs font-bold leading-tight">
                                {event.course}
                              </p>
                              <p className="mt-0.5 text-[10px] opacity-80">
                                {event.teacher}
                              </p>
                              <p className="mt-auto text-[10px] opacity-70">
                                {event.room}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </MainLayout>
    </>
  );
};

export default Schedule;
