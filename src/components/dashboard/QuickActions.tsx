import { motion } from "framer-motion";
import { Plus, Calendar, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Plus,
    label: "Nouvelle séance",
    description: "Planifier un cours ou TD",
    variant: "default" as const,
  },
  {
    icon: Calendar,
    label: "Modifier emploi du temps",
    description: "Ajuster les horaires",
    variant: "outline" as const,
  },
  {
    icon: AlertTriangle,
    label: "Gérer les conflits",
    description: "3 conflits à résoudre",
    variant: "outline" as const,
  },
  {
    icon: FileText,
    label: "Générer un rapport",
    description: "Exporter les données",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-xl bg-card p-6 card-elevated"
    >
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">
        Actions rapides
      </h2>

      <div className="grid gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.45 + index * 0.1 }}
          >
            <Button
              variant={action.variant}
              className="h-auto w-full justify-start gap-3 p-4 text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <action.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
