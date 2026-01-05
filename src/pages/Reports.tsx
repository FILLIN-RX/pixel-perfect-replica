import { MainLayout } from "@/components/layout/MainLayout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Building2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const monthlyData = [
  { month: "Sept", seances: 120, heures: 480 },
  { month: "Oct", seances: 145, heures: 580 },
  { month: "Nov", seances: 132, heures: 528 },
  { month: "Dec", seances: 98, heures: 392 },
  { month: "Jan", seances: 156, heures: 624 },
  { month: "Fév", seances: 140, heures: 560 },
];

const typeSeanceData = [
  { name: "CM", value: 45, color: "hsl(var(--primary))" },
  { name: "TD", value: 35, color: "hsl(var(--secondary))" },
  { name: "TP", value: 20, color: "hsl(var(--accent))" },
];

const salleUtilisation = [
  { salle: "Amphi A", taux: 85 },
  { salle: "Amphi B", taux: 78 },
  { salle: "Salle 101", taux: 92 },
  { salle: "Salle 102", taux: 65 },
  { salle: "Labo Info", taux: 88 },
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

export default function Reports() {
  return (
    <MainLayout>
      <Helmet>
        <title>Rapports - Université de Yaoundé I</title>
        <meta
          name="description"
          content="Rapports et statistiques de gestion académique"
        />
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
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rapports</h1>
            <p className="text-muted-foreground">
              Statistiques et analyses de gestion académique
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exporter PDF
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">791</p>
                  <p className="text-xs text-muted-foreground">
                    Total Séances
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3,164</p>
                  <p className="text-xs text-muted-foreground">Heures Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-xs text-muted-foreground">Enseignants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-xs text-muted-foreground">Taux Présence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Sessions Chart */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Séances par Mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="seances"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Session Types Pie Chart */}
          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Répartition par Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeSeanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {typeSeanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Room Utilization */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                Taux d'Utilisation des Salles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salleUtilisation.map((salle) => (
                  <div key={salle.salle} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{salle.salle}</span>
                      <span className="font-medium text-primary">
                        {salle.taux}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${salle.taux}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hours Trend */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Évolution des Heures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="heures"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
