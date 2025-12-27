import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Search, Plus, Users, Monitor, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Helmet } from "react-helmet-async";

interface Room {
  id: string;
  name: string;
  type: "amphi" | "td" | "lab";
  capacity: number;
  equipment: string[];
  occupancy: number;
  status: "available" | "occupied" | "maintenance";
  currentSession?: string;
}

const rooms: Room[] = [
  {
    id: "1",
    name: "Amphi 500",
    type: "amphi",
    capacity: 500,
    equipment: ["Vidéoprojecteur", "Micro", "WiFi"],
    occupancy: 85,
    status: "occupied",
    currentSession: "Génie Logiciel - CM",
  },
  {
    id: "2",
    name: "Amphi 300",
    type: "amphi",
    capacity: 300,
    equipment: ["Vidéoprojecteur", "Micro"],
    occupancy: 60,
    status: "available",
  },
  {
    id: "3",
    name: "Amphi 200",
    type: "amphi",
    capacity: 200,
    equipment: ["Vidéoprojecteur", "WiFi"],
    occupancy: 0,
    status: "maintenance",
  },
  {
    id: "4",
    name: "Salle TD 12",
    type: "td",
    capacity: 50,
    equipment: ["Tableau blanc", "WiFi"],
    occupancy: 75,
    status: "occupied",
    currentSession: "Base de Données - TD",
  },
  {
    id: "5",
    name: "Salle TD 8",
    type: "td",
    capacity: 40,
    equipment: ["Tableau blanc"],
    occupancy: 0,
    status: "available",
  },
  {
    id: "6",
    name: "Labo Info 3",
    type: "lab",
    capacity: 30,
    equipment: ["30 PC", "Vidéoprojecteur", "WiFi"],
    occupancy: 90,
    status: "occupied",
    currentSession: "Réseaux - TP",
  },
  {
    id: "7",
    name: "Labo Info 1",
    type: "lab",
    capacity: 25,
    equipment: ["25 PC", "WiFi"],
    occupancy: 0,
    status: "available",
  },
  {
    id: "8",
    name: "Salle TD 5",
    type: "td",
    capacity: 45,
    equipment: ["Tableau blanc", "Vidéoprojecteur"],
    occupancy: 0,
    status: "available",
  },
];

const typeConfig = {
  amphi: { label: "Amphithéâtre", color: "bg-primary/10 text-primary" },
  td: { label: "Salle TD", color: "bg-accent/10 text-accent" },
  lab: { label: "Laboratoire", color: "bg-success/10 text-success" },
};

const statusConfig = {
  available: { label: "Disponible", color: "bg-success text-success-foreground" },
  occupied: { label: "Occupée", color: "bg-destructive text-destructive-foreground" },
  maintenance: { label: "Maintenance", color: "bg-warning text-warning-foreground" },
};

const Rooms = () => {
  const availableCount = rooms.filter((r) => r.status === "available").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;

  return (
    <>
      <Helmet>
        <title>Gestion des Salles | Gestion Académique - Univ. Yaoundé I</title>
        <meta
          name="description"
          content="Gérez les salles de cours, amphithéâtres et laboratoires du département"
        />
      </Helmet>

      <MainLayout>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Gestion des salles
            </h1>
            <p className="mt-1 text-muted-foreground">
              Attribution et disponibilité des espaces
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une salle
          </Button>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total salles</p>
            <p className="text-2xl font-bold">{rooms.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Disponibles</p>
            <p className="text-2xl font-bold text-success">{availableCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Occupées</p>
            <p className="text-2xl font-bold text-destructive">{occupiedCount}</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher une salle..." className="pl-10" />
          </div>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
              className="group overflow-hidden rounded-xl border bg-card card-elevated card-hover"
            >
              {/* Header */}
              <div className="border-b bg-muted/30 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">
                    {room.name}
                  </h3>
                  <Badge className={statusConfig[room.status].color}>
                    {statusConfig[room.status].label}
                  </Badge>
                </div>
                <Badge variant="outline" className={`mt-2 ${typeConfig[room.type].color}`}>
                  {typeConfig[room.type].label}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Capacity */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Capacité:</span>
                  <span className="font-medium">{room.capacity} places</span>
                </div>

                {/* Equipment */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.equipment.map((eq) => (
                    <Badge key={eq} variant="secondary" className="text-xs">
                      {eq}
                    </Badge>
                  ))}
                </div>

                {/* Current Session */}
                {room.currentSession && (
                  <div className="mt-4 rounded-lg bg-primary/5 p-3">
                    <p className="text-xs text-muted-foreground">En cours:</p>
                    <p className="text-sm font-medium text-primary">
                      {room.currentSession}
                    </p>
                  </div>
                )}

                {/* Occupancy */}
                {room.status === "occupied" && (
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">Occupation</span>
                      <span className="font-medium">{room.occupancy}%</span>
                    </div>
                    <Progress value={room.occupancy} className="h-2" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default Rooms;
