import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "conflict" | "warning" | "info";
  title: string;
  description: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "conflict",
    title: "Conflit de salle",
    description: "Amphi 500 réservé par 2 cours à 10h",
    time: "Il y a 15 min",
  },
  {
    id: "2",
    type: "warning",
    title: "Enseignant indisponible",
    description: "Dr. Mbarga absent le 15 janvier",
    time: "Il y a 1h",
  },
  {
    id: "3",
    type: "conflict",
    title: "Chevauchement horaire",
    description: "Niveau 2 ICT: 2 TD simultanés",
    time: "Il y a 2h",
  },
];

const alertStyles = {
  conflict: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: "text-destructive",
  },
  warning: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: "text-warning",
  },
  info: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: "text-primary",
  },
};

export function AlertsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="rounded-xl bg-card p-6 card-elevated"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">
          Alertes & Conflits
        </h2>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.55 + index * 0.1 }}
            className={`relative flex items-start gap-3 rounded-lg border p-4 ${alertStyles[alert.type].bg} ${alertStyles[alert.type].border}`}
          >
            <AlertTriangle
              className={`h-5 w-5 shrink-0 ${alertStyles[alert.type].icon}`}
            />
            <div className="flex-1">
              <p className="font-medium text-card-foreground">{alert.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {alert.description}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {alert.time}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 opacity-50 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="mt-4 w-full">
        Voir toutes les alertes
      </Button>
    </motion.div>
  );
}
